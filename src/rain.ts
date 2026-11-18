// The code. Columns of mirrored half-width katakana and numerals fall down a
// canvas, as in the film. Give it words and a resolve amount and the cells
// that sit inside those letters stop falling and hold, so the rain spells them.

const GLYPHS = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789Z:."=*+-<>|';
const BACK = '2, 5, 3';
const STEP = 1000 / 30;

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const glyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

interface Held {
  col: number;
  row: number;
  at: number;
  glyph: string;
}

export interface Rain {
  setLevel(level: number): void;
  setResolve(amount: number): void;
  setGrey(grey: boolean): void;
}

export function createRain(canvas: HTMLCanvasElement, lines: string[]): Rain {
  const ctx = canvas.getContext('2d', { alpha: false })!;

  let width = 0;
  let height = 0;
  let size = 18;
  let colWidth = 12;
  let cols = 0;
  let rows = 0;
  let heads = new Float32Array(0);
  let speeds = new Float32Array(0);
  let lastRow = new Int16Array(0);
  let lastGlyph: string[] = [];
  let held: Held[] = [];

  let level = 0;
  let levelTarget = 0;
  let resolve = 0;
  let last = 0;

  function cell(col: number, row: number, char: string, color: string, alpha: number) {
    const x = col * colWidth;
    const y = row * size;
    ctx.globalAlpha = 1;
    ctx.fillStyle = `rgb(${BACK})`;
    ctx.fillRect(x, y, colWidth, size);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillText(char, x + colWidth / 2, y);
  }

  // Draw the words at full size on a canvas one pixel per cell, and keep the
  // cells that land inside a letter.
  function findHeld() {
    held = [];
    if (!lines.length || !cols) return;
    const probe = document.createElement('canvas');
    probe.width = cols;
    probe.height = rows;
    const p = probe.getContext('2d', { willReadFrequently: true })!;
    // on a narrow screen the letters are drawn tall, or they would be a thin strip
    const tall = width < 700 ? 2 : 1;
    p.setTransform(1 / colWidth, 0, 0, tall / size, 0, 0);
    const family = '"Archivo Black", "Arial Black", Impact, sans-serif';
    p.font = `400 100px ${family}`;
    const widest = Math.max(...lines.map((line) => p.measureText(line).width)) / 100;
    const leading = 0.9;
    const fit = Math.min((width * 0.86) / widest, (height * 0.6) / (lines.length * leading * tall));
    p.font = `400 ${fit}px ${family}`;
    p.textAlign = 'center';
    p.textBaseline = 'middle';
    p.fillStyle = '#fff';
    const top = (height * 0.46) / tall - ((lines.length - 1) * fit * leading) / 2;
    lines.forEach((line, i) => p.fillText(line, width / 2, top + i * fit * leading));

    const data = p.getImageData(0, 0, cols, rows).data;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // the canvas is mirrored, so column 0 is at the right of the screen
        const screenCol = Math.floor((width - (col + 0.5) * colWidth) / colWidth);
        if (screenCol < 0 || screenCol >= cols) continue;
        if (data[(row * cols + screenCol) * 4 + 3] > 110) {
          held.push({ col, row, at: 0.05 + Math.random() * 0.8, glyph: glyph() });
        }
      }
    }
  }

  function layout() {
    width = canvas.clientWidth || window.innerWidth;
    height = canvas.clientHeight || window.innerHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    size = width < 700 ? 11 : Math.round(clamp(width / 84, 15, 22));
    colWidth = size * 0.68;
    cols = Math.ceil(width / colWidth);
    rows = Math.ceil(height / size) + 1;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    // mirrored, like the film's glyphs
    ctx.setTransform(-dpr, 0, 0, dpr, width * dpr, 0);
    ctx.font = `500 ${size}px "IBM Plex Mono", ui-monospace, monospace`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillStyle = `rgb(${BACK})`;
    ctx.fillRect(0, 0, width, height);

    heads = new Float32Array(cols);
    speeds = new Float32Array(cols);
    lastRow = new Int16Array(cols).fill(-1);
    lastGlyph = new Array(cols).fill('');
    for (let col = 0; col < cols; col++) {
      // some columns are already part way down, so the rain is there at once
      heads[col] = Math.random() * rows * 2.2 - rows * 1.2;
      speeds[col] = 0.3 + Math.random() * 0.8;
    }
    findHeld();
  }

  function tick() {
    // each pass dims everything already drawn, which leaves the trails
    ctx.globalAlpha = 1;
    ctx.fillStyle = `rgba(${BACK}, ${0.075 + resolve * 0.13})`;
    ctx.fillRect(0, 0, width, height);

    const falling = 1 - resolve * 0.6;
    for (let col = 0; col < cols; col++) {
      heads[col] += speeds[col];
      const row = Math.floor(heads[col]);
      if (row !== lastRow[col]) {
        if (lastRow[col] >= 0) cell(col, lastRow[col], lastGlyph[col], '#00e33d', falling);
        if (row >= 0) {
          lastGlyph[col] = glyph();
          cell(col, row, lastGlyph[col], '#d9ffe5', falling);
        }
        lastRow[col] = row;
      }
      if (row > rows && Math.random() > 0.972) {
        heads[col] = -Math.random() * 10;
        speeds[col] = 0.3 + Math.random() * 0.8;
        lastRow[col] = -1;
      }
    }

    if (resolve > 0.01) {
      for (const item of held) {
        const alpha = clamp((resolve * 1.2 - item.at) * 5);
        if (alpha <= 0) continue;
        if (Math.random() < 0.02) item.glyph = glyph();
        // a held cell is lit from behind, so the letters read as solid shapes
        const x = item.col * colWidth;
        const y = item.row * size;
        ctx.globalAlpha = 1;
        ctx.fillStyle = `rgb(${BACK})`;
        ctx.fillRect(x, y, colWidth, size);
        ctx.globalAlpha = alpha * 0.34;
        ctx.fillStyle = '#00ff41';
        ctx.fillRect(x, y, colWidth, size);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#f4fff7';
        ctx.fillText(item.glyph, x + colWidth / 2, y);
      }
    }
  }

  function frame(now: number) {
    requestAnimationFrame(frame);
    if (now - last < STEP) return;
    last = now;
    level += (levelTarget - level) * 0.12;
    if (Math.abs(levelTarget - level) < 0.004) level = levelTarget;
    canvas.style.opacity = level.toFixed(3);
    if (level > 0.004 && width) tick();
  }

  layout();
  let resizeWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    const tall = Math.abs((canvas.clientHeight || window.innerHeight) - height) > 140;
    if (window.innerWidth !== resizeWidth || tall || !width) {
      resizeWidth = window.innerWidth;
      layout();
    }
  });
  if (document.fonts) {
    Promise.all([document.fonts.load('400 40px "Archivo Black"'), document.fonts.load('500 16px "IBM Plex Mono"')])
      .then(layout)
      .catch(() => undefined);
  }
  requestAnimationFrame(frame);

  return {
    setLevel(value) {
      levelTarget = clamp(value);
    },
    setResolve(value) {
      resolve = clamp(value);
    },
    setGrey(grey) {
      canvas.classList.toggle('grey', grey);
    },
  };
}
