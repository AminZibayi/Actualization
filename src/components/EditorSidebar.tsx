'use client';

import React from 'react';
import {
  Plus,
  Trash2,
  ChevronLeft,
  Link,
  Upload,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import { CanvasData, EditorTab, Note, NoteColor } from '@/types';
import { BLOCK_IDS, NOTE_COLOR_VALUES } from '@/constants';

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
      setConvertError('Could not load image. Try uploading instead.');
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
    <div className='mt-4 pt-4 border-t border-gray-100'>
      <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
        Logo
      </label>
      <div className='flex gap-2 mb-3 bg-gray-100 p-1 rounded-md'>
        {(['url', 'upload', 'paste'] as const).map((m) => (
          <button
            key={m}
            className={`flex-1 py-1 text-xs font-medium rounded-sm transition-all ${
              mode === m
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setMode(m)}
          >
            {m === 'url' && <Link size={12} className='inline mr-1' />}
            {m === 'upload' && <Upload size={12} className='inline mr-1' />}
            {m === 'paste' && <FileText size={12} className='inline mr-1' />}
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {mode === 'url' && (
        <div className='space-y-2'>
          <div className='relative flex gap-2'>
            <div className='relative flex-1'>
              <Link
                size={14}
                className={`absolute top-2.5 ${isRTL ? 'right-3' : 'left-3'} text-gray-400`}
              />
              <input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                placeholder='https://example.com/logo.png'
                className={`w-full p-2 ${
                  isRTL ? 'pr-9' : 'pl-9'
                } border rounded-md text-sm text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500`}
                dir='ltr'
                disabled={isConverting}
              />
            </div>
            <button
              onClick={handleUrlSubmit}
              disabled={isConverting || !urlInput.trim()}
              className='px-3 py-2 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              {isConverting ? 'Loading...' : 'Load'}
            </button>
          </div>
          {convertError && <p className='text-xs text-red-500'>{convertError}</p>}
          <p className='text-xs text-gray-400'>
            Enter URL and click Load to convert for reliable export
          </p>
        </div>
      )}

      {mode === 'upload' && (
        <label className='border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all text-center group'>
          <Upload
            size={24}
            className='text-gray-400 group-hover:text-indigo-500 mb-2 transition-colors'
          />
          <span className='text-xs text-gray-600 group-hover:text-indigo-700 font-medium'>
            Click to upload SVG
          </span>
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
          placeholder='Paste SVG code or Base64 string...'
          className='w-full p-2 border rounded-md text-xs font-mono bg-gray-50 text-gray-600 h-24 outline-none focus:ring-2 focus:ring-indigo-500 resize-none'
          onChange={handlePaste}
        />
      )}

      {value && (
        <div className='mt-3 flex items-center gap-2 text-xs text-green-600 bg-green-50 p-2 rounded border border-green-100'>
          <ImageIcon size={14} />
          <span className='font-medium'>Logo set successfully</span>
          <button
            onClick={() => onChange('')}
            className='ml-auto text-green-700 hover:text-green-900 hover:underline'
          >
            Remove
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
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (activeTab === 'yaml' && textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [activeTab, yamlText]);

  return (
    <aside
      className={`
        bg-white border-r border-gray-200 flex flex-col z-10 shadow-xl overflow-hidden transition-all duration-300 ease-in-out
        ${
          isSidebarOpen
            ? 'w-full lg:w-96 translate-x-0'
            : 'w-0 -translate-x-full lg:translate-x-0 lg:w-0 opacity-0 lg:opacity-100'
        }
      `}
      data-testid='editor-sidebar'
    >
      <div className='p-4 border-b bg-gray-50 flex justify-between items-center'>
        <h2 className='text-sm font-bold uppercase text-gray-500 tracking-wider'>
          Project Details
        </h2>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className='lg:hidden text-gray-400'
          data-testid='close-sidebar-btn'
        >
          <ChevronLeft />
        </button>
      </div>

      <div className='flex-1 overflow-y-auto custom-scrollbar'>
        {activeTab !== 'yaml' && (
          <div className='p-4 border-b bg-gray-50 pt-0'>
            <div className='space-y-3'>
              <input
                value={data.meta.title}
                onChange={(e) =>
                  setData({ ...data, meta: { ...data.meta, title: e.target.value } })
                }
                placeholder='Startup Name'
                className={`w-full p-2 border rounded-md text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none ${
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
                placeholder='Tagline or Date'
                className={`w-full p-2 border rounded-md text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none ${
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

              <div className='mt-4 pt-4 border-t border-gray-100'>
                <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
                  Canvas Size
                </label>
                <div className='flex gap-2 bg-gray-100 p-1 rounded-md'>
                  {(['A4', 'A3', 'A2', 'A1'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setData({ ...data, meta: { ...data.meta, canvasSize: size } })}
                      className={`flex-1 py-1 text-xs font-medium rounded-sm transition-all ${
                        data.meta.canvasSize === size
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
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
          <div className='p-4 space-y-6 pb-20'>
            {BLOCK_IDS.map((blockId) => {
              const block = data.blocks[blockId];
              return (
                <div
                  key={blockId}
                  className='border rounded-lg bg-gray-50 overflow-hidden'
                  data-testid={`editor-block-${blockId}`}
                >
                  <div className='p-3 bg-gray-100 border-b flex justify-between items-center'>
                    <span className='font-bold text-sm text-gray-900'>
                      {isRTL ? block.titleFa : block.titleEn}
                    </span>
                    <button
                      onClick={() => onAddNote(blockId)}
                      className='text-indigo-600 hover:text-indigo-800 p-1 rounded hover:bg-indigo-100 transition-colors'
                      data-testid={`add-note-btn-${blockId}`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className='p-2 space-y-2'>
                    {block.notes.length === 0 && (
                      <div className='text-center text-gray-400 text-xs py-2 italic'>
                        No sticky notes
                      </div>
                    )}
                    {block.notes.map((note) => (
                      <div
                        key={note.id}
                        className='bg-white border rounded p-2 shadow-sm space-y-2'
                        data-testid={`note-editor-${note.id}`}
                      >
                        <div className='flex gap-2 mb-1'>
                          {NOTE_COLOR_OPTIONS.map((c) => (
                            <button
                              key={c}
                              onClick={() => onUpdateNote(blockId, note.id, 'color', c)}
                              className={`w-4 h-4 rounded-full border ${
                                note.color === c ? 'ring-2 ring-offset-1 ring-gray-400' : ''
                              }`}
                              style={{ backgroundColor: NOTE_COLOR_VALUES[c] }}
                              data-testid={`color-btn-${c}`}
                              aria-label={`Set color to ${c}`}
                            />
                          ))}
                          <div className='flex-1' />
                          <button
                            onClick={() => onDeleteNote(blockId, note.id)}
                            className='text-red-400 hover:text-red-600'
                            data-testid='delete-note-editor-btn'
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <input
                          value={note.title}
                          onChange={(e) => onUpdateNote(blockId, note.id, 'title', e.target.value)}
                          placeholder='Title'
                          className={`w-full text-sm font-bold border-b border-transparent hover:border-gray-200 focus:border-indigo-500 outline-none pb-1 text-gray-900 ${
                            isRTL ? 'text-right' : 'text-left'
                          }`}
                          dir={isRTL ? 'rtl' : 'ltr'}
                          data-testid='note-title-input'
                        />
                        <textarea
                          value={note.body}
                          onChange={(e) => onUpdateNote(blockId, note.id, 'body', e.target.value)}
                          placeholder='Details...'
                          rows={2}
                          className={`w-full text-xs text-gray-800 resize-none outline-none ${
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
