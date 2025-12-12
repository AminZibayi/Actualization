'use client';

import React, { forwardRef } from 'react';
import { CanvasData } from '@/types';
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
} from 'lucide-react';

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

        {/* The Canvas Container */}
        <div
          ref={ref}
          dir={isRTL ? 'rtl' : 'ltr'}
          className='bg-white shadow-2xl relative transition-all duration-300 w-[1400px] min-w-[1400px] aspect-[16/9] flex flex-row'
          style={{ fontFamily: isRTL ? '"Vazirmatn", sans-serif' : '"Inter", sans-serif' }}
          data-testid='canvas-preview'
        >
          {/* MAIN GRID AREA */}
          <div className='flex-1 flex flex-col relative z-10'>
            {/* Minimal Header inside Grid */}
            <div className='flex justify-between items-center px-8 py-4 border-b-2 border-gray-800 bg-gray-50/50'>
              <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <h1
                  className='text-3xl font-extrabold text-gray-900 tracking-tight uppercase'
                  data-testid='canvas-title'
                >
                  {data.meta.title}
                </h1>
                <p className='text-gray-500 text-sm font-medium' data-testid='canvas-caption'>
                  {data.meta.caption}
                </p>
              </div>
              {data.meta.logoUrl && (
                <img
                  src={data.meta.logoUrl}
                  alt='Logo'
                  className='h-10 object-contain mix-blend-multiply'
                  data-testid='canvas-logo'
                />
              )}
            </div>

            {/* Canvas Grid */}
            <div className='flex-1 grid grid-cols-5 grid-rows-[3fr_1fr] gap-0 border-b-2 border-gray-800 bg-white'>
              {/* Top Section (Strategy) */}
              <div className='col-span-5 grid grid-cols-5 grid-rows-3'>
                {/* Column 1 (Problem & Suppliers) */}
                <div className='col-span-1 row-span-3 grid grid-rows-3 border-r-2 border-gray-300'>
                  <div className='row-span-2 border-b-2 border-gray-200'>
                    <CanvasBlock
                      isRTL={isRTL}
                      data={data.blocks.problem}
                      className='h-full'
                      icon={AlertTriangle}
                    />
                  </div>
                  <div className='row-span-1'>
                    <CanvasBlock isRTL={isRTL} data={data.blocks.suppliers} icon={Truck} />
                  </div>
                </div>

                {/* Column 2 (Solution, Metrics, Functions) */}
                <div className='col-span-1 row-span-3 grid grid-rows-3 border-r-2 border-gray-300'>
                  <div className='row-span-1 border-b-2 border-gray-200'>
                    <CanvasBlock isRTL={isRTL} data={data.blocks.solution} icon={Lightbulb} />
                  </div>
                  <div className='row-span-1 border-b-2 border-gray-200'>
                    <CanvasBlock isRTL={isRTL} data={data.blocks.keyMetrics} icon={BarChart} />
                  </div>
                  <div className='row-span-1'>
                    <CanvasBlock
                      isRTL={isRTL}
                      data={data.blocks.primaryFunctions}
                      icon={Activity}
                    />
                  </div>
                </div>

                {/* Column 3 (Center - Value Prop) */}
                <div className='col-span-1 row-span-3 border-r-2 border-gray-300'>
                  <CanvasBlock
                    isRTL={isRTL}
                    data={data.blocks.valuePropositions}
                    className='h-full'
                    icon={Gift}
                  />
                </div>

                {/* Column 4 (Unfair Adv, Channels, Assets) */}
                <div className='col-span-1 row-span-3 grid grid-rows-3 border-r-2 border-gray-300'>
                  <div className='row-span-1 border-b-2 border-gray-200'>
                    <CanvasBlock isRTL={isRTL} data={data.blocks.unfairAdvantage} icon={Shield} />
                  </div>
                  <div className='row-span-1 border-b-2 border-gray-200'>
                    <CanvasBlock isRTL={isRTL} data={data.blocks.channels} icon={Share2} />
                  </div>
                  <div className='row-span-1'>
                    <CanvasBlock isRTL={isRTL} data={data.blocks.essentialAssets} icon={Box} />
                  </div>
                </div>

                {/* Column 5 (Segments & Relationships) */}
                <div className='col-span-1 row-span-3 grid grid-rows-3'>
                  <div className='row-span-2 border-b-2 border-gray-200'>
                    <CanvasBlock
                      isRTL={isRTL}
                      data={data.blocks.customerSegments}
                      className='h-full'
                      icon={Users}
                    />
                  </div>
                  <div className='row-span-1'>
                    <CanvasBlock
                      isRTL={isRTL}
                      data={data.blocks.customerRelationships}
                      icon={Heart}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Section (Finance) */}
              <div className='col-span-5 grid grid-cols-2 border-t-2 border-gray-800'>
                <div className='border-r-2 border-gray-300'>
                  <CanvasBlock isRTL={isRTL} data={data.blocks.costStructure} icon={CreditCard} />
                </div>
                <div>
                  <CanvasBlock isRTL={isRTL} data={data.blocks.revenueStreams} icon={Banknote} />
                </div>
              </div>
            </div>

            {/* Footer Branding Inside Grid Area */}
            <div className='p-2 flex justify-between text-[10px] text-gray-400 bg-white'>
              <span>Designed with EBMC-13 Generator</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>

            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-0 mix-blend-multiply" />
          </div>
        </div>
      </div>
    );
  }
);

CanvasPreview.displayName = 'CanvasPreview';
