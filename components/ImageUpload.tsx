import { Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';

interface ImageUploadProps {
  imgUrl: string;
  onImgUrlChange: (url: string) => void;
  onFilesChange: (files: FileList | null) => void;
  onLoadUrl: () => void;
  img: HTMLImageElement | null;
}

export function ImageUpload({ 
  imgUrl, 
  onImgUrlChange, 
  onFilesChange, 
  onLoadUrl,
  img 
}: ImageUploadProps) {
  return (
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
              onChange={(e) => onFilesChange(e.target.files)}
            />
          </label>
          <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
            <Input
              value={imgUrl}
              onChange={(e) => onImgUrlChange(e.target.value)}
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
  );
}