'use client';

import React, { useRef } from 'react';
import { Trash2 } from 'lucide-react';
import { Note, CanvasFonts } from '@/types';
import { getRandomRotation } from '@/utils';
import { NOTE_COLORS } from '@/constants';

interface StickyNoteCardProps {
  note: Note;
  onDelete?: () => void;
  isRTL: boolean;
  fonts?: CanvasFonts;
}

export const StickyNoteCard: React.FC<StickyNoteCardProps> = ({ note, onDelete, isRTL, fonts }) => {
  const rotation = useRef(getRandomRotation());

  const colorClass = NOTE_COLORS[note.color] || NOTE_COLORS.yellow;

  return (
    <div
      className={`relative p-3 shadow-md border-b-2 ${colorClass} transition-transform hover:scale-105 hover:z-10 group`}
      style={{
        transform: `rotate(${rotation.current}deg)`,
      }}
      data-testid='sticky-note'
    >
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm'
          data-testid='delete-note-btn'
          aria-label='Delete note'
        >
          <Trash2 size={12} />
        </button>
      )}
      <div
        className='font-bold text-sm mb-1 leading-tight'
        data-testid='note-title'
        style={{
          fontFamily: isRTL
            ? '"Vazirmatn", sans-serif'
            : fonts
              ? `"${fonts.noteTitle}", cursive`
              : '"Gloria Hallelujah", cursive',
        }}
      >
        {note.title}
      </div>
      <div
        className='text-xs whitespace-pre-wrap leading-tight'
        data-testid='note-body'
        style={{
          fontFamily: isRTL
            ? '"Vazirmatn", sans-serif'
            : fonts
              ? `"${fonts.noteBody}", sans-serif`
              : undefined,
        }}
      >
        {note.body}
      </div>
    </div>
  );
};
