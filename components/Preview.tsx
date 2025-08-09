import { Type } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

interface PreviewProps {
  img: HTMLImageElement | null;
  imgSrc: string;
  rendered: React.ReactNode | null;
}

export function Preview({ img, imgSrc, rendered }: PreviewProps) {
  return (
    <div className="space-y-6">
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
                src={imgSrc}
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
  );
}