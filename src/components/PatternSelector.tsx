import React from 'react';
import { useTranslation } from 'react-i18next';
import { PATTERNS, PATTERN_TYPE } from '@/constants/patterns';

interface PatternSelectorProps {
  value: PATTERN_TYPE;
  onChange: (value: PATTERN_TYPE) => void;
}

export const PatternSelector: React.FC<PatternSelectorProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className='bg-white/60 p-4 rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200'>
      <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3'>
        {t('sidebar.backgroundPattern')}
      </label>
      <select
        value={value || 'none'}
        onChange={(e) => onChange(e.target.value as PATTERN_TYPE)}
        className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white/80 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none transition-all duration-200 cursor-pointer hover:border-gray-300'
      >
        {PATTERNS.map((pattern) => (
          <option key={pattern.value} value={pattern.value}>
            {t(`patterns.${pattern.value}`)}
          </option>
        ))}
      </select>
    </div>
  );
};
