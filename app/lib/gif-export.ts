import { GifWriter } from 'omggif';

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
      // Calculate optimal canvas dimensions (ensure integers)
      const lines = frames[0].text.split('\n');
      const fontSize = options.braille ? 14 : 12;
      const lineHeight = options.braille ? fontSize * 1.1 : fontSize;
      const charWidth = fontSize * 0.6;
      
      const maxWidth = Math.max(...lines.map(line => line.length));
      const canvasWidth = Math.round(Math.max(400, maxWidth * charWidth + 40));
      const canvasHeight = Math.round(Math.max(300, lines.length * lineHeight + 40));

      // Create a test canvas to get actual dimensions for GIF initialization
      const testCanvas = createCanvasFromText(
        frames[0].text.split('\n'),
        frames[0].colorMatrix,
        {
          bg: options.bg,
          fontFamily: options.fontFamily,
          braille: options.braille,
          width: canvasWidth,
          height: canvasHeight,
        }
      );
      
      // Use actual canvas dimensions for GIF
      const actualGifWidth = testCanvas.width;
      const actualGifHeight = testCanvas.height;
      
      // Create buffer for GIF data (optimized size calculation)
      const estimatedSize = actualGifWidth * actualGifHeight * frames.length + 1024;
      const buf = new Uint8Array(estimatedSize);
      const gif = new GifWriter(buf, actualGifWidth, actualGifHeight, {
        loop: 0 // Infinite loop
      });

      frames.forEach((frame) => {
        const canvas = createCanvasFromText(
          frame.text.split('\n'),
          frame.colorMatrix,
          {
            bg: options.bg,
            fontFamily: options.fontFamily,
            braille: options.braille,
            width: actualGifWidth,
            height: actualGifHeight,
          }
        );
        
        // Get image data from canvas - should match GIF dimensions exactly
        const ctx = canvas.getContext('2d')!;
        const imageData = ctx.getImageData(0, 0, actualGifWidth, actualGifHeight);
        
        // Verify dimensions match exactly
        if (imageData.width !== actualGifWidth || imageData.height !== actualGifHeight) {
          throw new Error(`Frame dimension mismatch: expected ${actualGifWidth}x${actualGifHeight}, got ${imageData.width}x${imageData.height}`);
        }
        
        // Convert RGBA to indexed color format for GIF
        const indexed = convertToIndexed(imageData, options.bg);
        
        // Validate pixel count
        const expectedPixels = actualGifWidth * actualGifHeight;
        if (indexed.pixels.length !== expectedPixels) {
          throw new Error(`Pixel count mismatch: expected ${expectedPixels}, got ${indexed.pixels.length}`);
        }
        
        // Add frame to GIF with optimizations and palette
        const opts = {
          delay: Math.max(10, Math.floor(frame.delay / 10)), // Convert to centiseconds (GIF uses 1/100 second units)
          disposal: 2, // Clear frame before next (prevents artifacts)
          // omggif expects a palette of packed 24-bit integers (0xRRGGBB)
          // with length equal to the number of colors (power of two, up to 256).
          palette: indexed.palette,
        };
        
        const pixelArray = Array.from(indexed.pixels);
        if (process.env.NODE_ENV === 'development') {
          console.log(`Adding frame with ${pixelArray.length} pixels to ${actualGifWidth}x${actualGifHeight} GIF`);
        }
        gif.addFrame(0, 0, actualGifWidth, actualGifHeight, pixelArray, opts);
      });

      // Get the final GIF buffer
      const gifData = buf.subarray(0, gif.end());
      
      // Download the GIF
      const blob = new Blob([gifData], { type: 'image/gif' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = options.filename;
      a.click();
      URL.revokeObjectURL(a.href);
      
      resolve();
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
    width: number;
    height: number;
  }
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  canvas.width = options.width;
  canvas.height = options.height;
  
  // Set background
  ctx.fillStyle = options.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Set font (ensure consistent measurements)
  const fontSize = options.braille ? 14 : 12;
  const lineHeight = Math.round(options.braille ? fontSize * 1.1 : fontSize);
  const charWidth = Math.round(fontSize * 0.6 * 10) / 10; // Round to 1 decimal place for consistency
  
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

// Simple color quantization for GIF palette
function convertToIndexed(imageData: ImageData, _bgColor: string): { pixels: Uint8Array; palette: number[] } {
  const { data, width, height } = imageData;
  const totalPixels = width * height;
  const pixels = new Uint8Array(totalPixels);
  
  // Verify we have the expected amount of data
  const expectedDataLength = totalPixels * 4; // RGBA
  if (data.length !== expectedDataLength) {
    console.warn(`Data length mismatch: expected ${expectedDataLength}, got ${data.length}`);
  }
  
  // Build a fixed 256-color 3-3-2 palette (8 reds x 8 greens x 4 blues)
  // Index computed as (rQ << 5) | (gQ << 2) | bQ
  const palette: number[] = new Array(256);
  for (let rQ = 0; rQ < 8; rQ++) {
    const r = Math.round((rQ * 255) / 7);
    for (let gQ = 0; gQ < 8; gQ++) {
      const g = Math.round((gQ * 255) / 7);
      for (let bQ = 0; bQ < 4; bQ++) {
        const b = Math.round((bQ * 255) / 3);
        const idx = (rQ << 5) | (gQ << 2) | bQ;
        palette[idx] = (r << 16) | (g << 8) | b;
      }
    }
  }
  
  // Convert pixels to indexed format - ensure we don't exceed array bounds
  const maxPixels = Math.min(data.length / 4, totalPixels);
  for (let pixelIndex = 0; pixelIndex < maxPixels; pixelIndex++) {
    const dataIndex = pixelIndex * 4;
    const r = data[dataIndex];
    const g = data[dataIndex + 1];
    const b = data[dataIndex + 2];
    const a = data[dataIndex + 3];
    
    if (a < 8) {
      // Treat near-transparent as black for stability
      pixels[pixelIndex] = 0;
      continue;
    }

    // Quantize directly to 3-3-2 bucket
    const rQ = Math.min(7, Math.max(0, Math.round((r / 255) * 7)));
    const gQ = Math.min(7, Math.max(0, Math.round((g / 255) * 7)));
    const bQ = Math.min(3, Math.max(0, Math.round((b / 255) * 3)));
    pixels[pixelIndex] = (rQ << 5) | (gQ << 2) | bQ;
  }
  
  // Fill any remaining pixels with background color if we had a data shortage
  for (let i = maxPixels; i < totalPixels; i++) {
    pixels[i] = 0;
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`Converted ${maxPixels} pixels for ${width}x${height} canvas`);
  }
  return { pixels, palette };
}

function parseColor(color: string): { r: number; g: number; b: number } {
  // Simple color parsing for common formats
  if (color.startsWith('rgba(')) {
    const match = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
    if (match) {
      return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
    }
  }
  if (color.startsWith('rgb(')) {
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
    }
  }
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16)
    };
  }
  // Default to black
  return { r: 0, g: 0, b: 0 };
}
