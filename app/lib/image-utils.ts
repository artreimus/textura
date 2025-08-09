// Import gifuct-js for proper GIF parsing
import { parseGIF, decompressFrames } from 'gifuct-js';

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// Default maps from Paul Bourke ref (same as the Go project)
export const SIMPLE_MAP = ' .:-=+*#%@';
export const DETAILED_MAP =
  ' .\'`^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

// GIF support utilities
interface GifFrame {
  canvas: HTMLCanvasElement;
  delay: number;
}

interface GifData {
  frames: GifFrame[];
  width: number;
  height: number;
  totalDuration: number;
}

// Enhanced image type that includes GIF data
export interface EnhancedImage extends HTMLImageElement {
  _gifData?: GifData;
}

// Check if buffer contains GIF data
function isGifBuffer(buffer: ArrayBuffer): boolean {
  const header = new Uint8Array(buffer, 0, 6);
  return (
    String.fromCharCode(...header.slice(0, 3)) === 'GIF' &&
    (String.fromCharCode(...header.slice(3, 6)) === '87a' ||
     String.fromCharCode(...header.slice(3, 6)) === '89a')
  );
}

// Enhanced GIF parser using gifuct-js for proper frame extraction
async function parseGif(buffer: ArrayBuffer): Promise<GifData> {
  try {
    // Parse GIF using gifuct-js
    const gif = parseGIF(buffer);
    const frames = decompressFrames(gif, true);
    
    if (frames.length === 0) {
      throw new Error('No frames found in GIF');
    }

    // Convert frames to canvas elements
    const canvasFrames: GifFrame[] = [];
    let totalDuration = 0;

    for (const frame of frames) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      canvas.width = gif.lsd.width;
      canvas.height = gif.lsd.height;
      
      // Create ImageData from frame patch
      const imageData = new ImageData(
        new Uint8ClampedArray(frame.patch),
        frame.dims.width,
        frame.dims.height
      );
      
      // Clear canvas if needed (depending on disposal method)
      if (frame.disposalType === 2) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      // Draw frame at correct position
      ctx.putImageData(imageData, frame.dims.left, frame.dims.top);
      
      const delay = frame.delay || 100; // Default to 100ms if no delay specified
      totalDuration += delay;
      
      canvasFrames.push({ canvas, delay });
    }

    return {
      frames: canvasFrames,
      width: gif.lsd.width,
      height: gif.lsd.height,
      totalDuration
    };
  } catch (error) {
    console.error('Failed to parse GIF:', error);
    throw error;
  }
}

// Create image with GIF support
async function createImageFromArrayBuffer(arrayBuffer: ArrayBuffer): Promise<HTMLImageElement> {
  const img = new Image();
  const blob = new Blob([arrayBuffer]);
  const url = URL.createObjectURL(blob);
  
  return new Promise(async (resolve, reject) => {
    img.onload = async () => {
      URL.revokeObjectURL(url);
      
      // Store GIF data if it's a GIF
      if (isGifBuffer(arrayBuffer)) {
        try {
          const gifData = await parseGif(arrayBuffer);
          (img as EnhancedImage)._gifData = gifData;
        } catch (error) {
          console.warn('Failed to parse GIF data:', error);
          // Still resolve with the image even if GIF parsing fails
        }
      }
      
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
    img.crossOrigin = 'anonymous';
  });
}

// Image utilities
export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise(async (resolve, reject) => {
    // Check if it's a GIF first
    if (file.type === 'image/gif') {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const arrayBuffer = reader.result as ArrayBuffer;
          const img = await createImageFromArrayBuffer(arrayBuffer);
          resolve(img);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    } else {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = reject;
      img.src = url;
      img.crossOrigin = 'anonymous';
    }
  });
}

export function loadImageFromUrl(src: string): Promise<HTMLImageElement> {
  return new Promise(async (resolve, reject) => {
    // Check if URL ends with .gif
    const isGif = src.toLowerCase().includes('.gif');
    
    if (isGif) {
      try {
        // Fetch as array buffer for GIF processing
        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();
        const img = await createImageFromArrayBuffer(arrayBuffer);
        resolve(img);
      } catch (error) {
        reject(error);
      }
    } else {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.crossOrigin = 'anonymous';
      img.src = src;
    }
  });
}

// Check if image is an animated GIF
export function isAnimatedGif(img: HTMLImageElement): boolean {
  if (!img) return false;
  const gifData = (img as EnhancedImage)._gifData;
  return !!(gifData && gifData.frames && gifData.frames.length > 1);
}

// Get GIF frame data
export function getGifData(img: HTMLImageElement): GifData | null {
  if (!img) return null;
  const gifData = (img as EnhancedImage)._gifData;
  return gifData && gifData.frames ? gifData : null;
}

