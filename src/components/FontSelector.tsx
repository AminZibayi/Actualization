'use client';

import React, { useState } from 'react';
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
  }) => (
    <div className='flex flex-col gap-1 mb-2'>
      {label && <span className='text-xs text-gray-500 font-medium'>{label}</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none ${
          isRTL ? 'text-right' : 'text-left'
        }`}
        dir='ltr' // Font names are always LTR
      >
        {categories.map((category) => (
          <optgroup key={category} label={category.toUpperCase()}>
            {GOOGLE_FONTS.filter((f) => f.category === category).map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );

  return (
    <div className='mt-4 pt-4 border-t border-gray-100'>
      <div className='flex items-center gap-2 mb-2'>
        <Type size={14} className='text-gray-500' />
        <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider'>
          {t('sidebar.fonts.title', 'Fonts')}
        </label>
      </div>

      {/* Helper text since we haven't added translations yet */}
      {/* Remove this in production or once translations are added */}

      {/* Master Selector */}
      <FontDropdown
        value={currentFonts.canvasTitle} // Use canvas title as proxy for "primary" if mixed, or just show the first one
        onChange={handleGlobalChange}
        label={t('sidebar.fonts.primary', 'Primary Font')}
      />

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium mt-1 mb-2 transition-colors'
      >
        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {t('sidebar.fonts.customize', 'Customize Elements')}
      </button>

      {isExpanded && (
        <div className='pl-2 border-l-2 border-gray-100 space-y-2 animate-in slide-in-from-top-2 duration-200'>
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
