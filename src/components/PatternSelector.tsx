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
    <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
      <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
        {t('sidebar.backgroundPattern')}
      </label>
      <select
        value={value || 'none'}
        onChange={(e) => onChange(e.target.value as PATTERN_TYPE)}
        className='w-full p-2 border rounded-md text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none'
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
