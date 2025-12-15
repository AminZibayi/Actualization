'use client';

import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CanvasData, Note, EditorTab } from '@/types';
import { DEFAULT_DATA, SEED_DATA, SEED_DATA_FA } from '@/constants';
import { generateId, deepClone, serializeToYaml, parseYaml } from '@/utils';

export const useCanvasData = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<CanvasData>(deepClone(DEFAULT_DATA));
  const [activeTab, setActiveTab] = useState<EditorTab>('editor');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [yamlText, setYamlText] = useState('');
  const [downloading, setDownloading] = useState(false);

  const isRTL = i18n.language === 'fa';

  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLang);
  }, [i18n]);

  // Sync data to YAML when in editor tab
  const syncYamlFromData = useCallback(() => {
    if (activeTab === 'editor') {
      setYamlText(serializeToYaml(data));
    }
  }, [data, activeTab]);

  const handleSeed = useCallback(() => {
    if (confirm(t('header.confirmLoadExample'))) {
      setData(deepClone(isRTL ? SEED_DATA_FA : SEED_DATA));
    }
  }, [t, isRTL]);

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
    isSidebarOpen,
    setIsSidebarOpen,
    yamlText,
    setYamlText,
    downloading,
    setDownloading,
    isRTL,
    toggleLanguage,
    syncYamlFromData,
    handleSeed,
    handleYamlChange,
    addNote,
    updateNote,
    deleteNote,
  };
};
