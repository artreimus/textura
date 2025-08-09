import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import {
  loadImageFromFile,
  loadImageFromUrl,
  computeCharGrid,
  sampleImage,
  sampleImageData,
  getGifFrameImageData,
  SIMPLE_MAP,
  DETAILED_MAP,
  floydSteinbergDither,
  isAnimatedGif,
  getGifData,
} from '@/app/lib/image-utils';

// Conversion types and functions
interface ConversionOptions {
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
}

interface AsciiConversionOptions extends ConversionOptions {
  charMap: string;
}

interface BrailleConversionOptions extends ConversionOptions {
  threshold: number;
  dither: boolean;
}

interface ConversionResult {
  jsx: React.ReactNode[];
  text: string;
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
}: AsciiConversionOptions): ConversionResult {
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
}: BrailleConversionOptions): ConversionResult {
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

export interface ConversionSettings {
  mode: 'ascii' | 'braille';
  mapKind: 'simple' | 'detailed' | 'custom';
  customMap: string;
  widthChars: number;
  heightChars: number;
  coloredMode: 'none' | 'grayscale' | 'color';
  colorBg: boolean;
  negative: boolean;
  flipX: boolean;
  flipY: boolean;
  threshold: number;
  dither: boolean;
  bgColor: string;
  fontFamily: string;
  // GIF animation settings
  gifSpeed: number;
  gifPlaying: boolean;
  gifCurrentFrame: number;
}

export function useImageConverter() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [imgSrc, setImgSrc] = useState<string>(''); // For displaying the image
  const [imgUrl, setImgUrl] = useState<string>(''); // For the URL input
  const [isGif, setIsGif] = useState<boolean>(false);
  const animationRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);

  // Settings state
  const [settings, setSettings] = useState<ConversionSettings>({
    mode: 'ascii',
    mapKind: 'simple',
    customMap: SIMPLE_MAP,
    widthChars: 120,
    heightChars: 0,
    coloredMode: 'none',
    colorBg: false,
    negative: false,
    flipX: false,
    flipY: false,
    threshold: 128,
    dither: false,
    bgColor: 'rgba(0,0,0,1)',
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    // GIF animation settings
    gifSpeed: 1.0,
    gifPlaying: true,
    gifCurrentFrame: 0,
  });

  // Results state
  const [rendered, setRendered] = useState<React.ReactNode | null>(null);
  const [rawText, setRawText] = useState<string>('');
  const colorMatrixRef = useRef<(string | null)[][]>([]);

  const activeMap = useMemo(() => {
    if (settings.mode === 'braille') return '';
    if (settings.mapKind === 'custom')
      return settings.customMap && settings.customMap.length >= 2
        ? settings.customMap
        : SIMPLE_MAP;
    return settings.mapKind === 'detailed' ? DETAILED_MAP : SIMPLE_MAP;
  }, [settings.mapKind, settings.customMap, settings.mode]);

  const updateSetting = useCallback(
    <K extends keyof ConversionSettings>(
      key: K,
      value: ConversionSettings[K]
    ) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const loadImageFromFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const image = await loadImageFromFile(file);
    const fileUrl = URL.createObjectURL(file);
    setImg(image);
    setImgSrc(fileUrl);
    setImgUrl('');
    setIsGif(isAnimatedGif(image));
    if (isAnimatedGif(image)) {
      setSettings(prev => ({ ...prev, gifCurrentFrame: 0, gifPlaying: true }));
    }
  }, []);

  const loadImageFromURL = useCallback(async () => {
    if (!imgUrl.trim()) return;
    const image = await loadImageFromUrl(imgUrl.trim());
    setImg(image);
    setImgSrc(imgUrl.trim());
    setIsGif(isAnimatedGif(image));
    if (isAnimatedGif(image)) {
      setSettings(prev => ({ ...prev, gifCurrentFrame: 0, gifPlaying: true }));
    }
  }, [imgUrl]);

  const convert = useCallback(() => {
    if (!img) return;

    const fitTo = Math.min(140, Math.floor((window.innerWidth - 64) / 7));
    const { cols, rows } = computeCharGrid(img.width, img.height, {
      width: settings.widthChars || undefined,
      height: settings.heightChars || undefined,
      isBraille: settings.mode === 'braille',
      fitTo: settings.widthChars === 0 ? fitTo : null,
    });

    if (settings.mode === 'ascii') {
      // Handle GIF frame sampling
      let r: Uint8ClampedArray, g: Uint8ClampedArray, b: Uint8ClampedArray, gray: Uint8ClampedArray;
      
      if (isGif) {
        const frameImageData = getGifFrameImageData(img, settings.gifCurrentFrame);
        if (frameImageData) {
          ({ r, g, b, gray } = sampleImageData(frameImageData, cols, rows));
        } else {
          ({ r, g, b, gray } = sampleImage(img, cols, rows));
        }
      } else {
        ({ r, g, b, gray } = sampleImage(img, cols, rows));
      }
      const { jsx, text } = toAscii({
        cols,
        rows,
        flipX: settings.flipX,
        flipY: settings.flipY,
        negative: settings.negative,
        coloredMode: settings.coloredMode,
        colorBg: settings.colorBg,
        charMap: activeMap,
        r,
        g,
        b,
        gray,
      });

      // Capture color matrix for PNG export
      const colorMatrix: (string | null)[][] = [];
      const idx = (x: number, y: number) => y * cols + x;
      for (let y = 0; y < rows; y++) {
        const lineColors: (string | null)[] = [];
        for (let x = 0; x < cols; x++) {
          let R = r[idx(x, y)],
            G = g[idx(x, y)],
            B = b[idx(x, y)];
          let L = gray[idx(x, y)];
          if (settings.negative) {
            R = 255 - R;
            G = 255 - G;
            B = 255 - B;
            L = 255 - L;
          }
          if (settings.coloredMode === 'color')
            lineColors.push(`rgb(${R},${G},${B})`);
          else if (settings.coloredMode === 'grayscale')
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
        
      // Handle GIF frame sampling for Braille mode
      let r: Uint8ClampedArray, g: Uint8ClampedArray, b: Uint8ClampedArray, gray: Uint8ClampedArray;
      
      if (isGif) {
        const frameImageData = getGifFrameImageData(img, settings.gifCurrentFrame);
        if (frameImageData) {
          ({ r, g, b, gray } = sampleImageData(frameImageData, sampleW, sampleH));
        } else {
          ({ r, g, b, gray } = sampleImage(img, sampleW, sampleH));
        }
      } else {
        ({ r, g, b, gray } = sampleImage(img, sampleW, sampleH));
      }
      const { jsx, text } = toBraille({
        cols,
        rows,
        flipX: settings.flipX,
        flipY: settings.flipY,
        negative: settings.negative,
        coloredMode: settings.coloredMode,
        colorBg: settings.colorBg,
        r,
        g,
        b,
        gray,
        threshold: settings.threshold,
        dither: settings.dither,
      });

      // Build minimal color matrix for PNG export
      const colorMatrix: (string | null)[][] = [];
      for (let y = 0; y < rows; y++) {
        const line: (string | null)[] = new Array(cols).fill(null);
        colorMatrix.push(line);
      }
      colorMatrixRef.current = colorMatrix;
      setRendered(
        <pre className="font-mono leading-[1.1] text-[14px] select-text whitespace-pre">
          {jsx}
        </pre>
      );
      setRawText(text);
    }
  }, [img, settings, activeMap, isGif]);

  const reset = useCallback(() => {
    // Clean up animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // Clean up blob URL if it exists
    if (imgSrc && imgSrc.startsWith('blob:')) {
      URL.revokeObjectURL(imgSrc);
    }
    setImg(null);
    setImgSrc('');
    setImgUrl('');
    setIsGif(false);
    setSettings({
      mode: 'ascii',
      mapKind: 'simple',
      customMap: SIMPLE_MAP,
      widthChars: 120,
      heightChars: 0,
      coloredMode: 'none',
      colorBg: false,
      negative: false,
      flipX: false,
      flipY: false,
      threshold: 128,
      dither: false,
      bgColor: 'rgba(0,0,0,1)',
      fontFamily:
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      gifSpeed: 1.0,
      gifPlaying: true,
      gifCurrentFrame: 0,
    });
  }, [imgSrc]);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      if (imgSrc && imgSrc.startsWith('blob:')) {
        URL.revokeObjectURL(imgSrc);
      }
    };
  }, [imgSrc]);

  // GIF animation logic
  const animateGif = useCallback(() => {
    if (!img || !isGif || !settings.gifPlaying) return;
    
    const gifData = getGifData(img);
    if (!gifData || gifData.frames.length <= 1) return;
    
    const animate = (currentTime: number) => {
      if (currentTime - lastFrameTimeRef.current >= (gifData.frames[settings.gifCurrentFrame].delay / settings.gifSpeed)) {
        setSettings(prev => ({
          ...prev,
          gifCurrentFrame: (prev.gifCurrentFrame + 1) % gifData.frames.length
        }));
        lastFrameTimeRef.current = currentTime;
      }
      
      if (settings.gifPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  }, [img, isGif, settings.gifPlaying, settings.gifCurrentFrame, settings.gifSpeed]);
  
  // Start/stop GIF animation
  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    if (isGif && settings.gifPlaying) {
      animateGif();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animateGif, isGif, settings.gifPlaying]);

  return {
    // State
    img,
    imgSrc,
    imgUrl,
    setImgUrl,
    settings,
    rendered,
    rawText,
    colorMatrix: colorMatrixRef.current,
    isGif,
    gifData: isGif && img ? getGifData(img) : null,

    // Actions
    updateSetting,
    loadImageFromFiles,
    loadImageFromURL,
    convert,
    reset,
  };
}
