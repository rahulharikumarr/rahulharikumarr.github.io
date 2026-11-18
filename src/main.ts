// The film. Scroll position is the playhead: every scene gets a 0..1 progress
// (--p), an entrance (--in) and an exit (--out). Elements inside a scene that
// carry data-in="from to" get their own eased 0..1 value (--i) across that
// part of the scene; add data-decode and their text resolves out of scrambled
// characters over the same stretch. The stylesheet does the rest. Lengths are
// in screen-heights of scroll, set per scene in index.html (data-len).

import { createRain } from './rain';

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Styled = HTMLElement | SVGElement;

interface TextFx {
  full: string;
  typed: boolean;
  shown: number;
}

interface Tween {
  el: Styled;
  prop: '--i' | '--o';
  from: number;
  to: number;
  text: TextFx | null;
  last: number;
}

interface Scene {
  el: HTMLElement;
  name: string;
  len: number;
  trans: number;
  rest: number;
  rain: number;
  grey: boolean;
  start: number;
  span: number;
  progress: number;
  exit: number;
  tweens: Tween[];
  state: string;
}

const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

const SCRAMBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&$<>/=+*';
const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function range(value: string | undefined): [number, number] {
  const [a, b] = (value || '0 1').trim().split(/\s+/).map(Number);
  return [a, b];
}

function textFx(el: Styled): TextFx | null {
  const typed = el.dataset.type !== undefined;
  if (!typed && el.dataset.decode === undefined) return null;
  return { full: (el.textContent || '').replace(/\s+/g, ' ').trim(), typed, shown: -1 };
}

// The whole line is always in the page, so nothing moves while it arrives:
// what has resolved is plain text, the next few characters are noise, and the
// rest is there but hidden.
function writeText(el: Styled, fx: TextFx, value: number) {
  const length = fx.full.length;
  const lead = fx.typed ? 0 : 5;
  const shown = Math.min(length, Math.floor(value * (length + lead + 1)));
  if (shown === fx.shown) return;
  fx.shown = shown;
  if (shown >= length) {
    el.textContent = fx.full;
    return;
  }
  if (value <= 0) {
    el.innerHTML = `<span class="un">${escape(fx.full)}</span>`;
    return;
  }
  const done = escape(fx.full.slice(0, shown));
  if (fx.typed) {
    const caret = value > 0 ? '<b class="caret"></b>' : '';
    el.innerHTML = `${done}${caret}<span class="un">${escape(fx.full.slice(shown))}</span>`;
    return;
  }
  const noise = fx.full
    .slice(shown, shown + lead)
    .replace(/\S/g, () => SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0]);
  const rest = escape(fx.full.slice(shown + lead));
  el.innerHTML = `${done}<span class="sc">${escape(noise)}</span><span class="un">${rest}</span>`;
}

function collectTweens(scene: HTMLElement): Tween[] {
  const tweens: Tween[] = [];
  scene.querySelectorAll<Styled>('[data-in],[data-out]').forEach((el) => {
    if (el.dataset.in !== undefined) {
      const [from, to] = range(el.dataset.in);
      tweens.push({ el, prop: '--i', from, to, text: textFx(el), last: -1 });
    }
    if (el.dataset.out !== undefined) {
      const [from, to] = range(el.dataset.out);
      tweens.push({ el, prop: '--o', from, to, text: null, last: -1 });
    }
  });
  return tweens;
}