// Get specific frame as ImageData for conversion
export function getGifFrameImageData(img: HTMLImageElement, frameIndex: number): ImageData | null {
  const gifData = getGifData(img);
  if (!gifData || frameIndex >= gifData.frames.length) return null;
  
  const frame = gifData.frames[frameIndex];
  const ctx = frame.canvas.getContext('2d');
  if (!ctx) return null;
  
  return ctx.getImageData(0, 0, frame.canvas.width, frame.canvas.height);
}

// Floyd–Steinberg dithering for grayscale values (0..255) - optimized
export function floydSteinbergDither(
  values: number[],
  w: number,
  h: number
): number[] {
  const data = new Float32Array(values); // Use Float32Array for better performance
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const old = data[i];
      const newVal = old < 128 ? 0 : 255;
      data[i] = newVal;
      const err = old - newVal;
      
      // Distribute error more efficiently
      const err7 = (err * 7) / 16;
      const err3 = (err * 3) / 16;
      const err5 = (err * 5) / 16;
      const err1 = err / 16;
      
      if (x + 1 < w) {
        const idx = i + 1;
        data[idx] = Math.max(0, Math.min(255, data[idx] + err7));
      }
      if (x - 1 >= 0 && y + 1 < h) {
        const idx = i + w - 1;
        data[idx] = Math.max(0, Math.min(255, data[idx] + err3));
      }
      if (y + 1 < h) {
        const idx = i + w;
        data[idx] = Math.max(0, Math.min(255, data[idx] + err5));
      }
      if (x + 1 < w && y + 1 < h) {
        const idx = i + w + 1;
        data[idx] = Math.max(0, Math.min(255, data[idx] + err1));
      }
    }
  }
  return Array.from(data);
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

// Reusable canvas for performance optimization
let _reusableCanvas: HTMLCanvasElement | null = null;
let _reusableCtx: CanvasRenderingContext2D | null = null;

// Sample an image to a smaller grid and return per-pixel RGB & gray arrays (optimized)
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
  // Reuse canvas and context for better performance
  if (!_reusableCanvas) {
    _reusableCanvas = document.createElement('canvas');
    _reusableCtx = _reusableCanvas.getContext('2d', { willReadFrequently: true })!;
  }
  
  const c = _reusableCanvas;
  const ctx = _reusableCtx!;
  c.width = sampleW;
  c.height = sampleH;
  
  ctx.drawImage(img, 0, 0, sampleW, sampleH);
  const { data } = ctx.getImageData(0, 0, sampleW, sampleH);
  const n = sampleW * sampleH;
  const r = new Uint8ClampedArray(n);
  const g = new Uint8ClampedArray(n);
  const b = new Uint8ClampedArray(n);
  const gray = new Uint8ClampedArray(n);
  
  // Optimized single loop with bitwise operations where possible
  for (let i = 0, p = 0; i < n; i++, p += 4) {
    const R = data[p];
    const G = data[p + 1];
    const B = data[p + 2];
    r[i] = R;
    g[i] = G;
    b[i] = B;
    // ITU-R BT.601 luma calculation (optimized with bitwise operations)
    gray[i] = (R * 77 + G * 151 + B * 28) >> 8;
  }
  return { r, g, b, gray };
}

// Sample image data directly from ImageData (for GIF frames)
export function sampleImageData(
  imageData: ImageData,
  sampleW: number,
  sampleH: number
): {
  r: Uint8ClampedArray;
  g: Uint8ClampedArray;
  b: Uint8ClampedArray;
  gray: Uint8ClampedArray;
} {
  const { data, width, height } = imageData;
  const n = sampleW * sampleH;
  const r = new Uint8ClampedArray(n);
  const g = new Uint8ClampedArray(n);
  const b = new Uint8ClampedArray(n);
  const gray = new Uint8ClampedArray(n);

  // Scale from original dimensions to sample dimensions
  const scaleX = width / sampleW;
  const scaleY = height / sampleH;

  for (let y = 0; y < sampleH; y++) {
    for (let x = 0; x < sampleW; x++) {
      const srcX = Math.floor(x * scaleX);
      const srcY = Math.floor(y * scaleY);
      const srcIndex = (srcY * width + srcX) * 4;
      const dstIndex = y * sampleW + x;

      const R = data[srcIndex];
      const G = data[srcIndex + 1];
      const B = data[srcIndex + 2];
      
      r[dstIndex] = R;
      g[dstIndex] = G;
      b[dstIndex] = B;
      gray[dstIndex] = (R * 77 + G * 151 + B * 28) >> 8;
    }
  }
  return { r, g, b, gray };
}