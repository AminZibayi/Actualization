'use client';

import React from 'react';
import { BlockData } from '@/types';
import { StickyNoteCard } from './StickyNoteCard';

interface CanvasBlockProps {
  data: BlockData;
  isRTL: boolean;
  className?: string;
  icon?: React.ElementType;
}

export const CanvasBlock: React.FC<CanvasBlockProps> = ({ data, isRTL, className, icon: Icon }) => {
  return (
    <div
      className={`bg-white border-2 border-gray-200 p-2 flex flex-col relative overflow-hidden h-full min-h-[160px] group ${
        className || ''
      }`}
      data-testid={`canvas-block-${data.id}`}
    >
      {/* Background Icon */}
      {Icon && (
        <div className='absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none z-0'>
          <Icon size={120} strokeWidth={1} />
        </div>
      )}

      <h3
        className={`text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 relative z-10 ${
          isRTL ? 'text-right' : 'text-left'
        }`}
        data-testid='block-title'
      >
        {isRTL ? data.titleFa : data.titleEn}
      </h3>
      <div className='flex-1 w-full relative z-10'>
        <div className='flex flex-wrap gap-2 content-start justify-center'>
          {data.notes.map((note) => (
            <div key={note.id} className='w-[120px]'>
              <StickyNoteCard note={note} isRTL={isRTL} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
