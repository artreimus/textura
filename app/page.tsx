'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import { useImageConverter } from '@/hooks/useImageConverter';
import { ImageUpload } from '@/components/ImageUpload';
import { ControlPanel } from '@/components/ControlPanel';
import { Preview } from '@/components/Preview';
import { ActionButtons } from '@/components/ActionButtons';

export default function AsciiImageConverter() {
  const {
    img,
    imgSrc,
    imgUrl,
    setImgUrl,
    settings,
    rendered,
    rawText,
    colorMatrix,
    updateSetting,
    loadImageFromFiles,
    loadImageFromURL,
    convert,
    reset,
  } = useImageConverter();

  // Auto-convert when dependencies change
  useEffect(() => {
    convert();
  }, [convert]);

  return (
    <div className="w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-950 dark:to-zinc-900 text-slate-900 dark:text-zinc-100">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-bold tracking-tight mb-6 flex items-center gap-3"
        >
          <ImageIcon className="w-7 h-7" /> Image → ASCII/Braille Converter
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: inputs */}
          <div className="lg:col-span-1 space-y-6">
            <ImageUpload
              imgUrl={imgUrl}
              onImgUrlChange={setImgUrl}
              onFilesChange={loadImageFromFiles}
              onLoadUrl={loadImageFromURL}
              img={img}
            />

            <ControlPanel settings={settings} onSettingChange={updateSetting} />

            <ActionButtons
              onConvert={convert}
              rawText={rawText}
              colorMatrix={colorMatrix}
              settings={settings}
              onReset={reset}
            />
          </div>

          {/* Right column: preview */}
          <div className="lg:col-span-2">
            <Preview img={img} imgSrc={imgSrc} rendered={rendered} />
          </div>
        </div>
      </div>
    </div>
  );
}
