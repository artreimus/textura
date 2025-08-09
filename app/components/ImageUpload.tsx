import { Upload } from 'lucide-react';

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
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-slate-700 dark:text-zinc-300 mb-4">
          Source Image
        </h3>
        <label className="group relative flex flex-col items-center justify-center w-full h-32 border border-slate-200 dark:border-zinc-700 rounded-lg cursor-pointer transition-all duration-200 hover:border-slate-300 dark:hover:border-zinc-600 hover:bg-slate-50/50 dark:hover:bg-zinc-800/50">
          <Upload className="w-6 h-6 text-slate-400 group-hover:text-slate-500 dark:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors" />
          <span className="text-sm text-slate-600 dark:text-zinc-400 mt-2 group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors">
            Drop image or click to upload
          </span>
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => onFilesChange(e.target.files)}
          />
        </label>
      </div>

      <div className="relative">
        <div className="absolute -top-2 left-3 bg-white dark:bg-zinc-950 px-2 text-xs text-slate-500 dark:text-zinc-400">
          or load from URL
        </div>
        <div className="flex gap-3 p-4 border border-slate-200 dark:border-zinc-700 rounded-lg">
          <input
            value={imgUrl}
            onChange={(e) => onImgUrlChange(e.target.value)}
            placeholder="https://example.com/image.png"
            className="flex-1 bg-transparent text-sm placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none"
          />
          <button
            onClick={onLoadUrl}
            className="px-4 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-md transition-colors"
          >
            Load
          </button>
        </div>
      </div>

      {img && (
        <div className="text-xs text-slate-500 dark:text-zinc-500 bg-slate-50 dark:bg-zinc-900/50 px-3 py-2 rounded-md">
          {img.width} × {img.height} pixels
        </div>
      )}
    </div>
  );
}