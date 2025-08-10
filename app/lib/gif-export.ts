import GIF from 'gif.js';

interface GifExportOptions {
  filename: string;
  bg: string;
  fontFamily: string;
  braille: boolean;
  quality: number;
  delay: number;
}

export function saveGifFromFrames(
  frames: { text: string; colorMatrix: (string | null)[][]; delay: number }[],
  options: GifExportOptions
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const gif = new GIF({
        workers: 2,
        quality: options.quality,
        width: 800,
        height: 600,
        workerScript: '/gif.worker.js', // We'll need to add this to public folder
      });

      frames.forEach((frame) => {
        const canvas = createCanvasFromText(
          frame.text.split('\n'),
          frame.colorMatrix,
          {
            bg: options.bg,
            fontFamily: options.fontFamily,
            braille: options.braille,
          }
        );
        
        gif.addFrame(canvas, { delay: frame.delay });
      });

      gif.on('finished', (blob: Blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = options.filename;
        a.click();
        URL.revokeObjectURL(a.href);
        resolve();
      });

      gif.on('error', (error: Error) => {
        reject(error);
      });

      gif.render();
    } catch (error) {
      reject(error);
    }
  });
}

function createCanvasFromText(
  lines: string[],
  colorMatrix: (string | null)[][],
  options: {
    bg: string;
    fontFamily: string;
    braille: boolean;
  }
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  // Calculate canvas dimensions
  const fontSize = options.braille ? 14 : 12;
  const lineHeight = options.braille ? fontSize * 1.1 : fontSize;
  const charWidth = fontSize * 0.6;
  
  const maxWidth = Math.max(...lines.map(line => line.length));
  canvas.width = Math.max(800, maxWidth * charWidth + 40);
  canvas.height = Math.max(600, lines.length * lineHeight + 40);
  
  // Set background
  ctx.fillStyle = options.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Set font
  ctx.font = `${fontSize}px ${options.fontFamily}`;
  ctx.textBaseline = 'top';
  
  // Draw text
  lines.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      const color = colorMatrix[y]?.[x];
      
      ctx.fillStyle = color || '#ffffff';
      ctx.fillText(
        char,
        20 + x * charWidth,
        20 + y * lineHeight
      );
    }
  });
  
  return canvas;
}