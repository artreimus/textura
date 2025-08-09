'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Copy,
  ImageIcon,
  RefreshCw,
  Upload,
  Wand2,
  FlipHorizontal2,
  FlipVertical2,
  Type,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// Default maps from Paul Bourke ref (same as the Go project)
const SIMPLE_MAP = ' .:-=+*#%@';
const DETAILED_MAP =
  ' .\'`^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

// Image utilities
function loadImageFromFile(file: File): Promise<HTMLImageElement> {
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

function loadImageFromUrl(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = 'anonymous';
    img.src = src;
  });
}

// Floyd–Steinberg dithering for grayscale values (0..255)
function floydSteinbergDither(
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
function computeCharGrid(
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
function sampleImage(
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

// Convert to ASCII text with optional color spans
function toAscii({
  cols,
  rows,
  flipX,
  flipY,
  negative,
  coloredMode,
  colorBg,
  charMap,
  r,
  g,
  b,
  gray,
}: {
  cols: number;
  rows: number;
  flipX: boolean;
  flipY: boolean;
  negative: boolean;
  coloredMode: 'none' | 'grayscale' | 'color';
  colorBg: boolean;
  charMap: string;
  r: Uint8ClampedArray;
  g: Uint8ClampedArray;
  b: Uint8ClampedArray;
  gray: Uint8ClampedArray;
}) {
  const sampleW = cols;
  const sampleH = rows;
  const pieces: React.ReactNode[] = [];
  const rawLines: string[] = [];
  const idx = (x: number, y: number) => y * sampleW + x;

  const mapLen = charMap.length;

  for (let y = 0; y < sampleH; y++) {
    const lineSpans: React.ReactNode[] = [];
    const raw: string[] = [];
    for (let x = 0; x < sampleW; x++) {
      const sx = flipX ? sampleW - 1 - x : x;
      const sy = flipY ? sampleH - 1 - y : y;
      const i = idx(sx, sy);
      let R = r[i],
        G = g[i],
        B = b[i];
      let L = gray[i];
      if (negative) {
        R = 255 - R;
        G = 255 - G;
        B = 255 - B;
        L = 255 - L;
      }
      const mapIndex = Math.min(mapLen - 1, Math.floor((L / 255) * mapLen));
      const ch = charMap[Math.min(mapLen - 1, mapIndex)];
      raw.push(ch);
      let style: React.CSSProperties | undefined;
      if (coloredMode === 'color') {
        style = colorBg
          ? { backgroundColor: `rgb(${R},${G},${B})` }
          : { color: `rgb(${R},${G},${B})` };
      } else if (coloredMode === 'grayscale') {
        style = colorBg
          ? { backgroundColor: `rgb(${L},${L},${L})` }
          : { color: `rgb(${L},${L},${L})` };
      }
      lineSpans.push(
        <span key={x} style={style}>
          {ch}
        </span>
      );
    }
    rawLines.push(raw.join(''));
    pieces.push(<div key={y}>{lineSpans}</div>);
  }

  return { jsx: pieces, text: rawLines.join('\n') };
}

// Convert to Braille text (2x4 dots per char)
function toBraille({
  cols,
  rows,
  flipX,
  flipY,
  negative,
  coloredMode,
  colorBg,
  r,
  g,
  b,
  gray,
  threshold,
  dither,
}: {
  cols: number;
  rows: number;
  flipX: boolean;
  flipY: boolean;
  negative: boolean;
  coloredMode: 'none' | 'grayscale' | 'color';
  colorBg: boolean;
  r: Uint8ClampedArray;
  g: Uint8ClampedArray;
  b: Uint8ClampedArray;
  gray: Uint8ClampedArray;
  threshold: number;
  dither: boolean;
}) {
  // Sample grid for braille is (cols*2) x (rows*4)
  const sampleW = cols * 2,
    sampleH = rows * 4;
  const idx = (x: number, y: number) => y * sampleW + x;
  const pieces: React.ReactNode[] = [];
  const rawLines: string[] = [];

  // Prepare luma source; optionally dither
  let luma = Array.from(gray) as number[];
  if (dither) luma = floydSteinbergDither(luma, sampleW, sampleH);

  for (let gy = 0; gy < rows; gy++) {
    const lineSpans: React.ReactNode[] = [];
    const raw: string[] = [];
    for (let gx = 0; gx < cols; gx++) {
      // Build braille dots; canonical order
      const dotMask = [
        [0x1, 0x8],
        [0x2, 0x10],
        [0x4, 0x20],
        [0x40, 0x80],
      ];
      let code = 0x2800;
      // average color for cell
      let sumR = 0,
        sumG = 0,
        sumB = 0,
        sumL = 0,
        count = 0;
      for (let dy = 0; dy < 4; dy++) {
        for (let dx = 0; dx < 2; dx++) {
          let sx = gx * 2 + dx;
          let sy = gy * 4 + dy;
          sx = flipX ? sampleW - 1 - sx : sx;
          sy = flipY ? sampleH - 1 - sy : sy;
          const i = idx(sx, sy);
          let L = luma[i];
          if (negative) L = 255 - L;
          if (L >= threshold) code += dotMask[dy][dx];
          // color sample from original arrays (not dithered)
          let R = r[i],
            G = g[i],
            B = b[i];
          if (negative) {
            R = 255 - R;
            G = 255 - G;
            B = 255 - B;
          }
          sumR += R;
          sumG += G;
          sumB += B;
          sumL += L;
          count++;
        }
      }
      const ch = String.fromCharCode(code);
      raw.push(ch);
      const avgR = Math.round(sumR / count),
        avgG = Math.round(sumG / count),
        avgB = Math.round(sumB / count),
        avgL = Math.round(sumL / count);
      let style: React.CSSProperties | undefined;
      if (coloredMode === 'color')
        style = colorBg
          ? { backgroundColor: `rgb(${avgR},${avgG},${avgB})` }
          : { color: `rgb(${avgR},${avgG},${avgB})` };
      else if (coloredMode === 'grayscale')
        style = colorBg
          ? { backgroundColor: `rgb(${avgL},${avgL},${avgL})` }
          : { color: `rgb(${avgL},${avgL},${avgL})` };
      lineSpans.push(
        <span key={gx} style={style}>
          {ch}
        </span>
      );
    }
    rawLines.push(raw.join(''));
    pieces.push(<div key={gy}>{lineSpans}</div>);
  }

  return { jsx: pieces, text: rawLines.join('\n') };
}

// Draw the current art to a PNG using Canvas and trigger download
function savePngFromText(
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
  const charH = fontSize * lineHeight * 0.5; // brings output closer to terminal look

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

export default function AsciiImageConverter() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [imgUrl, setImgUrl] = useState<string>('');

  // Options
  const [mode, setMode] = useState<'ascii' | 'braille'>('ascii');
  const [mapKind, setMapKind] = useState<'simple' | 'detailed' | 'custom'>(
    'simple'
  );
  const [customMap, setCustomMap] = useState<string>(SIMPLE_MAP);
  const [widthChars, setWidthChars] = useState<number>(120);
  const [heightChars, setHeightChars] = useState<number>(0); // 0 = auto
  const [coloredMode, setColoredMode] = useState<
    'none' | 'grayscale' | 'color'
  >('none');
  const [colorBg, setColorBg] = useState<boolean>(false);
  const [negative, setNegative] = useState<boolean>(false);
  const [flipX, setFlipX] = useState<boolean>(false);
  const [flipY, setFlipY] = useState<boolean>(false);
  const [threshold, setThreshold] = useState<number>(128);
  const [dither, setDither] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState<string>('rgba(0,0,0,1)');
  const [fontFamily, setFontFamily] = useState<string>(
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
  );

  // Results
  const [rendered, setRendered] = useState<React.ReactNode | null>(null);
  const [rawText, setRawText] = useState<string>('');
  const colorMatrixRef = useRef<(string | null)[][]>([]); // for PNG export

  const activeMap = useMemo(() => {
    if (mode === 'braille') return ''; // unused
    if (mapKind === 'custom')
      return customMap && customMap.length >= 2 ? customMap : SIMPLE_MAP;
    return mapKind === 'detailed' ? DETAILED_MAP : SIMPLE_MAP;
  }, [mapKind, customMap, mode]);

  const doConvert = useCallback(() => {
    if (!img) return;

    const fitTo = Math.min(140, Math.floor((window.innerWidth - 64) / 7)); // rough fit to container
    const { cols, rows } = computeCharGrid(img.width, img.height, {
      width: widthChars || undefined,
      height: heightChars || undefined,
      isBraille: mode === 'braille',
      fitTo: widthChars === 0 ? fitTo : null,
    });

    if (mode === 'ascii') {
      const { r, g, b, gray } = sampleImage(img, cols, rows);
      const { jsx, text } = toAscii({
        cols,
        rows,
        flipX,
        flipY,
        negative,
        coloredMode,
        colorBg,
        charMap: activeMap,
        r,
        g,
        b,
        gray,
      });
      // Also capture color matrix for PNG
      const colorMatrix: (string | null)[][] = [];
      const idx = (x: number, y: number) => y * cols + x;
      for (let y = 0; y < rows; y++) {
        const lineColors: (string | null)[] = [];
        for (let x = 0; x < cols; x++) {
          let R = r[idx(x, y)],
            G = g[idx(x, y)],
            B = b[idx(x, y)];
          let L = gray[idx(x, y)];
          if (negative) {
            R = 255 - R;
            G = 255 - G;
            B = 255 - B;
            L = 255 - L;
          }
          if (coloredMode === 'color') lineColors.push(`rgb(${R},${G},${B})`);
          else if (coloredMode === 'grayscale')
            lineColors.push(`rgb(${L},${L},${L})`);
          else lineColors.push(null);
        }
        colorMatrix.push(lineColors);
      }
      colorMatrixRef.current = colorMatrix;
      setRendered(
        <pre className="font-mono leading-[1] text-[12px] select-text whitespace-pre">
          {jsx}
        </pre>
      );
      setRawText(text);
    } else {
      const sampleW = cols * 2,
        sampleH = rows * 4;
      const { r, g, b, gray } = sampleImage(img, sampleW, sampleH);
      const { jsx, text } = toBraille({
        cols,
        rows,
        flipX,
        flipY,
        negative,
        coloredMode,
        colorBg,
        r,
        g,
        b,
        gray,
        threshold,
        dither,
      });
      // Build colors for PNG
      const colorMatrix: (string | null)[][] = [];
      const idx2 = (x: number, y: number) => y * cols + x; // braille output grid
      // For PNG, we'll recompute from JSX easier: approximate by grayscale/color mode average via toBraille path
      // Here we just leave nulls to default white when saving if none/grayscale; to keep concise, skip re-avg.
      for (let y = 0; y < rows; y++) {
        const line: (string | null)[] = new Array(cols).fill(null);
        colorMatrix.push(line);
      }
      colorMatrixRef.current = colorMatrix; // minimal color info; PNG will default to white
      setRendered(
        <pre className="font-mono leading-[1.1] text-[14px] select-text whitespace-pre">
          {jsx}
        </pre>
      );
      setRawText(text);
    }
  }, [
    img,
    widthChars,
    heightChars,
    mode,
    activeMap,
    coloredMode,
    colorBg,
    negative,
    flipX,
    flipY,
    threshold,
    dither,
  ]);

  useEffect(() => {
    doConvert();
  }, [doConvert]);

  const onFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const image = await loadImageFromFile(file);
    setImg(image);
    setImgUrl('');
  };

  const onLoadUrl = async () => {
    if (!imgUrl.trim()) return;
    const image = await loadImageFromUrl(imgUrl.trim());
    setImg(image);
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawText);
    } catch {}
  };

  const onDownloadTxt = () => {
    const blob = new Blob([rawText], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (mode === 'braille' ? 'braille' : 'ascii') + '-art.txt';
    a.click();
  };

  const onDownloadPng = () => {
    const lines = rawText.split('\n');
    const colors = colorMatrixRef.current;
    savePngFromText(lines, colors, {
      filename: (mode === 'braille' ? 'braille' : 'ascii') + '-art.png',
      bg: bgColor,
      fontFamily,
    });
  };

  const reset = () => {
    setMapKind('simple');
    setCustomMap(SIMPLE_MAP);
    setColoredMode('none');
    setColorBg(false);
    setNegative(false);
    setFlipX(false);
    setFlipY(false);
    setThreshold(128);
    setDither(false);
    setWidthChars(120);
    setHeightChars(0);
    setMode('ascii');
    setBgColor('rgba(0,0,0,1)');
    setFontFamily(
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-950 dark:to-zinc-900 text-slate-900 dark:text-zinc-100">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-bold tracking-tight mb-6 flex items-center gap-3"
        >
          <ImageIcon className="w-7 h-7" /> Image → ASCII/Braille Converter
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: inputs */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
                  <CardTitle>Source image</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <Label className="block text-sm font-medium">
                    Upload file
                  </Label>
                  <label className="flex items-center justify-center gap-2 border-2 border-dashed rounded-2xl p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800">
                    <Upload className="w-5 h-5" />
                    <span>Drop or click to upload…</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => onFiles(e.target.files)}
                    />
                  </label>
                  <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
                    <Input
                      value={imgUrl}
                      onChange={(e) => setImgUrl(e.target.value)}
                      placeholder="https://example.com/image.png"
                    />
                    <Button onClick={onLoadUrl}>Load</Button>
                  </div>
                  {img && (
                    <div className="text-xs text-slate-600 dark:text-zinc-400">
                      Loaded: {img.width}×{img.height}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
                  <CardTitle>Mode & dimensions</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Button
                    onClick={() => setMode('ascii')}
                    variant={mode === 'ascii' ? 'default' : 'outline'}
                  >
                    ASCII
                  </Button>
                  <Button
                    onClick={() => setMode('braille')}
                    variant={mode === 'braille' ? 'default' : 'outline'}
                  >
                    Braille
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm">Width (chars)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={350}
                      value={widthChars}
                      onChange={(e) =>
                        setWidthChars(parseInt(e.target.value || '0'))
                      }
                    />
                    <p className="text-xs mt-1 text-slate-500">0 = auto-fit</p>
                  </div>
                  <div>
                    <Label className="text-sm">Height (chars)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={350}
                      value={heightChars}
                      onChange={(e) =>
                        setHeightChars(parseInt(e.target.value || '0'))
                      }
                    />
                    <p className="text-xs mt-1 text-slate-500">0 = auto</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {mode === 'ascii' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
                    <CardTitle>Character map</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {(['simple', 'detailed', 'custom'] as const).map((k) => (
                      <Button
                        key={k}
                        onClick={() => setMapKind(k)}
                        variant={mapKind === k ? 'default' : 'outline'}
                      >
                        {k}
                      </Button>
                    ))}
                  </div>
                  <div>
                    <Label className="text-sm">Custom map (dark → light)</Label>
                    <Input
                      disabled={mapKind !== 'custom'}
                      value={customMap}
                      onChange={(e) => setCustomMap(e.target.value)}
                    />
                    <p className="text-xs mt-1 text-slate-500">
                      At least 2 characters. Example: &quot; .-=+#@&quot;
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
                  <CardTitle>Colors & effects</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div className="grid grid-cols-3 gap-2">
                    {(['none', 'grayscale', 'color'] as const).map((opt) => (
                      <Button
                        key={opt}
                        onClick={() => setColoredMode(opt)}
                        variant={coloredMode === opt ? 'default' : 'outline'}
                      >
                        {opt}
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="color-bg"
                        checked={colorBg}
                        onCheckedChange={(checked) => setColorBg(!!checked)}
                      />
                      <Label htmlFor="color-bg">Use color as background</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="negative"
                        checked={negative}
                        onCheckedChange={(checked) => setNegative(!!checked)}
                      />
                      <Label htmlFor="negative">Negative</Label>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="flip-x"
                        checked={flipX}
                        onCheckedChange={(checked) => setFlipX(!!checked)}
                      />
                      <Label
                        htmlFor="flip-x"
                        className="flex items-center gap-2"
                      >
                        <FlipHorizontal2 className="w-4 h-4" /> Flip X
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="flip-y"
                        checked={flipY}
                        onCheckedChange={(checked) => setFlipY(!!checked)}
                      />
                      <Label
                        htmlFor="flip-y"
                        className="flex items-center gap-2"
                      >
                        <FlipVertical2 className="w-4 h-4" /> Flip Y
                      </Label>
                    </div>
                  </div>
                  {mode === 'braille' && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-sm">
                          Braille threshold: {threshold}
                        </Label>
                        <Slider
                          value={[threshold]}
                          onValueChange={(values) => setThreshold(values[0])}
                          min={0}
                          max={255}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="dither"
                          checked={dither}
                          onCheckedChange={(checked) => setDither(!!checked)}
                        />
                        <Label htmlFor="dither">
                          Apply Floyd–Steinberg dithering
                        </Label>
                      </div>
                    </>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm">PNG background</Label>
                      <Input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                      />
                      <p className="text-xs mt-1 text-slate-500">
                        Any CSS color (e.g., #000, rgba(0,0,0,1))
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm">PNG font family</Label>
                      <Input
                        type="text"
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                      />
                      <p className="text-xs mt-1 text-slate-500">
                        Monospace recommended
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2 flex-wrap">
              <Button onClick={doConvert}>
                <Wand2 className="w-4 h-4" /> Convert
              </Button>
              <Button onClick={onCopy} disabled={!rawText} variant="outline">
                <Copy className="w-4 h-4" /> Copy text
              </Button>
              <Button
                onClick={onDownloadTxt}
                disabled={!rawText}
                variant="outline"
              >
                <Download className="w-4 h-4" /> TXT
              </Button>
              <Button
                onClick={onDownloadPng}
                disabled={!rawText}
                variant="outline"
              >
                <Download className="w-4 h-4" /> PNG
              </Button>
              <Button onClick={reset} variant="outline">
                <RefreshCw className="w-4 h-4" /> Reset
              </Button>
            </div>
          </div>

          {/* Right column: preview */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
                  <CardTitle>Preview</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {!img ? (
                  <div className="h-64 flex items-center justify-center text-slate-500">
                    <div className="text-center">
                      <Type className="w-8 h-8 mx-auto mb-2" />
                      <p>Load an image to convert.</p>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-auto max-h-[70vh] rounded-xl p-4 bg-black/80 text-white">
                    {rendered}
                  </div>
                )}
              </CardContent>
            </Card>

            {img && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
                    <CardTitle>Original image</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-xl border bg-white dark:bg-zinc-900">
                    <img
                      src={img.src}
                      alt="source"
                      className="max-h-[60vh] object-contain w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
                  <CardTitle>Notes</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm list-disc pl-5 space-y-1 text-slate-600 dark:text-zinc-400">
                  <li>
                    For best results, reduce width/height if the preview feels
                    heavy. We clamp to 350×350 characters.
                  </li>
                  <li>
                    &quot;Color as background&quot; paints each character&apos;s
                    background instead of the glyph.
                  </li>
                  <li>
                    Braille uses a 2×4 dot cell; dithering helps contrast on
                    photos.
                  </li>
                  <li>
                    GIFs aren&apos;t supported in-browser here (single frames
                    only). Want that next?
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="mt-10 text-xs text-slate-500 dark:text-zinc-500">
          Built with ❤️. Inspired by ascii-image-converter (Apache-2.0). This
          web app is MIT-licensed.
        </footer>
      </div>
    </div>
  );
}
