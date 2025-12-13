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
      // 1. Clone the node
      const element = canvasRef.current;
      const clone = element.cloneNode(true) as HTMLElement;

      // 2. Wrap it to ensure no outside layout interference
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.top = '-10000px';
      container.style.left = '-10000px';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.overflow = 'hidden';

      // Append clone to container
      container.appendChild(clone);
      document.body.appendChild(container);

      // 3. Reset transforms on the clone if necessary
      // If the ref was on the INNER element (inside the zoom wrapper),
      // we might not need to strip transforms if we cloned the right thing.
      // However, if we cloned a zoomed container, we need to reset it.
      // Based on CanvasPreview, ref is on the inner 1400px div.
      // So it should be fine, but let's ensure it's displayed at full size.
      clone.style.transform = 'none';
      clone.style.width = '1400px'; // Enforce original width
      clone.style.height = 'auto'; // Let height adapt or be fixed

      // Ensure specific aspect ratio or size if needed
      // The original has w-[1400px] aspect-[16/9]

      // Wait for images in clone to load? Usually data URIs or already loaded.

      // 4. Capture
      const canvas = await html2canvas(clone, {
        scale: 2, // High res
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 1400,
        height: 787.5, // 1400 * (9/16)
        windowWidth: 1400,
        windowHeight: 787.5,
        onclone: (_clonedDoc, _clonedEl) => {
          // Additional tweaks if needed inside the isolated document context
          // e.g. force show hidden elements
        },
      });

      // 5. Cleanup
      document.body.removeChild(container);

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
      className={`h-screen overflow-hidden bg-gray-50 flex flex-col font-sans ${isRTL ? 'dir-rtl' : 'dir-ltr'}`}
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

      <main className='flex-1 flex flex-col lg:flex-row overflow-hidden relative'>
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
