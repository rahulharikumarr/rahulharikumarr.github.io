// The README, played by scroll. Scroll position is the playhead: every scene
// gets a 0..1 progress (--p), an entrance (--in) and an exit (--out). Elements
// inside a scene that carry data-in="from to" get their own eased 0..1 value
// (--i) across that part of the scene, and the stylesheet turns that into
// typing the markdown source and then rendering it. Lengths are in
// screen-heights of scroll, set per scene in index.html (data-len).

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Styled = HTMLElement | SVGElement;

interface Tween {
  el: Styled;
  prop: '--i' | '--o';
  from: number;
  to: number;
  reel: number;
  path: SVGPathElement | null;
  last: number;
}

interface Scene {
  el: HTMLElement;
  name: string;
  len: number;
  trans: number;
  rest: number;
  hud: string;
  start: number;
  span: number;
  tweens: Tween[];
  state: string;
}

const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

function range(value: string | undefined): [number, number] {
  const [a, b] = (value || '0 1').trim().split(/\s+/).map(Number);
  return [a, b];
}

function collectTweens(scene: HTMLElement): Tween[] {
  const tweens: Tween[] = [];
  scene.querySelectorAll<Styled>('[data-in],[data-out]').forEach((el) => {
    const data = el.dataset;
    if (data.in !== undefined) {
      const [from, to] = range(data.in);
      const path = data.follow ? scene.querySelector<SVGPathElement>(data.follow) : null;
      tweens.push({ el, prop: '--i', from, to, reel: Number(data.reel || 0), path, last: -1 });
    }
    if (data.out !== undefined) {
      const [from, to] = range(data.out);
      tweens.push({ el, prop: '--o', from, to, reel: 0, path: null, last: -1 });
    }
  });
  return tweens;
}

// A reel holds on each word, then moves to the next: 0, 1, 2 ... with eased steps.
function reelPosition(t: number, words: number): number {
  const x = t * (words - 1);
  const step = Math.min(Math.floor(x), words - 2);
  const hold = 0.5;
  return step + ease(clamp((x - step - hold) / (1 - hold)));
}

function film() {
  root.classList.add('film');

  const spacer = document.querySelector<HTMLElement>('.spacer')!;
  const route = document.querySelector<HTMLElement>('.route')!;

  const scenes: Scene[] = [...document.querySelectorAll<HTMLElement>('.scene')].map((el, i) => ({
    el,
    name: el.dataset.name || '',
    len: Number(el.dataset.len || 200),
    trans: i === 0 ? 0 : Number(el.dataset.trans || 50),
    rest: Number(el.dataset.rest ?? 0.8),
    hud: el.dataset.hud || 'dark',
    start: 0,
    span: 0,
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

  // The bottom line is the route: one stop per scene, and a marker for where you are.
  const stopAt = (scene: Scene) => scene.start + scene.span * scene.rest;
  route.innerHTML = '<i class="route__line"></i><i class="route__dot"></i>';
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

  const playhead = () => clamp((window.scrollY / screen) * 100, 0, total);
  // The cover does not wait for scroll: it types and renders itself on load.
  const opening = [...document.querySelectorAll<Styled>('[data-auto]')].map((el) => {
    const [delay, duration] = range(el.dataset.auto);
    el.style.setProperty('--i', '0');
    return { el, delay: delay * 1000, duration: duration * 1000, done: false };
  });
  const openedAt = performance.now();

  let current = playhead();
  let velocity = 0;
  let lastTime = performance.now();
  let lastScene = -1;
  let lastVelocity = '';

  function render() {
    let active = 0;
    scenes.forEach((scene, i) => {
      const next = scenes[i + 1];
      const enter = i === 0 ? 1 : clamp((current - (scene.start - scene.trans)) / scene.trans);
      const exit = next ? clamp((current - (next.start - next.trans)) / next.trans) : 0;
      const on = enter > 0 && exit < 1;
      const progress = clamp((current - scene.start) / scene.span);
      if (enter > 0.5) active = i;

      const state = on ? `${enter.toFixed(4)}|${exit.toFixed(4)}|${progress.toFixed(4)}` : 'off';
      if (state === scene.state) return;
      scene.state = state;

      scene.el.classList.toggle('on', on);
      if (!on) return;
      scene.el.classList.toggle('full', enter >= 1);
      scene.el.style.setProperty('--in', ease(enter).toFixed(4));
      scene.el.style.setProperty('--out', ease(exit).toFixed(4));
      scene.el.style.setProperty('--p', progress.toFixed(4));

      for (const tween of scene.tweens) {
        const linear = clamp((progress - tween.from) / (tween.to - tween.from));
        const value = tween.reel ? reelPosition(linear, tween.reel) : ease(linear);
        if (Math.abs(value - tween.last) < 0.0004) continue;
        tween.last = value;
        if (tween.reel) {
          tween.el.style.setProperty('--r', value.toFixed(4));
          continue;
        }
        tween.el.style.setProperty(tween.prop, value.toFixed(4));
        if (tween.path) {
          const point = tween.path.getPointAtLength(value * tween.path.getTotalLength());
          tween.el.setAttribute('cx', point.x.toFixed(1));
          tween.el.setAttribute('cy', point.y.toFixed(1));
        }
      }
    });

    route.style.setProperty('--at', (current / total).toFixed(4));
    if (active !== lastScene) {
      lastScene = active;
      document.body.dataset.scene = String(active);
      document.body.dataset.hud = scenes[active].hud;
      stops.forEach((stop, i) => stop.classList.toggle('cur', i === active));
    }
  }

  function frame(now: number) {
    const dt = Math.min(now - lastTime, 64);
    lastTime = now;
    const target = playhead();
    const before = current;
    current += (target - current) * (1 - Math.pow(0.84, dt / 16.7));
    if (Math.abs(target - current) < 0.005 || !Number.isFinite(current)) current = target;

    velocity += (clamp((current - before) / Math.max(dt, 1) * 2.2, -1, 1) - velocity) * 0.18;
    const shown = Math.abs(velocity) < 0.002 ? '0' : velocity.toFixed(3);
    if (shown !== lastVelocity) {
      lastVelocity = shown;
      root.style.setProperty('--vel', shown);
    }

    for (const item of opening) {
      if (item.done) continue;
      const t = clamp((now - openedAt - item.delay) / item.duration);
      item.el.style.setProperty('--i', ease(t).toFixed(4));
      item.done = t >= 1;
    }

    render();
    requestAnimationFrame(frame);
  }

  render();
  requestAnimationFrame(frame);
}

if (!reduced.matches) film();
