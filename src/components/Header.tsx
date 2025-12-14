'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Layout,
  Type,
  FileText,
  Download,
  Languages,
  RefreshCw,
  Menu,
  Sparkles,
} from 'lucide-react';
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

  return (
    <header className='bg-indigo-900 text-white p-4 shadow-lg z-20'>
      <div className='max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4'>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className='p-1 rounded hover:bg-indigo-800 transition-colors'
            title={isSidebarOpen ? t('header.closeSidebar') : t('header.openSidebar')}
            data-testid='toggle-sidebar-btn'
          >
            <Menu className='h-6 w-6 text-indigo-200' />
          </button>
          <Layout className='h-6 w-6 text-indigo-300' />
          <h1 className='text-xl font-bold tracking-tight hidden sm:block'>
            {t('header.title')}{' '}
            <span className='text-indigo-300 font-light'>{t('header.subtitle')}</span>
          </h1>
        </div>

        <div
          className={`flex items-center gap-2 bg-indigo-800 p-1 rounded-lg ${!isSidebarOpen && 'hidden md:flex'}`}
        >
          <button
            onClick={() => {
              setActiveTab('editor');
              if (!isSidebarOpen) setIsSidebarOpen(true);
            }}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'editor'
                ? 'bg-white text-indigo-900 shadow-sm'
                : 'text-indigo-200 hover:text-white'
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
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'yaml'
                ? 'bg-white text-indigo-900 shadow-sm'
                : 'text-indigo-200 hover:text-white'
            }`}
            data-testid='tab-yaml'
          >
            <FileText size={16} /> {t('header.tabYaml')}
          </button>
        </div>

        <div className='flex items-center gap-3'>
          <button
            onClick={onSeed}
            className='p-2 rounded-full hover:bg-indigo-700 text-indigo-200 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium'
            title={t('header.loadExample')}
            data-testid='seed-btn'
          >
            <Sparkles size={18} />
            <span className='hidden sm:inline'>{t('header.seed')}</span>
          </button>
          <button
            onClick={onToggleLanguage}
            className='p-2 rounded-full hover:bg-indigo-700 transition-colors flex items-center gap-1 text-sm font-medium'
            title={t('header.toggleLanguage')}
            data-testid='language-toggle-btn'
          >
            <Languages size={18} />
            {isRTL ? 'EN' : 'FA'}
          </button>
          <button
            onClick={onDownload}
            disabled={downloading}
            className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-bold shadow-sm transition-colors flex items-center gap-2'
            data-testid='export-btn'
          >
            {downloading ? (
              <RefreshCw className='animate-spin' size={16} />
            ) : (
              <Download size={16} />
            )}
            {t('header.exportPng')}
          </button>
        </div>
      </div>
    </header>
  );
};
