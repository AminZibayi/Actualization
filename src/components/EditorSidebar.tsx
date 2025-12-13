'use client';

import React from 'react';
import { Plus, Trash2, ChevronLeft } from 'lucide-react';
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
