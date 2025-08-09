export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// Default maps from Paul Bourke ref (same as the Go project)
export const SIMPLE_MAP = ' .:-=+*#%@';
export const DETAILED_MAP =
  ' .\'`^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

// Image utilities
export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
    img.crossOrigin = 'anonymous';
  });
}

export function loadImageFromUrl(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = 'anonymous';
    img.src = src;
  });
}

// Floyd–Steinberg dithering for grayscale values (0..255)
export function floydSteinbergDither(
  values: number[],
  w: number,
  h: number
): number[] {
  const data = values.map((v) => v);
  const idx = (x: number, y: number) => y * w + x;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = idx(x, y);
      const old = data[i];
      const newVal = old < 128 ? 0 : 255;
      data[i] = newVal;
      const err = old - newVal;
      if (x + 1 < w)
        data[idx(x + 1, y)] = clamp(
          data[idx(x + 1, y)] + (err * 7) / 16,
          0,
          255
        );
      if (x - 1 >= 0 && y + 1 < h)
        data[idx(x - 1, y + 1)] = clamp(
          data[idx(x - 1, y + 1)] + (err * 3) / 16,
          0,
          255
        );
      if (y + 1 < h)
        data[idx(x, y + 1)] = clamp(
          data[idx(x, y + 1)] + (err * 5) / 16,
          0,
          255
        );
      if (x + 1 < w && y + 1 < h)
        data[idx(x + 1, y + 1)] = clamp(
          data[idx(x + 1, y + 1)] + (err * 1) / 16,
          0,
          255
        );
    }
  }
  return data;
}

// Compute target character grid from desired width/height
export function computeCharGrid(
  imgW: number,
  imgH: number,
  opts: {
    width?: number;
    height?: number;
    isBraille?: boolean;
    fitTo?: number | null;
  }
): { cols: number; rows: number } {
  const aspect = imgW / imgH;
  const isBraille = !!opts.isBraille;
  const charHScale = isBraille ? 1 : 0.5; // terminal-ish cell ratio; braille is denser
  const charWScale = isBraille ? 1 : 2;

  let cols: number;
  let rows: number;
  if (opts.width && !opts.height) {
    cols = Math.max(1, Math.round(opts.width));
    rows = Math.max(1, Math.round((cols / aspect) * charHScale));
  } else if (opts.height && !opts.width) {
    rows = Math.max(1, Math.round(opts.height));
    cols = Math.max(1, Math.round(rows * aspect * charWScale));
  } else if (opts.width && opts.height) {
    cols = Math.max(1, Math.round(opts.width));
    rows = Math.max(1, Math.round(opts.height));
  } else if (opts.fitTo) {
    cols = Math.max(1, Math.round(opts.fitTo));
    rows = Math.max(1, Math.round((cols / aspect) * charHScale));
  } else {
    cols = 120; // sensible default
    rows = Math.max(1, Math.round((cols / aspect) * charHScale));
  }
  // clamp to prevent massive DOM
  cols = Math.min(cols, 350);
  rows = Math.min(rows, 350);
  return { cols, rows };
}

// Sample an image to a smaller grid and return per-pixel RGB & gray arrays
export function sampleImage(
  img: HTMLImageElement,
  sampleW: number,
  sampleH: number
): {
  r: Uint8ClampedArray;
  g: Uint8ClampedArray;
  b: Uint8ClampedArray;
  gray: Uint8ClampedArray;
} {
  const c = document.createElement('canvas');
  c.width = sampleW;
  c.height = sampleH;
  const ctx = c.getContext('2d', { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, sampleW, sampleH);
  const { data } = ctx.getImageData(0, 0, sampleW, sampleH);
  const n = sampleW * sampleH;
  const r = new Uint8ClampedArray(n),
    g = new Uint8ClampedArray(n),
    b = new Uint8ClampedArray(n),
    gray = new Uint8ClampedArray(n);
  for (let i = 0, p = 0; i < n; i++, p += 4) {
    const R = data[p],
      G = data[p + 1],
      B = data[p + 2];
    r[i] = R;
    g[i] = G;
    b[i] = B;
    // ITU-R BT.601 luma, like Canvas gray
    gray[i] = Math.round(0.299 * R + 0.587 * G + 0.114 * B);
  }
  return { r, g, b, gray };
}