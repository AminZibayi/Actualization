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
      // Determine canvas configuration based on selected size
      // Default to A4 if not set or invalid
      // Aspect ratio for A-series landscape is sqrt(2) ≈ 1.414
      const sizeKey = (data.meta.canvasSize as 'A4' | 'A3' | 'A2' | 'A1') || 'A4';
      const config = {
        A4: { width: 1400 },
        A3: { width: 1980 },
        A2: { width: 2800 },
        A1: { width: 3960 },
      };

      const targetWidth = config[sizeKey]?.width || 1400;
      const targetHeight = targetWidth / 1.414; // A-series landscape ratio

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
        // This bypasses any object-fit or CORS issues
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

      // 4. Capture
      const canvas = await html2canvas(clone, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: '#ffffff',
        width: targetWidth,
        height: targetHeight,
        windowWidth: targetWidth,
        windowHeight: targetHeight,
        onclone: (_clonedDoc, clonedEl) => {
          // Replace logo with our pre-rendered version
          const clonedLogo = clonedEl.querySelector(
            'img[data-testid="canvas-logo"]'
          ) as HTMLImageElement;

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
