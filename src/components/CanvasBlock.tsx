'use client';

import { useTranslation } from 'react-i18next';
import { BlockData } from '@/types';
import { StickyNoteCard } from './StickyNoteCard';

import { CanvasFonts } from '@/types';

interface CanvasBlockProps {
  data: BlockData;
  isRTL: boolean;
  className?: string;
  icon?: React.ElementType;
  scale?: number;
  columns?: number;
  fonts?: CanvasFonts;
}

export const CanvasBlock: React.FC<CanvasBlockProps> = ({
  data,
  isRTL,
  className,
  icon: Icon,
  scale = 1,
  fonts,
  ...props
}) => {
  const { t } = useTranslation();

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
          <Icon size={120 * scale} strokeWidth={1} />
        </div>
      )}

      <h3
        className={`font-bold uppercase tracking-wider text-gray-500 mb-2 relative z-10 ${
          isRTL ? 'text-right' : 'text-left'
        }`}
        style={{
          fontSize: `${12 * scale}px`,
          fontFamily: fonts ? `"${fonts.blockTitle}", sans-serif` : undefined,
        }}
        data-testid='block-title'
      >
        {t(`blocks.${data.id}`)}
      </h3>
      <div className='flex-1 w-full relative z-10'>
        <div className='flex flex-wrap gap-2 content-start justify-center'>
          {data.notes.map((note) => (
            <div
              key={note.id}
              style={{
                width: `calc((100% - ${(props.columns || 2) - 1} * 0.5rem) / ${
                  props.columns || 2
                })`,
              }}
            >
              <StickyNoteCard note={note} isRTL={isRTL} fonts={fonts} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
