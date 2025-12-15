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
  title: 'The Actualization Canvas',
  description:
    'Visualize your strategic vision with an intuitive canvas. Supports sticky notes, YAML import/export, and PNG export.',
  keywords: ['actualization canvas', 'strategy canvas', 'startup', 'strategy', 'lean canvas'],
  authors: [{ name: 'The Actualization Canvas' }],
  openGraph: {
    title: 'The Actualization Canvas',
    description: 'Visualize your strategic vision with an intuitive canvas',
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
