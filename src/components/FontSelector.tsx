'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight, Type } from 'lucide-react';
import { CanvasFonts } from '@/types';
import { GOOGLE_FONTS, DEFAULT_FONTS } from '@/constants/fonts';

interface FontSelectorProps {
  fonts: CanvasFonts | undefined;
  onChange: (fonts: CanvasFonts) => void;
  isRTL: boolean;
}

export const FontSelector: React.FC<FontSelectorProps> = ({ fonts, onChange, isRTL }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const currentFonts = fonts || DEFAULT_FONTS;

  const handleGlobalChange = (fontFamily: string) => {
    onChange({
      canvasTitle: fontFamily,
      canvasCaption: fontFamily,
      blockTitle: fontFamily,
      noteTitle: fontFamily,
      noteBody: fontFamily,
    });
  };

  const handleIndividualChange = (key: keyof CanvasFonts, fontFamily: string) => {
    onChange({
      ...currentFonts,
      [key]: fontFamily,
    });
  };

  // Group fonts by category for the dropdown
  const categories = Array.from(new Set(GOOGLE_FONTS.map((f) => f.category)));

  const FontDropdown = ({
    value,
    onChange,
    label,
  }: {
    value: string;
    onChange: (val: string) => void;
    label?: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (fontValue: string) => {
      onChange(fontValue);
      setIsOpen(false);
    };

    const selectedFont = GOOGLE_FONTS.find((f) => f.value === value);

    return (
      <div className='flex flex-col gap-1.5 mb-3'>
        {label && <span className='text-xs text-gray-500 font-semibold'>{label}</span>}
        <div className='relative' ref={containerRef}>
          <button
            type='button'
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full px-4 py-3 border rounded-xl text-sm text-gray-900 bg-white/80 focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all duration-200 flex items-center justify-between group cursor-pointer ${
              isOpen
                ? 'border-indigo-400 ring-2 ring-indigo-500/30'
                : 'border-gray-200 hover:border-gray-300'
            } ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}
          >
            <span className='font-medium truncate' style={{ fontFamily: selectedFont?.value }}>
              {selectedFont?.label || value}
            </span>
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform duration-300 group-hover:text-indigo-500 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`}
            />
          </button>

          {isOpen && (
            <div className='absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-xl shadow-xl max-h-[300px] overflow-y-auto custom-scrollbar animate-scale-in origin-top-center'>
              <div className='p-1.5'>
                {categories.map((category) => (
                  <div key={category} className='mb-2 last:mb-0'>
                    <div
                      className={`px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}
                    >
                      {category}
                    </div>
                    <div className='space-y-0.5'>
                      {GOOGLE_FONTS.filter((f) => f.category === category).map((font) => {
                        const isSelected = value === font.value;
                        return (
                          <button
                            key={font.value}
                            onClick={() => handleSelect(font.value)}
                            className={`w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center justify-between group ${
                              isSelected
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            } ${isRTL ? 'flex-row-reverse' : ''}`}
                          >
                            <span
                              className={`font-medium ${isSelected ? 'font-bold' : ''}`}
                              style={{ fontFamily: font.value }}
                            >
                              {font.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='mt-5 pt-5 border-t border-gray-100/80'>
      <div className='flex items-center gap-2.5 mb-3'>
        <div className='p-1.5 rounded-lg bg-indigo-50'>
          <Type size={14} className='text-indigo-500' />
        </div>
        <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest'>
          {t('sidebar.fonts.title', 'Fonts')}
        </label>
      </div>

      {/* Master Selector */}
      <FontDropdown
        value={currentFonts.canvasTitle}
        onChange={handleGlobalChange}
        label={t('sidebar.fonts.primary', 'Primary Font')}
      />

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-semibold mt-2 mb-3 transition-colors group'
      >
        <span className='inline-flex items-center justify-center w-5 h-5 rounded-md bg-indigo-50 group-hover:bg-indigo-100 transition-colors'>
          {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </span>
        {t('sidebar.fonts.customize', 'Customize Elements')}
      </button>

      {isExpanded && (
        <div className='pl-3 border-l-2 border-indigo-100 space-y-1 animate-slide-up'>
          <FontDropdown
            value={currentFonts.canvasTitle}
            onChange={(val) => handleIndividualChange('canvasTitle', val)}
            label={t('sidebar.fonts.canvasTitle', 'Canvas Title')}
          />
          <FontDropdown
            value={currentFonts.canvasCaption}
            onChange={(val) => handleIndividualChange('canvasCaption', val)}
            label={t('sidebar.fonts.canvasCaption', 'Canvas Caption')}
          />
          <FontDropdown
            value={currentFonts.blockTitle}
            onChange={(val) => handleIndividualChange('blockTitle', val)}
            label={t('sidebar.fonts.blockTitle', 'Block Title')}
          />
          <FontDropdown
            value={currentFonts.noteTitle}
            onChange={(val) => handleIndividualChange('noteTitle', val)}
            label={t('sidebar.fonts.noteTitle', 'Note Title')}
          />
          <FontDropdown
            value={currentFonts.noteBody}
            onChange={(val) => handleIndividualChange('noteBody', val)}
            label={t('sidebar.fonts.noteBody', 'Note Body')}
          />
        </div>
      )}
    </div>
  );
};
