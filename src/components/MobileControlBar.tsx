'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Type, FileText, Download, RefreshCw, Sparkles } from 'lucide-react';
import { EditorTab } from '@/types';

interface MobileControlBarProps {
  activeTab: EditorTab;
  setActiveTab: (_tab: EditorTab) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (_open: boolean) => void;
  onToggleLanguage: () => void;
  onSeed: () => void;
  onDownload: () => void;
  downloading: boolean;
  isRTL: boolean;
}

export const MobileControlBar: React.FC<MobileControlBarProps> = ({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
  onToggleLanguage,
  onSeed,
  onDownload,
  downloading,
  isRTL,
}) => {
  const { t } = useTranslation();

  const barClass =
    'glass-card p-1.5 rounded-xl flex flex-col items-center gap-1.5 pointer-events-auto shadow-md border border-white/50';
  const btnClass =
    'p-2.5 rounded-lg hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 transition-all duration-200 cursor-pointer btn-press active:scale-95';

  // Don't render if sidebar is open
  if (isSidebarOpen) {
    return null;
  }

  return (
    <div
      className={`fixed ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 lg:hidden animate-slide-in-right`}
    >
      {/* Tabs Bar - GUI/YAML switcher */}
      <div className={`${barClass}`}>
        <button
          onClick={() => {
            setActiveTab('editor');
            setIsSidebarOpen(true);
          }}
          className={`${btnClass} ${activeTab === 'editor' ? 'bg-indigo-50 text-indigo-600' : ''}`}
          title={t('header.tabGui')}
          data-testid='mobile-tab-editor'
        >
          <Type size={18} />
        </button>
        <div className='w-6 h-px bg-gray-200/50'></div>
        <button
          onClick={() => {
            setActiveTab('yaml');
            setIsSidebarOpen(true);
          }}
          className={`${btnClass} ${activeTab === 'yaml' ? 'bg-indigo-50 text-indigo-600' : ''}`}
          title={t('header.tabYaml')}
          data-testid='mobile-tab-yaml'
        >
          <FileText size={18} />
        </button>
      </div>

      {/* Actions Bar - Seed, Language, Download */}
      <div className={`${barClass}`}>
        <button
          onClick={onSeed}
          className={`${btnClass} group relative overflow-hidden`}
          title={t('header.loadExample')}
          data-testid='mobile-seed-btn'
        >
          <Sparkles
            size={18}
            className='text-amber-500 group-hover:scale-110 transition-transform duration-200'
          />
        </button>

        <div className='w-6 h-px bg-gray-200/50'></div>

        <button
          onClick={onToggleLanguage}
          className={`${btnClass} w-10 h-10 flex items-center justify-center font-bold text-xs rounded-lg border border-transparent hover:border-indigo-200`}
          title={t('header.toggleLanguage')}
          data-testid='mobile-language-toggle-btn'
        >
          <span
            className={`bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent font-black leading-none flex items-center justify-center ${!isRTL ? 'font-persian text-sm' : 'text-xs'}`}
          >
            {isRTL ? 'EN' : 'فا'}
          </span>
        </button>

        <div className='w-6 h-px bg-gray-200/50'></div>

        <button
          onClick={onDownload}
          disabled={downloading}
          className='bg-gray-900 hover:bg-black text-white p-2.5 rounded-lg text-xs font-bold shadow-sm transition-all duration-300 flex items-center justify-center btn-press disabled:opacity-70 disabled:cursor-not-allowed border border-gray-800'
          title={t('header.exportPng')}
          data-testid='mobile-export-btn'
        >
          {downloading ? <RefreshCw className='animate-spin' size={18} /> : <Download size={18} />}
        </button>
      </div>
    </div>
  );
};
