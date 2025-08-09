import { FlipHorizontal2, FlipVertical2 } from 'lucide-react';
import { Slider } from '@/app/components/ui/slider';
import type { ConversionSettings } from '@/app/hooks/useImageConverter';

interface ControlPanelProps {
  settings: ConversionSettings;
  onSettingChange: <K extends keyof ConversionSettings>(
    key: K,
    value: ConversionSettings[K]
  ) => void;
}

export function ControlPanel({ settings, onSettingChange }: ControlPanelProps) {
  return (
    <div className="space-y-12">
      {/* Mode Selection */}
      <div>
        <h3 className="text-sm font-medium text-slate-700 dark:text-zinc-300 mb-6">
          Conversion Mode
        </h3>
        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-zinc-800 rounded-lg">
          <button
            onClick={() => onSettingChange('mode', 'ascii')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
              settings.mode === 'ascii'
                ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-zinc-100 shadow-sm'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
            }`}
          >
            ASCII
          </button>
          <button
            onClick={() => onSettingChange('mode', 'braille')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
              settings.mode === 'braille'
                ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-zinc-100 shadow-sm'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
            }`}
          >
            Braille
          </button>
        </div>
      </div>

      {/* Dimensions */}
      <div>
        <h3 className="text-sm font-medium text-slate-700 dark:text-zinc-300 mb-6">
          Output Dimensions
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-500 dark:text-zinc-400 mb-2">
              Width (characters)
            </label>
            <input
              type="number"
              min={0}
              max={350}
              value={settings.widthChars}
              onChange={(e) =>
                onSettingChange('widthChars', parseInt(e.target.value || '0'))
              }
              className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-zinc-100 focus:border-transparent"
            />
            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
              0 for auto-fit
            </p>
          </div>
          <div>
            <label className="block text-xs text-slate-500 dark:text-zinc-400 mb-2">
              Height (characters)
            </label>
            <input
              type="number"
              min={0}
              max={350}
              value={settings.heightChars}
              onChange={(e) =>
                onSettingChange('heightChars', parseInt(e.target.value || '0'))
              }
              className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-zinc-100 focus:border-transparent"
            />
            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
              0 for auto
            </p>
          </div>
        </div>
      </div>

      {/* Character Map (ASCII only) */}
      {settings.mode === 'ascii' && (
        <div>
          <h3 className="text-sm font-medium text-slate-700 dark:text-zinc-300 mb-6">
            Character Mapping
          </h3>
          <div className="space-y-4">
            <div className="flex gap-1 p-1 bg-slate-100 dark:bg-zinc-800 rounded-lg">
              {(['simple', 'detailed', 'custom'] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => onSettingChange('mapKind', k)}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 capitalize ${
                    settings.mapKind === k
                      ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-zinc-100 shadow-sm'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
            {settings.mapKind === 'custom' && (
              <div>
                <label className="block text-xs text-slate-500 dark:text-zinc-400 mb-2">
                  Custom character sequence (dark → light)
                </label>
                <input
                  value={settings.customMap}
                  onChange={(e) => onSettingChange('customMap', e.target.value)}
                  placeholder=" .-=+#@"
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-zinc-100 focus:border-transparent font-mono"
                />
                <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
                  Minimum 2 characters required
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Color & Effects */}
      <div>
        <h3 className="text-sm font-medium text-slate-700 dark:text-zinc-300 mb-6">
          Appearance
        </h3>
        <div className="space-y-6">
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-zinc-800 rounded-lg">
            {(['none', 'grayscale', 'color'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => onSettingChange('coloredMode', opt)}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 capitalize ${
                  settings.coloredMode === opt
                    ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-zinc-100 shadow-sm'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.colorBg}
                onChange={(e) => onSettingChange('colorBg', e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 dark:border-zinc-600 focus:ring-2 focus:ring-slate-900 dark:focus:ring-zinc-100"
              />
              <span className="text-sm text-slate-700 dark:text-zinc-300">
                Color background
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.negative}
                onChange={(e) => onSettingChange('negative', e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 dark:border-zinc-600 focus:ring-2 focus:ring-slate-900 dark:focus:ring-zinc-100"
              />
              <span className="text-sm text-slate-700 dark:text-zinc-300">
                Negative
              </span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.flipX}
                onChange={(e) => onSettingChange('flipX', e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 dark:border-zinc-600 focus:ring-2 focus:ring-slate-900 dark:focus:ring-zinc-100"
              />
              <FlipHorizontal2 className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
              <span className="text-sm text-slate-700 dark:text-zinc-300">
                Flip horizontal
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.flipY}
                onChange={(e) => onSettingChange('flipY', e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 dark:border-zinc-600 focus:ring-2 focus:ring-slate-900 dark:focus:ring-zinc-100"
              />
              <FlipVertical2 className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
              <span className="text-sm text-slate-700 dark:text-zinc-300">
                Flip vertical
              </span>
            </label>
          </div>

          {settings.mode === 'braille' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 dark:text-zinc-400 mb-3">
                  Threshold: {settings.threshold}
                </label>
                <Slider
                  value={[settings.threshold]}
                  onValueChange={(values) =>
                    onSettingChange('threshold', values[0])
                  }
                  min={0}
                  max={255}
                  step={1}
                  className="w-full"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.dither}
                  onChange={(e) => onSettingChange('dither', e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 dark:border-zinc-600 focus:ring-2 focus:ring-slate-900 dark:focus:ring-zinc-100"
                />
                <span className="text-sm text-slate-700 dark:text-zinc-300">
                  Floyd–Steinberg dithering
                </span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Export Settings */}
      <div>
        <h3 className="text-sm font-medium text-slate-700 dark:text-zinc-300 mb-6">
          Export Settings
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-500 dark:text-zinc-400 mb-2">
              PNG background
            </label>
            <input
              type="text"
              value={settings.bgColor}
              onChange={(e) => onSettingChange('bgColor', e.target.value)}
              placeholder="#000000"
              className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-zinc-100 focus:border-transparent font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 dark:text-zinc-400 mb-2">
              Font family
            </label>
            <input
              type="text"
              value={settings.fontFamily}
              onChange={(e) => onSettingChange('fontFamily', e.target.value)}
              placeholder="monospace"
              className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-zinc-100 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
