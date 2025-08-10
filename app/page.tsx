'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useImageConverter } from '@/app/hooks/useImageConverter';
import { ImageUpload } from '@/app/components/ImageUpload';
import { ControlPanel } from '@/app/components/ControlPanel';
import { Preview } from '@/app/components/Preview';
import { ActionButtons } from '@/app/components/ActionButtons';

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
    isGif,
    gifData,
    updateSetting,
    loadImageFromFiles,
    loadImageFromURL,
    convert,
    convertAllFrames,
    reset,
  } = useImageConverter();

  // Auto-convert when dependencies change
  useEffect(() => {
    convert();
  }, [convert]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-slate-900 dark:text-zinc-100 mb-3 sm:mb-4">
            ASCIIFY
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-2xl">
            Transform images into ASCII or Braille art with precision controls
            for character mapping, dimensions, and visual effects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Controls Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-2 lg:order-none lg:col-span-4 xl:col-span-3"
          >
            <div className="lg:sticky lg:top-8 space-y-10 sm:space-y-12">
              <ImageUpload
                imgUrl={imgUrl}
                onImgUrlChange={setImgUrl}
                onFilesChange={loadImageFromFiles}
                onLoadUrl={loadImageFromURL}
                img={img}
              />

              <ControlPanel
                settings={settings}
                onSettingChange={updateSetting}
                isGif={isGif}
                gifData={gifData}
              />

              <ActionButtons
                rawText={rawText}
                colorMatrix={colorMatrix}
                settings={settings}
                onReset={reset}
                isGif={isGif}
                gifData={gifData}
                onConvertAllFrames={convertAllFrames}
              />
            </div>
          </motion.div>

          {/* Preview Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-none lg:col-span-8 xl:col-span-9"
          >
            <Preview img={img} imgSrc={imgSrc} rendered={rendered} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
