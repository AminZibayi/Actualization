'use client';

import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';

interface I18nProviderWrapperProps {
  children: React.ReactNode;
}

export const I18nProviderWrapper: React.FC<I18nProviderWrapperProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Ensure i18n is ready before rendering children
    if (i18n.isInitialized) {
      setIsInitialized(true);
    } else {
      i18n.on('initialized', () => {
        setIsInitialized(true);
      });
    }
  }, []);

  // Update document direction and font based on language
  useEffect(() => {
    const updateDirectionAndFont = () => {
      const isRTL = i18n.language === 'fa';
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = i18n.language;

      // Toggle font class on body for Persian UI
      if (isRTL) {
        document.body.classList.add('font-persian');
      } else {
        document.body.classList.remove('font-persian');
      }
    };

    updateDirectionAndFont();
    i18n.on('languageChanged', updateDirectionAndFont);

    return () => {
      i18n.off('languageChanged', updateDirectionAndFont);
    };
  }, []);

  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
