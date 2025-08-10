"use client";
import { useCallback, useEffect, useState } from 'react';
import { Type, Maximize2, X } from 'lucide-react';
import Image from 'next/image';

interface PreviewProps {
  img: HTMLImageElement | null;
  imgSrc: string;
  rendered: React.ReactNode | null;
}

export function Preview({ img, imgSrc, rendered }: PreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fsFontScale, setFsFontScale] = useState(1);

  const increaseZoom = useCallback(
    () => setFsFontScale((v) => Math.min(4, +(v + 0.1).toFixed(2))),
    []
  );
  const decreaseZoom = useCallback(
    () => setFsFontScale((v) => Math.max(0.5, +(v - 0.1).toFixed(2))),
    []
  );
  const resetZoom = useCallback(() => setFsFontScale(1), []);

  const closeFullscreen = useCallback(() => setIsFullscreen(false), []);
  const onBackdropClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (e) => {
      // Only close if the click is directly on the backdrop
      if (e.currentTarget === e.target) closeFullscreen();
    },
    [closeFullscreen]
  );


  // Close on ESC
  useEffect(() => {
    if (!isFullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
      if (e.key === '+' || e.key === '=') increaseZoom();
      if (e.key === '-' || e.key === '_') decreaseZoom();
      if (e.key.toLowerCase() === '0') resetZoom();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isFullscreen, increaseZoom, decreaseZoom, resetZoom]);

  // Lock body scroll while fullscreen is open
  useEffect(() => {
    if (!isFullscreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isFullscreen]);

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
            {/* Fullscreen trigger */}
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              title="View fullscreen"
              className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Fullscreen
            </button>

            <div className="overflow-auto max-h-[75vh] p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-white rounded-lg border border-slate-700 dark:border-zinc-700 flex justify-center">
              <div className="inline-block font-mono text-xs leading-none whitespace-pre">
                {rendered}
              </div>
            </div>

            {/* Fullscreen overlay */}
            {isFullscreen && (
              <div
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
                onClick={onBackdropClick}
                onDoubleClick={onBackdropClick}
                role="dialog"
                aria-modal="true"
              >
                <div
                  className="absolute inset-0 flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                  onDoubleClick={(e) => e.stopPropagation()}
                >
                  {/* Header with controls */}
                  <div className="sticky top-0 z-10 flex items-center justify-between gap-2 p-3 bg-gradient-to-b from-black/40 to-transparent">
                    <div className="flex items-center gap-3 text-white/80 text-xs">
                      <label className="px-2 py-1 rounded border border-white/10 bg-white/5">Zoom</label>
                      <select
                        aria-label="Zoom percentage"
                        value={fsFontScale}
                        onChange={(e) => setFsFontScale(parseFloat(e.target.value))}
                        className="h-8 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/20 px-2 outline-none"
                      >
                        <option className="bg-zinc-900 text-white" value={0.5}>50%</option>
                        <option className="bg-zinc-900 text-white" value={0.75}>75%</option>
                        <option className="bg-zinc-900 text-white" value={1}>100%</option>
                        <option className="bg-zinc-900 text-white" value={1.25}>125%</option>
                        <option className="bg-zinc-900 text-white" value={1.5}>150%</option>
                        <option className="bg-zinc-900 text-white" value={2}>200%</option>
                        <option className="bg-zinc-900 text-white" value={3}>300%</option>
                        <option className="bg-zinc-900 text-white" value={4}>400%</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={closeFullscreen}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                      aria-label="Close fullscreen"
                    >
                      <X className="w-4 h-4" />
                      Close
                    </button>
                  </div>

                  {/* Centered content area */}
                  <div className="flex-1 overflow-auto p-4 md:p-6">
                    <div className="min-h-full grid place-items-center">
                      <div className="max-w-[95vw] max-h-[85vh] overflow-auto p-4 md:p-6 rounded-lg border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
                        <div className="inline-block" style={{ transform: `scale(${fsFontScale})`, transformOrigin: 'center center' }}>
                          <div className="font-mono whitespace-pre leading-none">
                            {rendered}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
