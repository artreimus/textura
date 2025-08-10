import { Download, Copy, RefreshCw, Film } from 'lucide-react';
import { savePngFromText } from '@/app/lib/png-export';
import { saveGifFromFrames } from '@/app/lib/gif-export';
import type { ConversionSettings } from '@/app/hooks/useImageConverter';
import { toast } from 'sonner';

interface ActionButtonsProps {
  rawText: string;
  colorMatrix: (string | null)[][];
  settings: ConversionSettings;
  onReset: () => void;
  isGif?: boolean;
  gifData?: { frames: { canvas: HTMLCanvasElement; delay: number }[] } | null;
  onConvertAllFrames?: () => { text: string; colorMatrix: (string | null)[][]; delay: number }[];
}

export function ActionButtons({
  rawText,
  colorMatrix,
  settings,
  onReset,
  isGif,
  gifData,
  onConvertAllFrames,
}: ActionButtonsProps) {
  const handleReset = () => {
    onReset();
    toast.info('All settings reset to defaults');
  };

  const hasResult = Boolean(rawText && rawText.trim());
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawText);
      toast.success('Text copied to clipboard!');
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  const onDownloadTxt = () => {
    try {
      const blob = new Blob([rawText], { type: 'text/plain;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download =
        (settings.mode === 'braille' ? 'braille' : 'ascii') + '-art.txt';
      a.click();
      toast.success('TXT file downloaded successfully!');
    } catch {
      toast.error('Failed to download TXT file');
    }
  };

  const onDownloadPng = () => {
    try {
      const lines = rawText.split('\n');
      savePngFromText(lines, colorMatrix, {
        filename:
          (settings.mode === 'braille' ? 'braille' : 'ascii') + '-art.png',
        bg: settings.bgColor,
        fontFamily: settings.fontFamily,
        braille: settings.mode === 'braille',
      });
      toast.success('PNG file downloaded successfully!');
    } catch {
      toast.error('Failed to download PNG file');
    }
  };

  const onDownloadGif = async () => {
    if (!isGif || !gifData || !onConvertAllFrames) {
      toast.error('GIF export not available');
      return;
    }

    try {
      const frameCount = gifData.frames.length;
      toast.info(`Generating GIF with ${frameCount} frames... This may take a moment.`);
      
      const frames = onConvertAllFrames();
      
      if (frames.length === 0) {
        toast.error('No frames to export');
        return;
      }

      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
      await saveGifFromFrames(frames, {
        filename: `${settings.mode}-art-${timestamp}.gif`,
        bg: settings.bgColor,
        fontFamily: settings.fontFamily,
        braille: settings.mode === 'braille',
        quality: 10, // Optimized for file size
        delay: 100, // Will be overridden by actual frame delays
      });
      
      toast.success(`GIF exported successfully! (${frameCount} frames)`);
    } catch (error) {
      console.error('GIF export error:', error);
      toast.error('Failed to export GIF. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-slate-700 dark:text-zinc-300 mb-6">
          Actions
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onCopy}
              disabled={!hasResult}
              className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>

          <div className={`grid gap-3 ${isGif ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <button
              onClick={onDownloadTxt}
              disabled={!hasResult}
              className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="w-4 h-4" />
              Export TXT
            </button>
            {!isGif && (
              <button
                onClick={onDownloadPng}
                disabled={!hasResult}
                className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-4 h-4" />
                Export PNG
              </button>
            )}
          </div>
          
          {isGif && (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onDownloadPng}
                disabled={!hasResult}
                className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-4 h-4" />
                PNG (Frame)
              </button>
              <button
                onClick={onDownloadGif}
                disabled={!hasResult}
                className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-blue-700 dark:text-blue-300"
              >
                <Film className="w-4 h-4" />
                Export GIF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
