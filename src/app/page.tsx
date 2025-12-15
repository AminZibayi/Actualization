'use client';

import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { snapdom } from '@zumer/snapdom';
import { Header, EditorSidebar, CanvasPreview } from '@/components';
import { useCanvasData } from '@/hooks';

export default function Home() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const {
    data,
    setData,
    activeTab,
    setActiveTab,
    isSidebarOpen,
    setIsSidebarOpen,
    yamlText,
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
  } = useCanvasData();

  // Sync YAML when data changes
  useEffect(() => {
    syncYamlFromData();
  }, [syncYamlFromData]);

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    setDownloading(true);

    // Give the UI a moment to update the spinner
    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      // Determine canvas configuration based on selected size
      const sizeKey = (data.meta.canvasSize as 'A4' | 'A3' | 'A2' | 'A1') || 'A4';
      const config = {
        A4: { width: 1400 },
        A3: { width: 1980 },
        A2: { width: 2800 },
        A1: { width: 3960 },
      };

      const targetWidth = config[sizeKey]?.width || 1400;
      const targetHeight = targetWidth / 1.414; // A-series landscape ratio

      // Calculate a safe scale to prevent browser crashes/black screens on large canvases
      // We aim for a maximum width of around 4000px which offers great quality (4K)
      // without exhausting GPU memory.
      const MAX_SAFE_WIDTH = 4500;
      const scale = Math.min(2, MAX_SAFE_WIDTH / targetWidth);

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

      // 3. Reset transforms and enforce size on the clone
      clone.style.transform = 'none';
      clone.style.width = `${targetWidth}px`;
      clone.style.height = `${targetHeight}px`;

      // Capture original logo and convert to base64 for reliable export
      const originalLogo = element.querySelector(
        'img[data-testid="canvas-logo"]'
      ) as HTMLImageElement;

      let logoDataUrl = '';
      let logoWidth = 0;
      let logoHeight = 0;

      if (originalLogo && originalLogo.complete && originalLogo.naturalWidth > 0) {
        // Get the displayed dimensions
        logoHeight = originalLogo.clientHeight;
        const aspectRatio = originalLogo.naturalWidth / originalLogo.naturalHeight;
        logoWidth = logoHeight * aspectRatio;

        // Create a canvas to draw the image and get raw pixels
        try {
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = Math.round(logoWidth);
          tempCanvas.height = Math.round(logoHeight);
          const ctx = tempCanvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(originalLogo, 0, 0, tempCanvas.width, tempCanvas.height);
            logoDataUrl = tempCanvas.toDataURL('image/png');
          }
        } catch (err) {
          console.warn('Could not convert logo to data URL (CORS?)', err);
        }
      }

      // Pre-process the clone to handle the logo
      const clonedLogo = clone.querySelector('img[data-testid="canvas-logo"]') as HTMLImageElement;

      if (clonedLogo && logoWidth && logoHeight) {
        // Set explicit dimensions
        clonedLogo.style.width = `${Math.round(logoWidth)}px`;
        clonedLogo.style.height = `${Math.round(logoHeight)}px`;
        clonedLogo.style.objectFit = 'fill';
        clonedLogo.width = Math.round(logoWidth);
        clonedLogo.height = Math.round(logoHeight);

        // If we successfully created a data URL, use it
        if (logoDataUrl) {
          clonedLogo.src = logoDataUrl;
        }
      }

      // 4. Capture with SnapDOM
      const result = await snapdom(clone, {
        scale: scale,
        width: targetWidth,
        height: targetHeight,
        backgroundColor: '#ffffff',
      });

      // 5. Download
      const fileName = `actualization-canvas-${data.meta.title.replace(/\s+/g, '-')}`;
      await result.download({ filename: fileName, type: 'png' });

      // 6. Cleanup
      document.body.removeChild(container);
    } catch (e) {
      console.error('Download failed', e);
      alert(t('errors.downloadFailed'));
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
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onToggleLanguage={toggleLanguage}
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
