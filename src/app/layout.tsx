import type { Metadata } from 'next';
import { Inter, Gloria_Hallelujah, Vazirmatn } from 'next/font/google';
import './globals.css';
import { I18nProviderWrapper } from '@/components';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const gloria = Gloria_Hallelujah({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-gloria',
  display: 'swap',
});

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EBMC-13 Generator | Extended Business Model Canvas',
  description:
    'Generate extended business model canvas with 13 blocks. Supports sticky notes, YAML import/export, and PNG export.',
  keywords: ['business model canvas', 'EBMC', 'startup', 'strategy', 'lean canvas'],
  authors: [{ name: 'EBMC Generator' }],
  openGraph: {
    title: 'EBMC-13 Generator',
    description: 'Extended Business Model Canvas Generator with 13 blocks',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} ${gloria.variable} ${vazirmatn.variable} antialiased`}>
        <I18nProviderWrapper>{children}</I18nProviderWrapper>
      </body>
    </html>
  );
}
