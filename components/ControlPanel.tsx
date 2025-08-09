import { FlipHorizontal2, FlipVertical2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Slider } from '@/app/components/ui/slider';
import type { ConversionSettings } from '@/hooks/useImageConverter';

interface ControlPanelProps {
  settings: ConversionSettings;
  onSettingChange: <K extends keyof ConversionSettings>(key: K, value: ConversionSettings[K]) => void;
}

export function ControlPanel({ settings, onSettingChange }: ControlPanelProps) {
  return (
    <div className="space-y-6">
      {/* Mode & Dimensions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
            <CardTitle>Mode & dimensions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Button
              onClick={() => onSettingChange('mode', 'ascii')}
              variant={settings.mode === 'ascii' ? 'default' : 'outline'}
            >
              ASCII
            </Button>
            <Button
              onClick={() => onSettingChange('mode', 'braille')}
              variant={settings.mode === 'braille' ? 'default' : 'outline'}
            >
              Braille
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm">Width (chars)</Label>
              <Input
                type="number"
                min={0}
                max={350}
                value={settings.widthChars}
                onChange={(e) =>
                  onSettingChange('widthChars', parseInt(e.target.value || '0'))
                }
              />
              <p className="text-xs mt-1 text-slate-500">0 = auto-fit</p>
            </div>
            <div>
              <Label className="text-sm">Height (chars)</Label>
              <Input
                type="number"
                min={0}
                max={350}
                value={settings.heightChars}
                onChange={(e) =>
                  onSettingChange('heightChars', parseInt(e.target.value || '0'))
                }
              />
              <p className="text-xs mt-1 text-slate-500">0 = auto</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Character Map (ASCII only) */}
      {settings.mode === 'ascii' && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
              <CardTitle>Character map</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {(['simple', 'detailed', 'custom'] as const).map((k) => (
                <Button
                  key={k}
                  onClick={() => onSettingChange('mapKind', k)}
                  variant={settings.mapKind === k ? 'default' : 'outline'}
                >
                  {k}
                </Button>
              ))}
            </div>
            <div>
              <Label className="text-sm">Custom map (dark → light)</Label>
              <Input
                disabled={settings.mapKind !== 'custom'}
                value={settings.customMap}
                onChange={(e) => onSettingChange('customMap', e.target.value)}
              />
              <p className="text-xs mt-1 text-slate-500">
                At least 2 characters. Example: &quot; .-=+#@&quot;
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Colors & Effects */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
            <CardTitle>Colors & effects</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="grid grid-cols-3 gap-2">
              {(['none', 'grayscale', 'color'] as const).map((opt) => (
                <Button
                  key={opt}
                  onClick={() => onSettingChange('coloredMode', opt)}
                  variant={settings.coloredMode === opt ? 'default' : 'outline'}
                >
                  {opt}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="color-bg"
                  checked={settings.colorBg}
                  onCheckedChange={(checked) => onSettingChange('colorBg', !!checked)}
                />
                <Label htmlFor="color-bg">Use color as background</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="negative"
                  checked={settings.negative}
                  onCheckedChange={(checked) => onSettingChange('negative', !!checked)}
                />
                <Label htmlFor="negative">Negative</Label>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flip-x"
                  checked={settings.flipX}
                  onCheckedChange={(checked) => onSettingChange('flipX', !!checked)}
                />
                <Label
                  htmlFor="flip-x"
                  className="flex items-center gap-2"
                >
                  <FlipHorizontal2 className="w-4 h-4" /> Flip X
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flip-y"
                  checked={settings.flipY}
                  onCheckedChange={(checked) => onSettingChange('flipY', !!checked)}
                />
                <Label
                  htmlFor="flip-y"
                  className="flex items-center gap-2"
                >
                  <FlipVertical2 className="w-4 h-4" /> Flip Y
                </Label>
              </div>
            </div>
            {settings.mode === 'braille' && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm">
                    Braille threshold: {settings.threshold}
                  </Label>
                  <Slider
                    value={[settings.threshold]}
                    onValueChange={(values) => onSettingChange('threshold', values[0])}
                    min={0}
                    max={255}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dither"
                    checked={settings.dither}
                    onCheckedChange={(checked) => onSettingChange('dither', !!checked)}
                  />
                  <Label htmlFor="dither">
                    Apply Floyd–Steinberg dithering
                  </Label>
                </div>
              </>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm">PNG background</Label>
                <Input
                  type="text"
                  value={settings.bgColor}
                  onChange={(e) => onSettingChange('bgColor', e.target.value)}
                />
                <p className="text-xs mt-1 text-slate-500">
                  Any CSS color (e.g., #000, rgba(0,0,0,1))
                </p>
              </div>
              <div>
                <Label className="text-sm">PNG font family</Label>
                <Input
                  type="text"
                  value={settings.fontFamily}
                  onChange={(e) => onSettingChange('fontFamily', e.target.value)}
                />
                <p className="text-xs mt-1 text-slate-500">
                  Monospace recommended
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}