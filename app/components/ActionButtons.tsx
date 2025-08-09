import { Download, Copy, Wand2, RefreshCw } from 'lucide-react';
import { savePngFromText } from '@/app/lib/png-export';
import type { ConversionSettings } from '@/app/hooks/useImageConverter';
import { toast } from 'sonner';

interface ActionButtonsProps {
  onConvert: () => void;
  rawText: string;
  colorMatrix: (string | null)[][];
  settings: ConversionSettings;
  onReset: () => void;
}

export function ActionButtons({
  onConvert,
  rawText,
  colorMatrix,
  settings,
  onReset,
}: ActionButtonsProps) {
  const handleConvert = () => {
    onConvert();
    toast.success('Image converted successfully!');
  };

  const handleReset = () => {
    onReset();
    toast.info('All settings reset to defaults');
  };
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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-slate-700 dark:text-zinc-300 mb-6">
          Actions
        </h3>
        <div className="space-y-3">
          <button
            onClick={handleConvert}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-lg font-medium transition-colors"
          >
            <Wand2 className="w-4 h-4" />
            Convert Image
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onCopy}
              disabled={!rawText}
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

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onDownloadTxt}
              disabled={!rawText}
              className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="w-4 h-4" />
              Export TXT
            </button>
            <button
              onClick={onDownloadPng}
              disabled={!rawText}
              className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="w-4 h-4" />
              Export PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
