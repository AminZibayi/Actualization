'use client';

import { useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Header, EditorSidebar, CanvasPreview } from '@/components';
import { useCanvasData } from '@/hooks';

export default function Home() {
  const canvasRef = useRef<HTMLDivElement>(null);

  const {
    data,
    setData,
    activeTab,
    setActiveTab,
    language,
    setLanguage,
    isSidebarOpen,
    setIsSidebarOpen,
    yamlText,
    downloading,
    setDownloading,
    isRTL,
    syncYamlFromData,
    handleSeed,
    handleYamlChange,
    addNote,
    updateNote,
    deleteNote,
  } = useCanvasData();

  // Sync YAML when data changes
  useEffect(() => {
    syncYamlFromData();
  }, [syncYamlFromData]);

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    setDownloading(true);
    try {
      // Brief delay to allow rendering
      await new Promise((r) => setTimeout(r, 100));
      const canvas = await html2canvas(canvasRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `EBMC-13-${data.meta.title.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Download failed', e);
      alert('Could not generate image. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 flex flex-col font-sans ${isRTL ? 'dir-rtl' : 'dir-ltr'}`}
    >
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onSeed={handleSeed}
        onDownload={handleDownload}
        downloading={downloading}
      />

      <main className='flex-1 flex flex-col lg:flex-row overflow-hidden h-[calc(100vh-64px)]'>
        <EditorSidebar
          data={data}
          setData={setData}
          activeTab={activeTab}
          yamlText={yamlText}
          onYamlChange={handleYamlChange}
          isRTL={isRTL}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          onAddNote={addNote}
          onUpdateNote={updateNote}
          onDeleteNote={deleteNote}
        />

        <CanvasPreview ref={canvasRef} data={data} isRTL={isRTL} />
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c7c7c7;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        .rtl-grid {
          direction: rtl;
        }
      `}</style>
    </div>
  );
}
