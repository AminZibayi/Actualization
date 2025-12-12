import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/constants/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        handwritten: ['var(--font-gloria)', 'cursive'],
        persian: ['var(--font-vazirmatn)', 'sans-serif'],
      },
      colors: {
        note: {
          yellow: '#fef3c7',
          blue: '#dbeafe',
          green: '#dcfce7',
          pink: '#fce7f3',
          red: '#fee2e2',
        },
      },
    },
  },
  plugins: [],
};
export default config;
