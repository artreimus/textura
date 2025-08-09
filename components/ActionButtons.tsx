import { Download, Copy, Wand2, RefreshCw } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { savePngFromText } from '@/lib/png-export';
import type { ConversionSettings } from '@/hooks/useImageConverter';

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
  onReset 
}: ActionButtonsProps) {
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawText);
    } catch {
      // Silently fail
    }
  };

  const onDownloadTxt = () => {
    const blob = new Blob([rawText], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (settings.mode === 'braille' ? 'braille' : 'ascii') + '-art.txt';
    a.click();
  };

  const onDownloadPng = () => {
    const lines = rawText.split('\n');
    savePngFromText(lines, colorMatrix, {
      filename: (settings.mode === 'braille' ? 'braille' : 'ascii') + '-art.png',
      bg: settings.bgColor,
      fontFamily: settings.fontFamily,
      braille: settings.mode === 'braille'
    });
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <Button onClick={onConvert}>
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
      <Button onClick={onReset} variant="outline">
        <RefreshCw className="w-4 h-4" /> Reset
      </Button>
    </div>
  );
}