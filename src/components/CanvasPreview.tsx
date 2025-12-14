'use client';

import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CanvasData } from '@/types';
import { useGoogleFonts } from '@/hooks/useGoogleFonts';
import { DEFAULT_FONTS } from '@/constants/fonts';
import { CanvasBlock } from './CanvasBlock';
import {
  Truck,
  AlertTriangle,
  Activity,
  Lightbulb,
  Box,
  BarChart,
  Gift,
  Shield,
  Share2,
  Heart,
  Users,
  CreditCard,
  Banknote,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface CanvasPreviewProps {
  data: CanvasData;
  isRTL: boolean;
}

const CANVAS_CONFIG = {
  A4: { width: 1400, scale: 1 },
  A3: { width: 1980, scale: 1.414 },
  A2: { width: 2800, scale: 2 },
  A1: { width: 3960, scale: 2.828 },
} as const;

export const CanvasPreview = forwardRef<HTMLDivElement, CanvasPreviewProps>(
  ({ data, isRTL }, ref) => {
    const { t } = useTranslation();
    const sizeKey = data.meta.canvasSize || 'A4';
    const { width, scale } = CANVAS_CONFIG[sizeKey] || CANVAS_CONFIG.A4;

    // Load Google Fonts
    useGoogleFonts(data);

    const fonts = data.meta.fonts || DEFAULT_FONTS;

    // Adaptive columns logic
    const baseColumns = data.meta.noteColumns || 2;
    const bottomColumns = Math.ceil(baseColumns * 1.5);

    return (
      <div className='flex-1 bg-gray-200 overflow-hidden relative flex flex-col h-full'>
        <TransformWrapper
          initialScale={0.6}
          minScale={0.1}
          maxScale={4}
          centerOnInit
          limitToBounds={false}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Controls */}
              <div className='absolute bottom-8 right-8 z-50 flex gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-gray-200/50'>
                <button
                  onClick={() => zoomIn(0.2)}
                  className='p-2.5 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors'
                  title={t('canvas.zoomIn')}
                  data-testid='zoom-in'
                >
                  <ZoomIn size={20} />
                </button>
                <button
                  onClick={() => zoomOut(0.2)}
                  className='p-2.5 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors'
                  title={t('canvas.zoomOut')}
                  data-testid='zoom-out'
                >
                  <ZoomOut size={20} />
                </button>
                <button
                  onClick={() => resetTransform()}
                  className='p-2.5 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors'
                  title={t('canvas.reset')}
                  data-testid='zoom-reset'
                >
                  <RotateCcw size={20} />
                </button>
              </div>

              <div className='absolute top-4 right-8 text-gray-500 text-xs hidden lg:block z-50 pointer-events-none select-none bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm'>
                {t('canvas.zoomHint')}
              </div>

              <TransformComponent
                wrapperClass='!w-full !h-full'
                contentClass='!w-full !h-full flex items-center justify-center p-8'
              >
                {/* The Canvas Container */}
                <div
                  ref={ref}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  className='bg-white shadow-2xl relative transition-all duration-300 flex flex-row'
                  style={{
                    width: `${width}px`,
                    minWidth: `${width}px`,
                    aspectRatio: '1.414', // Standard A-series Landscape ratio
                    fontFamily: isRTL ? '"Vazirmatn", sans-serif' : '"Inter", sans-serif',
                  }}
                  data-testid='canvas-preview'
                >
                  {/* MAIN GRID AREA */}
                  <div className='flex-1 flex flex-col relative z-10'>
                    {/* Minimal Header inside Grid */}
                    <div className='flex justify-between items-center px-8 py-4 border-b-2 border-gray-800 bg-gray-50/50'>
                      <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                        <h1
                          className='font-extrabold text-gray-900 tracking-tight uppercase'
                          style={{
                            fontSize: `${30 * scale}px`,
                            fontFamily: isRTL
                              ? '"Vazirmatn", sans-serif'
                              : `"${fonts.canvasTitle}", sans-serif`,
                          }}
                          data-testid='canvas-title'
                        >
                          {data.meta.title}
                        </h1>
                        <p
                          className='text-gray-500 font-medium'
                          style={{
                            fontSize: `${14 * scale}px`,
                            fontFamily: isRTL
                              ? '"Vazirmatn", sans-serif'
                              : `"${fonts.canvasCaption}", sans-serif`,
                          }}
                          data-testid='canvas-caption'
                        >
                          {data.meta.caption}
                        </p>
                      </div>
                      {data.meta.logoUrl && (
                        <img
                          src={data.meta.logoUrl}
                          alt='Logo'
                          crossOrigin='anonymous'
                          className='object-contain mix-blend-multiply'
                          style={{ height: `${40 * scale}px` }}
                          data-testid='canvas-logo'
                        />
                      )}
                    </div>

                    {/* Canvas Grid */}
                    <div className='flex-1 flex flex-col bg-white border-b-2 border-gray-800'>
                      {/* Top Section (Strategy) - 5 Columns */}
                      <div className='flex-[3] grid grid-cols-5 border-b-2 border-gray-800'>
                        {/* Column 1 - Tall Top */}
                        <div className='col-span-1 flex flex-col border-r-2 border-gray-300'>
                          <div className='flex-[2] border-b-2 border-gray-200'>
                            <CanvasBlock
                              isRTL={isRTL}
                              data={data.blocks.problem}
                              className='h-full'
                              icon={AlertTriangle}
                              scale={scale}
                              columns={baseColumns}
                              fonts={fonts}
                            />
                          </div>
                          <div className='flex-1'>
                            <CanvasBlock
                              isRTL={isRTL}
                              data={data.blocks.essentialAssets}
                              className='h-full'
                              icon={Truck}
                              scale={scale}
                              columns={baseColumns}
                              fonts={fonts}
                            />
                          </div>
                        </div>

                        {/* Column 2 - Tall Bottom */}
                        <div className='col-span-1 flex flex-col border-r-2 border-gray-300'>
                          <div className='flex-1 border-b-2 border-gray-200'>
                            <CanvasBlock
                              isRTL={isRTL}
                              data={data.blocks.solution}
                              className='h-full'
                              icon={Lightbulb}
                              scale={scale}
                              columns={baseColumns}
                              fonts={fonts}
                            />
                          </div>
                          <div className='flex-[2]'>
                            <CanvasBlock
                              isRTL={isRTL}
                              data={data.blocks.primaryFunctions}
                              className='h-full'
                              icon={Activity}
                              scale={scale}
                              columns={baseColumns}
                              fonts={fonts}
                            />
                          </div>
                        </div>

                        {/* Column 3 (Center) - Tall Top */}
                        <div className='col-span-1 flex flex-col border-r-2 border-gray-300'>
                          <div className='flex-[2] border-b-2 border-gray-200'>
                            <CanvasBlock
                              isRTL={isRTL}
                              data={data.blocks.valuePropositions}
                              className='h-full'
                              icon={Gift}
                              scale={scale}
                              columns={baseColumns}
                              fonts={fonts}
                            />
                          </div>
                          <div className='flex-1'>
                            <CanvasBlock
                              isRTL={isRTL}
                              data={data.blocks.unfairAdvantage}
                              className='h-full'
                              icon={Shield}
                              scale={scale}
                              columns={baseColumns}
                              fonts={fonts}
                            />
                          </div>
                        </div>

                        {/* Column 4 - Tall Bottom */}
                        <div className='col-span-1 flex flex-col border-r-2 border-gray-300'>
                          <div className='flex-1 border-b-2 border-gray-200'>
                            <CanvasBlock
                              isRTL={isRTL}
                              data={data.blocks.channels}
                              className='h-full'
                              icon={Share2}
                              scale={scale}
                              columns={baseColumns}
                              fonts={fonts}
                            />
                          </div>
                          <div className='flex-[2]'>
                            <CanvasBlock
                              isRTL={isRTL}
                              data={data.blocks.suppliers}
                              className='h-full'
                              icon={Box}
                              scale={scale}
                              columns={baseColumns}
                              fonts={fonts}
                            />
                          </div>
                        </div>

                        {/* Column 5 - Tall Top */}
                        <div className='col-span-1 flex flex-col'>
                          <div className='flex-[2] border-b-2 border-gray-200'>
                            <CanvasBlock
                              isRTL={isRTL}
                              data={data.blocks.customerSegments}
                              className='h-full'
                              icon={Users}
                              scale={scale}
                              columns={baseColumns}
                              fonts={fonts}
                            />
                          </div>
                          <div className='flex-1'>
                            <CanvasBlock
                              isRTL={isRTL}
                              data={data.blocks.customerRelationships}
                              className='h-full'
                              icon={Heart}
                              scale={scale}
                              columns={baseColumns}
                              fonts={fonts}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Section (Finance) - 3 Columns */}
                      <div className='flex-1 grid grid-cols-3'>
                        <div className='border-r-2 border-gray-300'>
                          <CanvasBlock
                            isRTL={isRTL}
                            data={data.blocks.costStructure}
                            className='h-full'
                            icon={CreditCard}
                            scale={scale}
                            columns={bottomColumns}
                            fonts={fonts}
                          />
                        </div>
                        <div className='border-r-2 border-gray-300'>
                          <CanvasBlock
                            isRTL={isRTL}
                            data={data.blocks.keyMetrics}
                            className='h-full'
                            icon={BarChart}
                            scale={scale}
                            columns={bottomColumns}
                            fonts={fonts}
                          />
                        </div>
                        <div>
                          <CanvasBlock
                            isRTL={isRTL}
                            data={data.blocks.revenueStreams}
                            className='h-full'
                            icon={Banknote}
                            scale={scale}
                            columns={bottomColumns}
                            fonts={fonts}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Footer Branding Inside Grid Area */}
                    <div
                      className='p-2 flex justify-between text-gray-400 bg-white'
                      style={{ fontSize: `${10 * scale}px` }}
                    >
                      <span>{t('canvas.footer')}</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>

                    {/* Background Pattern */}
                    {data.meta.backgroundPattern && data.meta.backgroundPattern !== 'none' && (
                      <div
                        className='absolute inset-0 pointer-events-none z-0 mix-blend-multiply opacity-40'
                        style={{
                          backgroundImage: `url('/patterns/${data.meta.backgroundPattern}.png')`,
                          backgroundRepeat: 'repeat',
                        }}
                      />
                    )}
                  </div>
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    );
  }
);

CanvasPreview.displayName = 'CanvasPreview';
