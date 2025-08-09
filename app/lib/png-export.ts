// Draw the current art to a PNG using Canvas and trigger download
export function savePngFromText(
  lines: string[],
  colors: (string | null)[][],
  opts: {
    filename: string;
    bg: string;
    fontFamily: string;
    fontSize?: number;
    lineHeight?: number;
    braille?: boolean;
  }
): string {
  const fontSize = opts.fontSize ?? 14;
  const lineHeight = opts.lineHeight ?? (opts.braille ? 1.4 : 2.0); // braille needs less vertical spacing
  const pad = 8;
  const cols = lines.reduce((m, l) => Math.max(m, l.length), 0);
  const rows = lines.length;

  // Measure roughly: monospace width ~ 0.6 * fontSize; we can refine with measureText
  const test = document.createElement('canvas');
  const tctx = test.getContext('2d')!;
  tctx.font = `${fontSize}px ${opts.fontFamily}`;
  const metrics = tctx.measureText('M');
  const estCharW = metrics.width || fontSize * 0.6;
  const charW = estCharW;
  // const charH = fontSize * lineHeight * 0.5; // brings output closer to terminal look

  const width = Math.max(1, Math.round(cols * charW + pad * 2));
  const height = Math.max(
    1,
    Math.round(rows * (fontSize * lineHeight) + pad * 2)
  );

  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  const ctx = c.getContext('2d')!;

  // background
  ctx.fillStyle = opts.bg;
  ctx.fillRect(0, 0, width, height);
  ctx.font = `${fontSize}px ${opts.fontFamily}`;
  ctx.textBaseline = 'top';

  for (let y = 0; y < rows; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const ch = line[x];
      const color = colors[y]?.[x] || null;
      if (color) ctx.fillStyle = color;
      else ctx.fillStyle = 'white';
      const dx = pad + x * charW;
      const dy = pad + y * (fontSize * lineHeight);
      ctx.fillText(ch, dx, dy);
    }
  }

  const url = c.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = opts.filename;
  a.click();
  return url;
}