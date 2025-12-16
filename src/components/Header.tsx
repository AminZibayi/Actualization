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

// Adjust header padding and spacing
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
    'glass-card p-1.5 rounded-xl flex items-center gap-2 pointer-events-auto hover-lift animate-slide-down shadow-sm border border-white/50';
  const btnClass =
    'p-2 rounded-lg hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 transition-all duration-200 cursor-pointer btn-press active:scale-95';

  return (
    <header className='flex flex-wrap items-start justify-between p-3 bg-transparent pointer-events-none gap-3 absolute top-0 left-0 right-0 z-50'>
      {/* Left Island: Menu & Title */}
      <div className={`${islandClass} stagger-1`}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`${btnClass} ${isSidebarOpen ? 'bg-indigo-50 text-indigo-600' : ''}`}
          title={isSidebarOpen ? t('header.closeSidebar') : t('header.openSidebar')}
          data-testid='toggle-sidebar-btn'
        >
          <Menu className='h-4.5 w-4.5' />
        </button>
        <div className='h-6 w-px bg-gray-200/50'></div>
        <div className='p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm'>
          <Layout className='h-4 w-4 text-white' />
        </div>
        <div className='flex flex-col leading-none mr-1 ml-1 '>
          <h1 className='text-[18px] font-bold tracking-tight text-gray-800'>
            {t('header.title')}
          </h1>
          <span className='text-[12px] text-gray-400 font-semibold uppercase tracking-widest mt-0.5'>
            {t('header.subtitle')}
          </span>
        </div>
      </div>

      {/* Center Island: Tabs (Hidden on mobile, shown as vertical bar) */}
      <div className={`${islandClass} stagger-2 hidden lg:flex bg-white/40 backdrop-blur-md`}>
        <div className='flex p-1 bg-gray-100/50 rounded-lg relative'>
          {/* Animated background pill could go here, but outline style requested. */}
          {/* We will use a clean outline style with state transition animation */}

          <button
            onClick={() => {
              setActiveTab('editor');
              if (!isSidebarOpen) setIsSidebarOpen(true);
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-300 flex items-center gap-1.5 border ${
              activeTab === 'editor'
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 shadow-sm scale-105'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
            }`}
            data-testid='tab-editor'
          >
            <Type
              size={14}
              className={`transition-transform duration-300 ${activeTab === 'editor' ? 'scale-110' : ''}`}
            />
            {t('header.tabGui')}
          </button>

          <div className='w-px bg-gray-200 mx-1 my-1'></div>

          <button
            onClick={() => {
              setActiveTab('yaml');
              if (!isSidebarOpen) setIsSidebarOpen(true);
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-300 flex items-center gap-1.5 border ${
              activeTab === 'yaml'
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 shadow-sm scale-105'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
            }`}
            data-testid='tab-yaml'
          >
            <FileText
              size={14}
              className={`transition-transform duration-300 ${activeTab === 'yaml' ? 'scale-110' : ''}`}
            />
            {t('header.tabYaml')}
          </button>
        </div>
      </div>

      {/* Right Island: Actions (Hidden on mobile, shown as vertical bar) */}
      <div className={`${islandClass} stagger-3 hidden lg:flex`}>
        <button
          onClick={onSeed}
          className={`${btnClass} group relative overflow-hidden`}
          title={t('header.loadExample')}
          data-testid='seed-btn'
        >
          <Sparkles
            size={16}
            className='text-amber-500 group-hover:scale-110 transition-transform duration-200'
          />
        </button>

        <button
          onClick={onToggleLanguage}
          className={`${btnClass} w-8 h-8 flex items-center justify-center font-bold text-xs rounded-lg border border-transparent hover:border-indigo-200`}
          title={t('header.toggleLanguage')}
          data-testid='language-toggle-btn'
        >
          <span
            className={`bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent font-black leading-none flex items-center justify-center pt-px ${!isRTL ? 'font-persian text-sm pt-0.5' : 'text-xs'}`}
          >
            {isRTL ? 'EN' : 'فا'}
          </span>
        </button>

        <div className='h-6 w-px bg-gray-200/50'></div>

        <button
          onClick={onDownload}
          disabled={downloading}
          className='bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition-all duration-300 flex items-center gap-2 btn-press disabled:opacity-70 disabled:cursor-not-allowed border border-gray-800'
          data-testid='export-btn'
        >
          {downloading ? <RefreshCw className='animate-spin' size={14} /> : <Download size={14} />}
          {t('header.exportPng')}
        </button>
      </div>
    </header>
  );
};
