'use client';

import React, { forwardRef } from 'react';
import { CanvasData } from '@/types';
import { CanvasBlock } from './CanvasBlock';

interface CanvasPreviewProps {
  data: CanvasData;
  isRTL: boolean;
}

export const CanvasPreview = forwardRef<HTMLDivElement, CanvasPreviewProps>(
  ({ data, isRTL }, ref) => {
    return (
      <div className='flex-1 bg-gray-200 overflow-auto flex items-start justify-center p-8 relative'>
        <div className='absolute top-4 right-8 text-gray-500 text-xs hidden lg:block'>
          Preview Area (Scroll to zoom/view)
        </div>

        {/* The Canvas */}
        <div
          ref={ref}
          className={`bg-white shadow-2xl p-8 relative transition-all duration-300 w-[1400px] min-w-[1400px] aspect-[16/9] flex flex-col ${
            isRTL ? 'rtl-grid' : ''
          }`}
          style={{ fontFamily: isRTL ? '"Vazirmatn", sans-serif' : '"Inter", sans-serif' }}
          data-testid='canvas-preview'
        >
          {/* Canvas Header */}
          <div className='flex justify-between items-end mb-6 border-b-2 border-gray-800 pb-4'>
            <div className={`${isRTL ? 'order-2 text-right' : 'order-1 text-left'}`}>
              <h1
                className='text-4xl font-extrabold text-gray-900 tracking-tight mb-1 uppercase'
                data-testid='canvas-title'
              >
                {data.meta.title}
              </h1>
              <p className='text-gray-500 font-medium' data-testid='canvas-caption'>
                {data.meta.caption}
              </p>
            </div>
            <div className={`flex flex-col items-center ${isRTL ? 'order-1' : 'order-2'}`}>
              {data.meta.logoUrl ? (
                <img
                  src={data.meta.logoUrl}
                  alt='Logo'
                  className='h-12 object-contain'
                  data-testid='canvas-logo'
                />
              ) : (
                <div className='flex items-center gap-2 opacity-50'>
                  <div className='h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-800 font-bold text-xl'>
                    {data.meta.title.charAt(0)}
                  </div>
                </div>
              )}
              <div className='text-[10px] text-gray-400 mt-1'>EBMC-13 FRAMEWORK</div>
            </div>
          </div>

          {/* Canvas Grid */}
          <div className='flex-1 grid grid-cols-5 grid-rows-[3fr_1fr] gap-0 border-2 border-gray-800'>
            {/* Top Section (Strategy) */}
            <div className='col-span-5 grid grid-cols-5 grid-rows-3'>
              {/* Column 1 */}
              <div className='col-span-1 row-span-3 grid grid-rows-3 border-r-2 border-gray-300'>
                <div className='row-span-1 border-b-2 border-gray-200'>
                  <CanvasBlock isRTL={isRTL} data={data.blocks.suppliers} />
                </div>
                <div className='row-span-1 border-b-2 border-gray-200'>
                  <CanvasBlock isRTL={isRTL} data={data.blocks.essentialAssets} />
                </div>
                <div className='row-span-1'>
                  <CanvasBlock isRTL={isRTL} data={data.blocks.primaryFunctions} />
                </div>
              </div>

              {/* Column 2 */}
              <div className='col-span-1 row-span-3 grid grid-rows-3 border-r-2 border-gray-300'>
                <div className='row-span-1 border-b-2 border-gray-200'>
                  <CanvasBlock isRTL={isRTL} data={data.blocks.problem} />
                </div>
                <div className='row-span-1 border-b-2 border-gray-200'>
                  <CanvasBlock isRTL={isRTL} data={data.blocks.solution} />
                </div>
                <div className='row-span-1'>
                  <CanvasBlock isRTL={isRTL} data={data.blocks.keyMetrics} />
                </div>
              </div>

              {/* Column 3 (Center - Value Prop) */}
              <div className='col-span-1 row-span-3 border-r-2 border-gray-300'>
                <CanvasBlock
                  isRTL={isRTL}
                  data={data.blocks.valuePropositions}
                  className='h-full'
                />
              </div>

              {/* Column 4 */}
              <div className='col-span-1 row-span-3 grid grid-rows-3 border-r-2 border-gray-300'>
                <div className='row-span-1 border-b-2 border-gray-200'>
                  <CanvasBlock isRTL={isRTL} data={data.blocks.customerRelationships} />
                </div>
                <div className='row-span-1 border-b-2 border-gray-200'>
                  <CanvasBlock isRTL={isRTL} data={data.blocks.channels} />
                </div>
                <div className='row-span-1'>
                  <CanvasBlock isRTL={isRTL} data={data.blocks.unfairAdvantage} />
                </div>
              </div>

              {/* Column 5 */}
              <div className='col-span-1 row-span-3'>
                <CanvasBlock isRTL={isRTL} data={data.blocks.customerSegments} className='h-full' />
              </div>
            </div>

            {/* Bottom Section (Finance) */}
            <div className='col-span-5 grid grid-cols-2 border-t-2 border-gray-800'>
              <div className='border-r-2 border-gray-300'>
                <CanvasBlock isRTL={isRTL} data={data.blocks.costStructure} />
              </div>
              <div>
                <CanvasBlock isRTL={isRTL} data={data.blocks.revenueStreams} />
              </div>
            </div>
          </div>

          {/* Footer Branding */}
          <div className='mt-4 flex justify-between text-xs text-gray-400'>
            <span>Designed with EBMC-13 Generator</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>

          {/* Watermark overlay effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-0" />
        </div>
      </div>
    );
  }
);

CanvasPreview.displayName = 'CanvasPreview';