function film() {
  root.classList.add('film');

  const spacer = document.querySelector<HTMLElement>('.spacer')!;
  const route = document.querySelector<HTMLElement>('.route')!;
  const rain = createRain(document.querySelector<HTMLCanvasElement>('.rain')!, ['RAHUL', 'HARI']);

  const scenes: Scene[] = [...document.querySelectorAll<HTMLElement>('.scene')].map((el, i) => ({
    el,
    name: el.dataset.name || '',
    len: Number(el.dataset.len || 200),
    trans: i === 0 ? 0 : Number(el.dataset.trans || 50),
    rest: Number(el.dataset.rest ?? 0.85),
    rain: Number(el.dataset.rain ?? 0.25),
    grey: el.dataset.tone === 'grey',
    start: 0,
    span: 0,
    progress: 0,
    exit: 0,
    tweens: collectTweens(el),
    state: '',
  }));

  let total = 0;
  scenes.forEach((scene, i) => {
    scene.start = total;
    total += scene.len;
    const next = scenes[i + 1];
    scene.span = scene.len - (next ? Number(next.el.dataset.trans || 50) : 0);
    scene.el.style.zIndex = String(i + 1);
  });

  // The line along the bottom is the route, and the rabbit is where you are.
  const stopAt = (scene: Scene) => scene.start + scene.span * scene.rest;
  const rabbit = route.querySelector<HTMLElement>('.rabbit')!;
  const stops = scenes.map((scene) => {
    const stop = document.createElement('button');
    stop.className = 'route__stop';
    stop.type = 'button';
    stop.style.left = `${(stopAt(scene) / total) * 100}%`;
    stop.innerHTML = `<span>${scene.name}</span>`;
    stop.setAttribute('aria-label', scene.name);
    stop.addEventListener('click', () => goTo(stopAt(scene)));
    route.appendChild(stop);
    return stop;
  });

  // The page can load in a tab that has no size yet; never divide by zero.
  const viewport = () => window.innerHeight || root.clientHeight || 1;
  let screen = viewport();
  let width = window.innerWidth;
  const layout = () => {
    spacer.style.height = `${(total / 100 + 1) * screen}px`;
  };
  layout();
  window.addEventListener('resize', () => {
    // Phones resize the viewport every time the address bar hides; only a real
    // resize (width, or a big height change) should move the film's length.
    const tall = Math.abs(viewport() - screen) > 140;
    if (window.innerWidth !== width || tall) {
      const at = window.scrollY / screen;
      screen = viewport();
      width = window.innerWidth;
      layout();
      window.scrollTo(0, at * screen);
    }
  });

  function goTo(position: number) {
    window.scrollTo({ top: (position / 100) * screen, behavior: 'smooth' });
  }

  document.querySelectorAll<HTMLAnchorElement>('a[href="#top"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      goTo(0);
    });
  });

  // Red keeps going. Blue wakes up back at the start.
  document.querySelectorAll<HTMLElement>('[data-pill]').forEach((pill) => {
    pill.addEventListener('click', () => goTo(pill.dataset.pill === 'red' ? stopAt(scenes[2]) : 0));
  });

  // The opening does not wait for scroll: three lines type themselves on a
  // black screen, and then the code starts to fall.
  const opening = [...document.querySelectorAll<Styled>('[data-auto]')].map((el) => {
    const [delay, duration] = range(el.dataset.auto);
    const text = textFx(el);
    if (text) writeText(el, text, 0);
    return { el, delay: delay * 1000, duration: duration * 1000, text, done: false };
  });
  const openedAt = performance.now();
  const RAIN_STARTS = 6400;

  const playhead = () => clamp((window.scrollY / screen) * 100, 0, total);
  let current = playhead();
  let lastTime = openedAt;
  let lastScene = -1;
  let lastHop = '';

  function render(now: number) {
    let active = 0;
    scenes.forEach((scene, i) => {
      const next = scenes[i + 1];
      const enter = i === 0 ? 1 : clamp((current - (scene.start - scene.trans)) / scene.trans);
      const exit = next ? clamp((current - (next.start - next.trans)) / next.trans) : 0;
      const on = enter > 0 && exit < 1;
      const progress = clamp((current - scene.start) / scene.span);
      scene.progress = progress;
      scene.exit = exit;
      if (enter > 0.5) active = i;

      const state = on ? `${enter.toFixed(4)}|${exit.toFixed(4)}|${progress.toFixed(4)}` : 'off';
      if (state === scene.state) return;
      scene.state = state;

      scene.el.classList.toggle('on', on);
      if (!on) return;
      scene.el.style.setProperty('--in', enter.toFixed(4));
      scene.el.style.setProperty('--out', exit.toFixed(4));
      scene.el.style.setProperty('--p', progress.toFixed(4));

      for (const tween of scene.tweens) {
        const linear = clamp((progress - tween.from) / (tween.to - tween.from));
        if (tween.text) writeText(tween.el, tween.text, linear);
        const value = ease(linear);
        if (Math.abs(value - tween.last) < 0.0004) continue;
        tween.last = value;
        tween.el.style.setProperty(tween.prop, value.toFixed(4));
      }
    });

    const wake = scenes[0];
    const elapsed = now - openedAt;
    const started = Math.max(clamp((elapsed - RAIN_STARTS) / 2600) * 0.55, clamp(wake.progress * 7));
    rain.setLevel(active === 0 ? started : scenes[active].rain);
    rain.setGrey(scenes[active].grey);
    const [from, to] = range(wake.el.dataset.resolve);
    rain.setResolve(ease(clamp((wake.progress - from) / (to - from))) * (1 - wake.exit));

    route.style.setProperty('--at', (current / total).toFixed(4));
    const hop = Math.abs(Math.sin(current * 0.42)).toFixed(2);
    if (hop !== lastHop) {
      lastHop = hop;
      rabbit.style.setProperty('--hop', hop);
    }
    if (elapsed > RAIN_STARTS - 600 || current > 1) document.body.classList.add('rabbit-out');

    if (active !== lastScene) {
      lastScene = active;
      document.body.dataset.scene = String(active);
      document.body.dataset.room = scenes[active].el.dataset.room || 'dark';
      stops.forEach((stop, i) => stop.classList.toggle('cur', i === active));
    }
  }

  function frame(now: number) {
    const dt = Math.min(now - lastTime, 64);
    lastTime = now;
    const target = playhead();
    current += (target - current) * (1 - Math.pow(0.84, dt / 16.7));
    if (Math.abs(target - current) < 0.005 || !Number.isFinite(current)) current = target;

    for (const item of opening) {
      if (item.done) continue;
      const t = clamp((now - openedAt - item.delay) / item.duration);
      if (item.text) writeText(item.el, item.text, t);
      item.el.style.setProperty('--i', ease(t).toFixed(4));
      item.done = t >= 1;
    }

    render(now);
    requestAnimationFrame(frame);
  }

  render(openedAt);
  requestAnimationFrame(frame);
}

if (!reduced.matches) film();
