import { useEffect } from 'react';
import { CanvasFonts, CanvasData } from '@/types';

// Cache to keep track of loaded fonts to avoid duplicate requests
const loadedFonts = new Set<string>();

export const useGoogleFonts = (data: CanvasData) => {
  useEffect(() => {
    if (!data.meta.fonts) return;

    const fontsToLoad = new Set<string>();

    // Collect all unique fonts from the config
    Object.values(data.meta.fonts).forEach((fontName) => {
      // Basic validation to ensure it's a valid font name and not already loaded/default safe fonts
      if (fontName && !loadedFonts.has(fontName)) {
        fontsToLoad.add(fontName);
      }
    });

    if (fontsToLoad.size === 0) return;

    // Construct the Google Fonts URL
    // Format: https://fonts.googleapis.com/css2?family=Font1:wght@400;700&family=Font2&display=swap
    const families = Array.from(fontsToLoad)
      .map((font) => `family=${font.replace(/ /g, '+')}:wght@400;700`)
      .join('&');

    const linkId = 'ebmc-google-fonts';
    const url = `https://fonts.googleapis.com/css2?${families}&display=swap`;

    // Check if we already have a link tag, if so, we might need to append to it or replace it
    // For simplicity, we'll append a new one for new batches, or update the existing one
    // NOTE: To avoid complex state, we just append a new link tag for the current session's requested fonts.
    // A more robust solution would manage a single link tag, but that requires diffing.
    // Let's use a simpler approach: Append if not exists.

    // Actually, appending multiple link tags for Google fonts is fine.

    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    link.dataset.testid = 'google-fonts-link';

    document.head.appendChild(link);

    // Mark as loaded
    fontsToLoad.forEach((f) => loadedFonts.add(f));

    return () => {
      // We don't remove fonts on cleanup to prevent flash of unstyled text if we switch back
      // The browser cache handles it well.
    };
  }, [
    // Depend on specific font values to trigger updates
    data.meta.fonts?.canvasTitle,
    data.meta.fonts?.canvasCaption,
    data.meta.fonts?.blockTitle,
    data.meta.fonts?.noteTitle,
    data.meta.fonts?.noteBody,
  ]);
};
