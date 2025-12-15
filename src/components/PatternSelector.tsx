import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PATTERNS, PATTERN_TYPE } from '@/constants/patterns';
import { ChevronDown, Check } from 'lucide-react';

interface PatternSelectorProps {
  value: PATTERN_TYPE;
  onChange: (value: PATTERN_TYPE) => void;
}

export const PatternSelector: React.FC<PatternSelectorProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
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

  const handleSelect = (patternValue: PATTERN_TYPE) => {
    onChange(patternValue);
    setIsOpen(false);
  };

  const selectedLabel = value ? t(`patterns.${value}`) : t('patterns.none');

  return (
    <div className='bg-white/60 p-4 rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200'>
      <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3'>
        {t('sidebar.backgroundPattern')}
      </label>

      <div className='relative' ref={containerRef}>
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 border rounded-xl text-sm text-gray-900 bg-white/80 focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all duration-200 flex items-center justify-between group ${
            isOpen
              ? 'border-indigo-400 ring-2 ring-indigo-500/30'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className='font-medium truncate'>{selectedLabel}</span>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform duration-300 group-hover:text-indigo-500 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`}
          />
        </button>

        {isOpen && (
          <div className='absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-xl shadow-xl max-h-[300px] overflow-y-auto custom-scrollbar animate-scale-in origin-top-center'>
            <div className='p-1.5 space-y-0.5'>
              {PATTERNS.map((pattern) => {
                const isSelected = value === pattern.value;
                return (
                  <button
                    key={pattern.value}
                    onClick={() => handleSelect(pattern.value)}
                    className={`w-full px-3 py-2.5 rounded-lg text-sm text-left transition-all duration-200 flex items-center justify-between group ${
                      isSelected
                        ? 'bg-indigo-50 text-indigo-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span>{t(`patterns.${pattern.value}`)}</span>
                    {isSelected && <Check size={14} className='text-indigo-600' />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
