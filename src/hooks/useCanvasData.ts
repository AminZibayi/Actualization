'use client';

import { useState, useCallback } from 'react';
import { CanvasData, Note, EditorTab, Language } from '@/types';
import { DEFAULT_DATA, SEED_DATA } from '@/constants';
import { generateId, deepClone, serializeToYaml, parseYaml } from '@/utils';

export const useCanvasData = () => {
  const [data, setData] = useState<CanvasData>(deepClone(DEFAULT_DATA));
  const [activeTab, setActiveTab] = useState<EditorTab>('editor');
  const [language, setLanguage] = useState<Language>('en');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [yamlText, setYamlText] = useState('');
  const [downloading, setDownloading] = useState(false);

  const isRTL = language === 'fa';

  // Sync data to YAML when in editor tab
  const syncYamlFromData = useCallback(() => {
    if (activeTab === 'editor') {
      setYamlText(serializeToYaml(data));
    }
  }, [data, activeTab]);

  const handleSeed = useCallback(() => {
    if (confirm('This will overwrite your current canvas with example data. Continue?')) {
      setData(deepClone(SEED_DATA));
    }
  }, []);

  const handleYamlChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      setYamlText(val);
      const parsed = parseYaml(val, data);
      if (parsed) {
        setData(parsed);
      }
    },
    [data]
  );

  const addNote = useCallback(
    (blockId: string) => {
      const newNote: Note = {
        id: generateId(),
        title: isRTL ? 'یادداشت جدید' : 'New Note',
        body: '',
        color: 'yellow',
      };
      setData((prev) => ({
        ...prev,
        blocks: {
          ...prev.blocks,
          [blockId]: {
            ...prev.blocks[blockId],
            notes: [...prev.blocks[blockId].notes, newNote],
          },
        },
      }));
    },
    [isRTL]
  );

  const updateNote = useCallback(
    (blockId: string, noteId: string, field: keyof Note, value: string) => {
      setData((prev) => ({
        ...prev,
        blocks: {
          ...prev.blocks,
          [blockId]: {
            ...prev.blocks[blockId],
            notes: prev.blocks[blockId].notes.map((n) =>
              n.id === noteId ? { ...n, [field]: value } : n
            ),
          },
        },
      }));
    },
    []
  );

  const deleteNote = useCallback((blockId: string, noteId: string) => {
    setData((prev) => ({
      ...prev,
      blocks: {
        ...prev.blocks,
        [blockId]: {
          ...prev.blocks[blockId],
          notes: prev.blocks[blockId].notes.filter((n) => n.id !== noteId),
        },
      },
    }));
  }, []);

  return {
    data,
    setData,
    activeTab,
    setActiveTab,
    language,
    setLanguage,
    isSidebarOpen,
    setIsSidebarOpen,
    yamlText,
    setYamlText,
    downloading,
    setDownloading,
    isRTL,
    syncYamlFromData,
    handleSeed,
    handleYamlChange,
    addNote,
    updateNote,
    deleteNote,
  };
};
