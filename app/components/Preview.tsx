import { Type } from 'lucide-react';
import Image from 'next/image';

interface PreviewProps {
  img: HTMLImageElement | null;
  imgSrc: string;
  rendered: React.ReactNode | null;
}

export function Preview({ img, imgSrc, rendered }: PreviewProps) {
  return (
    <div className="space-y-8">
      {/* Main Preview */}
      <div>
        <h3 className="text-sm font-medium text-slate-700 dark:text-zinc-300 mb-6">
          Preview
        </h3>
        {!img ? (
          <div className="h-80 flex items-center justify-center border border-slate-200 dark:border-zinc-700 rounded-lg bg-slate-50/50 dark:bg-zinc-900/50">
            <div className="text-center">
              <Type className="w-8 h-8 mx-auto mb-3 text-slate-300 dark:text-zinc-600" />
              <p className="text-sm text-slate-500 dark:text-zinc-400">
                Load an image to begin conversion
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-auto max-h-[75vh] p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-white rounded-lg border border-slate-700 dark:border-zinc-700">
              <div className="font-mono text-xs leading-none whitespace-pre">
                {rendered}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Original Image */}
      {img && (
        <div>
          <h3 className="text-sm font-medium text-slate-700 dark:text-zinc-300 mb-6">
            Original Image
          </h3>
          <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
            <Image
              src={imgSrc}
              alt="Original source image"
              width={800}
              height={400}
              className="max-h-96 w-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="p-6 bg-slate-50 dark:bg-zinc-900/50 rounded-lg border border-slate-200 dark:border-zinc-700">
        <h4 className="text-sm font-medium text-slate-700 dark:text-zinc-300 mb-4">
          Usage Tips
        </h4>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-zinc-400">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-zinc-500 rounded-full mt-2 flex-shrink-0"></span>
            For optimal results, adjust dimensions if preview appears heavy.
            Output is clamped to 350×350 characters.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-zinc-500 rounded-full mt-2 flex-shrink-0"></span>
            &quot;Color background&quot; mode applies color to character backgrounds
            rather than the text itself.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-zinc-500 rounded-full mt-2 flex-shrink-0"></span>
            Braille mode uses 2×4 dot cells. Enable dithering for better
            photographic contrast.
          </li>
        </ul>
      </div>
    </div>
  );
}
