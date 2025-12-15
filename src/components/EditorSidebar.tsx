'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Plus,
  Trash2,
  ChevronLeft,
  Link,
  Upload,
  FileText,
  Image as ImageIcon,
  Settings,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { CanvasData, EditorTab, Note, NoteColor } from '@/types';
import { BLOCK_IDS, NOTE_COLOR_VALUES, PATTERN_TYPE } from '@/constants';
import { PatternSelector } from './PatternSelector';
import { FontSelector } from './FontSelector';

interface EditorSidebarProps {
  data: CanvasData;
  setData: React.Dispatch<React.SetStateAction<CanvasData>>;
  activeTab: EditorTab;
  yamlText: string;
  onYamlChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isRTL: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  onAddNote: (blockId: string) => void;
  onUpdateNote: (blockId: string, noteId: string, field: keyof Note, value: string) => void;
  onDeleteNote: (blockId: string, noteId: string) => void;
}

const NOTE_COLOR_OPTIONS: NoteColor[] = ['yellow', 'blue', 'green', 'pink', 'red'];

interface LogoInputProps {
  value: string;
  onChange: (value: string) => void;
  isRTL: boolean;
}

const LogoInput: React.FC<LogoInputProps> = ({ value, onChange, isRTL }) => {
  const { t } = useTranslation();
  const [mode, setMode] = React.useState<'url' | 'upload' | 'paste'>('url');
  const [urlInput, setUrlInput] = React.useState('');
  const [isConverting, setIsConverting] = React.useState(false);
  const [convertError, setConvertError] = React.useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value.trim();
    if (!content) return;

    if (content.startsWith('data:image')) {
      onChange(content);
    } else if (content.includes('<svg')) {
      try {
        const encoded = btoa(unescape(encodeURIComponent(content)));
        onChange(`data:image/svg+xml;base64,${encoded}`);
      } catch (err) {
        console.error('Failed to encode SVG', err);
      }
    } else if (/^[A-Za-z0-9+/=]+$/.test(content)) {
      onChange(`data:image/svg+xml;base64,${content}`);
    } else {
      // Fallback: assume it's a URL
      onChange(content);
    }
  };

  // Convert external URL to base64 for reliable export
  const convertUrlToBase64 = async (url: string) => {
    if (!url || url.startsWith('data:')) {
      onChange(url);
      return;
    }

    setIsConverting(true);
    setConvertError('');

    try {
      // Fetch the image through a CORS proxy or directly
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) throw new Error('Failed to fetch image');

      const blob = await response.blob();
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        onChange(base64);
        setIsConverting(false);
      };

      reader.onerror = () => {
        throw new Error('Failed to convert to base64');
      };

      reader.readAsDataURL(blob);
    } catch (err) {
      console.error('Failed to convert URL to base64:', err);
      setConvertError(t('sidebar.loadError'));
      // Fall back to using the URL directly (may not export correctly)
      onChange(url);
      setIsConverting(false);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      convertUrlToBase64(urlInput.trim());
    }
  };

  return (
    <div className='mt-5 pt-5 border-t border-gray-100/80'>
      <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3'>
        {t('sidebar.logo')}
      </label>
      <div className='flex gap-1.5 mb-4 bg-gray-100/80 p-1.5 rounded-xl'>
        {(['url', 'upload', 'paste'] as const).map((m) => (
          <button
            key={m}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200 btn-press ${
              mode === m
                ? 'bg-white text-indigo-600 shadow-md shadow-indigo-100'
                : 'text-gray-500 hover:text-indigo-600 hover:bg-white/50'
            }`}
            onClick={() => setMode(m)}
          >
            {m === 'url' && <Link size={12} className='inline mr-1.5' />}
            {m === 'upload' && <Upload size={12} className='inline mr-1.5' />}
            {m === 'paste' && <FileText size={12} className='inline mr-1.5' />}
            {t(`sidebar.${m}`)}
          </button>
        ))}
      </div>

      {mode === 'url' && (
        <div className='space-y-3'>
          <div className='relative flex gap-2.5'>
            <div className='relative flex-1'>
              <Link
                size={14}
                className={`absolute top-3.5 ${isRTL ? 'right-3.5' : 'left-3.5'} text-gray-400`}
              />
              <input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                placeholder={t('sidebar.placeholders.logoUrl')}
                className={`w-full py-3 ${isRTL ? 'pr-10' : 'pl-10'} px-4 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white/80 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-200 placeholder:text-gray-400`}
                dir='ltr'
                disabled={isConverting}
              />
            </div>
            <button
              onClick={handleUrlSubmit}
              disabled={isConverting || !urlInput.trim()}
              className='px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold rounded-xl hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 btn-press shadow-lg shadow-indigo-200'
            >
              {isConverting ? t('sidebar.loading') : t('sidebar.load')}
            </button>
          </div>
          {convertError && <p className='text-xs text-red-500 font-medium'>{convertError}</p>}
          <p className='text-xs text-gray-400'>{t('sidebar.urlHint')}</p>
        </div>
      )}

      {mode === 'upload' && (
        <label className='border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-gradient-to-b hover:from-indigo-50/50 hover:to-violet-50/30 transition-all duration-300 text-center group'>
          <div className='p-3 rounded-xl bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-violet-600 transition-all duration-300 mb-3'>
            <Upload
              size={24}
              className='text-gray-400 group-hover:text-white transition-colors duration-300'
            />
          </div>
          <span className='text-sm text-gray-600 group-hover:text-indigo-700 font-semibold transition-colors'>
            {t('sidebar.clickToUpload')}
          </span>
          <span className='text-xs text-gray-400 mt-1'>SVG files only</span>
          <input
            type='file'
            accept='image/svg+xml'
            className='hidden'
            onChange={handleFileUpload}
          />
        </label>
      )}

      {mode === 'paste' && (
        <textarea
          placeholder={t('sidebar.placeholders.pasteSvg')}
          className='w-full p-4 border border-gray-200 rounded-xl text-xs font-mono bg-gray-50/80 text-gray-600 h-28 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 resize-none transition-all duration-200 placeholder:text-gray-400'
          onChange={handlePaste}
        />
      )}

      {value && (
        <div className='mt-4 flex items-center gap-2.5 text-xs text-emerald-600 bg-gradient-to-r from-emerald-50 to-green-50 p-3 rounded-xl border border-emerald-200 shadow-sm'>
          <ImageIcon size={16} />
          <span className='font-semibold'>{t('sidebar.logoSuccess')}</span>
          <button
            onClick={() => onChange('')}
            className='ml-auto text-emerald-700 hover:text-emerald-900 hover:underline font-medium'
          >
            {t('sidebar.remove')}
          </button>
        </div>
      )}
    </div>
  );
};

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  data,
  setData,
  activeTab,
  yamlText,
  onYamlChange,
  isRTL,
  isSidebarOpen,
  setIsSidebarOpen,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
}) => {
  const { t } = useTranslation();
  const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleResetData = () => {
    if (window.confirm(t('sidebar.advanced.resetConfirm'))) {
      localStorage.clear();
      window.location.reload();
    }
  };

  React.useEffect(() => {
    if (activeTab === 'yaml' && textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [activeTab, yamlText]);

  return (
    <aside
      className={`
        glass-card rounded-2xl flex flex-col z-10 overflow-hidden h-full
        transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${
          isSidebarOpen
            ? 'w-full lg:w-[400px] translate-x-0 opacity-100 ml-0 animate-scale-in'
            : 'w-0 -translate-x-4 opacity-0 lg:w-0'
        }
      `}
      data-testid='editor-sidebar'
    >
      <div className='p-5 border-b border-gray-100/50 bg-gradient-to-r from-indigo-50/80 via-violet-50/50 to-pink-50/30 flex justify-between items-center'>
        <h2 className='text-xs font-bold uppercase text-indigo-600/80 tracking-widest'>
          {t('sidebar.projectDetails')}
        </h2>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className='lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 btn-press'
          data-testid='close-sidebar-btn'
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      <div className='flex-1 overflow-y-auto custom-scrollbar'>
        {activeTab !== 'yaml' && (
          <div className='p-5 border-b border-gray-100/50 bg-gradient-to-b from-white to-gray-50/50 pt-4'>
            <div className='space-y-4'>
              <input
                value={data.meta.title}
                onChange={(e) =>
                  setData({ ...data, meta: { ...data.meta, title: e.target.value } })
                }
                placeholder={t('sidebar.placeholders.startupName')}
                className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white/80 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
                dir={isRTL ? 'rtl' : 'ltr'}
                data-testid='input-title'
              />
              <input
                value={data.meta.caption}
                onChange={(e) =>
                  setData({ ...data, meta: { ...data.meta, caption: e.target.value } })
                }
                placeholder={t('sidebar.placeholders.taglineOrDate')}
                className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white/80 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
                dir={isRTL ? 'rtl' : 'ltr'}
                data-testid='input-caption'
              />
              <LogoInput
                value={data.meta.logoUrl || ''}
                onChange={(url) => setData({ ...data, meta: { ...data.meta, logoUrl: url } })}
                isRTL={isRTL}
              />

              <div className='mt-5 pt-5 border-t border-gray-100/80'>
                <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3'>
                  {t('sidebar.canvasSize')}
                </label>
                <div className='flex gap-1.5 bg-gray-100/80 p-1.5 rounded-xl'>
                  {(['A4', 'A3', 'A2', 'A1'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setData({ ...data, meta: { ...data.meta, canvasSize: size } })}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200 btn-press ${
                        data.meta.canvasSize === size
                          ? 'bg-white text-indigo-600 shadow-md shadow-indigo-100'
                          : 'text-gray-500 hover:text-indigo-600 hover:bg-white/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className='mt-5 pt-5 border-t border-gray-100/80'>
                <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3'>
                  {t('sidebar.noteColumns')}
                </label>
                <div className='flex gap-1.5 bg-gray-100/80 p-1.5 rounded-xl'>
                  {([1, 2, 3, 4] as const).map((cols) => (
                    <button
                      key={cols}
                      onClick={() =>
                        setData({ ...data, meta: { ...data.meta, noteColumns: cols } })
                      }
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200 btn-press ${
                        (data.meta.noteColumns || 2) === cols
                          ? 'bg-white text-indigo-600 shadow-md shadow-indigo-100'
                          : 'text-gray-500 hover:text-indigo-600 hover:bg-white/50'
                      }`}
                    >
                      {cols}
                    </button>
                  ))}
                </div>
              </div>

              <div className='mt-5 pt-5 border-t border-gray-100/80'>
                <PatternSelector
                  value={(data.meta.backgroundPattern as PATTERN_TYPE) || 'none'}
                  onChange={(value) =>
                    setData({ ...data, meta: { ...data.meta, backgroundPattern: value } })
                  }
                />
              </div>

              <FontSelector
                fonts={data.meta.fonts}
                onChange={(fonts) => setData({ ...data, meta: { ...data.meta, fonts } })}
                isRTL={isRTL}
              />

              <div className='mt-8 pt-5 border-t border-gray-200/80'>
                <button
                  onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                  className='flex items-center justify-between w-full text-left group hover:bg-gray-50/50 -mx-2 px-2 py-2 rounded-lg transition-all duration-200'
                >
                  <div className='flex items-center text-gray-600 group-hover:text-indigo-600 font-bold text-xs uppercase tracking-widest transition-colors'>
                    <Settings size={14} className='mr-2.5' />
                    {t('sidebar.advanced.title')}
                  </div>
                  <ChevronLeft
                    size={14}
                    className={`transform transition-transform duration-300 text-gray-400 group-hover:text-indigo-500 ${
                      isAdvancedOpen ? '-rotate-90' : 'rotate-180'
                    }`}
                  />
                </button>

                {isAdvancedOpen && (
                  <div className='mt-4 space-y-4 animate-slide-up'>
                    <div className='space-y-2'>
                      <label className='block text-xs font-medium text-gray-600'>
                        {t('sidebar.advanced.exportScale')}
                      </label>
                      <div className='flex items-center gap-2'>
                        <input
                          type='number'
                          step='0.1'
                          min='0.1'
                          max='10'
                          placeholder='Auto'
                          value={data.meta.advanced?.exportScale || ''}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setData({
                              ...data,
                              meta: {
                                ...data.meta,
                                advanced: {
                                  ...data.meta.advanced,
                                  exportScale: isNaN(val) ? undefined : val,
                                },
                              },
                            });
                          }}
                          className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white/80 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none transition-all duration-200 ${
                            isRTL ? 'text-right' : 'text-left'
                          }`}
                          dir='ltr'
                        />
                      </div>
                      <div className='flex items-start gap-1 p-2 bg-amber-50 text-amber-800 rounded text-xs border border-amber-200'>
                        <AlertTriangle size={12} className='mt-0.5 shrink-0' />
                        {t('sidebar.advanced.scaleWarning')}
                      </div>
                    </div>

                    <button
                      onClick={handleResetData}
                      className='w-full p-3 text-xs font-bold text-red-600 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl hover:from-red-100 hover:to-rose-100 flex items-center justify-center gap-2.5 transition-all duration-200 btn-press shadow-sm hover:shadow-md hover:shadow-red-100'
                      data-testid='reset-data-btn'
                    >
                      <RotateCcw size={14} />
                      {t('sidebar.advanced.resetData')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'yaml' ? (
          <textarea
            ref={textAreaRef}
            className='w-full p-4 font-mono text-sm bg-gray-900 text-green-400 resize-none outline-none overflow-hidden min-h-[500px]'
            value={yamlText}
            onChange={onYamlChange}
            spellCheck={false}
            data-testid='yaml-editor'
          />
        ) : (
          <div className='p-5 space-y-5 pb-24'>
            {BLOCK_IDS.map((blockId, index) => {
              const block = data.blocks[blockId];
              return (
                <div
                  key={blockId}
                  className={`border border-gray-200/80 rounded-2xl bg-white/60 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up stagger-${Math.min(index + 1, 5)}`}
                  data-testid={`editor-block-${blockId}`}
                >
                  <div className='p-3.5 bg-gradient-to-r from-gray-100/90 via-gray-50/80 to-white border-b border-gray-200/50 flex justify-between items-center'>
                    <span className='font-bold text-sm text-gray-800'>
                      {t(`blocks.${blockId}`)}
                    </span>
                    <button
                      onClick={() => onAddNote(blockId)}
                      className='text-indigo-500 hover:text-indigo-700 p-1.5 rounded-lg hover:bg-indigo-50 transition-all duration-200 btn-press'
                      data-testid={`add-note-btn-${blockId}`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className='p-3 space-y-2.5'>
                    {block.notes.length === 0 && (
                      <div className='text-center text-gray-400 text-xs py-4 italic'>
                        {t('sidebar.noStickyNotes')}
                      </div>
                    )}
                    {block.notes.map((note) => (
                      <div
                        key={note.id}
                        className='bg-white border border-gray-200/80 rounded-xl p-3 shadow-sm hover:shadow-md space-y-2.5 transition-all duration-200 hover:border-gray-300'
                        data-testid={`note-editor-${note.id}`}
                      >
                        <div className='flex gap-2.5 mb-1.5'>
                          {NOTE_COLOR_OPTIONS.map((c) => (
                            <button
                              key={c}
                              onClick={() => onUpdateNote(blockId, note.id, 'color', c)}
                              className={`w-5 h-5 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                                note.color === c
                                  ? 'ring-2 ring-offset-2 ring-gray-400 border-white'
                                  : 'border-transparent hover:border-gray-300'
                              }`}
                              style={{ backgroundColor: NOTE_COLOR_VALUES[c] }}
                              data-testid={`color-btn-${c}`}
                              aria-label={`${t('sidebar.setColorTo')} ${c}`}
                            />
                          ))}
                          <div className='flex-1' />
                          <button
                            onClick={() => onDeleteNote(blockId, note.id)}
                            className='text-gray-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-all duration-200'
                            data-testid='delete-note-editor-btn'
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <input
                          value={note.title}
                          onChange={(e) => onUpdateNote(blockId, note.id, 'title', e.target.value)}
                          placeholder={t('sidebar.placeholders.title')}
                          className={`w-full text-sm font-bold border-b-2 border-transparent hover:border-gray-200 focus:border-indigo-400 outline-none pb-1.5 text-gray-900 transition-all duration-200 bg-transparent ${
                            isRTL ? 'text-right' : 'text-left'
                          }`}
                          dir={isRTL ? 'rtl' : 'ltr'}
                          data-testid='note-title-input'
                        />
                        <textarea
                          value={note.body}
                          onChange={(e) => onUpdateNote(blockId, note.id, 'body', e.target.value)}
                          placeholder={t('sidebar.placeholders.details')}
                          rows={2}
                          className={`w-full text-xs text-gray-700 resize-none outline-none bg-transparent hover:bg-gray-50/50 focus:bg-gray-50/50 rounded-lg transition-all duration-200 ${
                            isRTL ? 'text-right' : 'text-left'
                          }`}
                          dir={isRTL ? 'rtl' : 'ltr'}
                          data-testid='note-body-input'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
};
