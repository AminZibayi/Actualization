'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Type, FileText, Download, RefreshCw, Menu, Sparkles } from 'lucide-react';
import { EditorTab } from '@/types';

interface HeaderProps {
  activeTab: EditorTab;
  setActiveTab: (tab: EditorTab) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  onToggleLanguage: () => void;
  onSeed: () => void;
  onDownload: () => void;
  downloading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
  onToggleLanguage,
  onSeed,
  onDownload,
  downloading,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  const islandClass =
    'bg-white text-gray-900 p-2 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-2 pointer-events-auto transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]';
  const btnClass =
    'p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer';

  return (
    <header className='flex flex-wrap items-start justify-between p-4 bg-transparent pointer-events-none gap-4 absolute top-0 left-0 right-0 z-50'>
      {/* Left Island: Menu & Title */}
      <div className={islandClass}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={btnClass}
          title={isSidebarOpen ? t('header.closeSidebar') : t('header.openSidebar')}
          data-testid='toggle-sidebar-btn'
        >
          <Menu className='h-5 w-5' />
        </button>
        <div className='h-6 w-px bg-gray-200 mx-1'></div>
        <Layout className='h-5 w-5 text-indigo-600' />
        <div className='flex flex-col leading-tight mr-2'>
          <h1 className='text-sm font-bold tracking-tight'>{t('header.title')}</h1>
          <span className='text-[10px] text-gray-500 font-medium uppercase tracking-wider'>
            {t('header.subtitle')}
          </span>
        </div>
      </div>

      {/* Center Island: Tabs (Visible on larger screens usually) */}
      <div className={`${islandClass} ${!isSidebarOpen && 'hidden md:flex'}`}>
        <button
          onClick={() => {
            setActiveTab('editor');
            if (!isSidebarOpen) setIsSidebarOpen(true);
          }}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'editor'
              ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
          }`}
          data-testid='tab-editor'
        >
          <Type size={16} /> {t('header.tabGui')}
        </button>
        <button
          onClick={() => {
            setActiveTab('yaml');
            if (!isSidebarOpen) setIsSidebarOpen(true);
          }}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'yaml'
              ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
          }`}
          data-testid='tab-yaml'
        >
          <FileText size={16} /> {t('header.tabYaml')}
        </button>
      </div>

      {/* Right Island: Actions */}
      <div className={islandClass}>
        <button
          onClick={onSeed}
          className={btnClass}
          title={t('header.loadExample')}
          data-testid='seed-btn'
        >
          <Sparkles size={18} className='text-amber-500' />
        </button>

        <button
          onClick={onToggleLanguage}
          className={`${btnClass} w-10 h-10 flex items-center justify-center font-bold text-xs`}
          title={t('header.toggleLanguage')}
          data-testid='language-toggle-btn'
        >
          {isRTL ? 'EN' : 'FA'}
        </button>

        <div className='h-6 w-px bg-gray-200 mx-1'></div>

        <button
          onClick={onDownload}
          disabled={downloading}
          className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2 ml-1'
          data-testid='export-btn'
        >
          {downloading ? <RefreshCw className='animate-spin' size={16} /> : <Download size={16} />}
          {t('header.exportPng')}
        </button>
      </div>
    </header>
  );
};
