export interface GoogleFont {
  label: string;
  value: string;
  category: 'sans-serif' | 'serif' | 'display' | 'handwriting' | 'monospace';
}

export const GOOGLE_FONTS: GoogleFont[] = [
  // Sans Serif
  { label: 'Inter', value: 'Inter', category: 'sans-serif' },
  { label: 'Roboto', value: 'Roboto', category: 'sans-serif' },
  { label: 'Open Sans', value: 'Open Sans', category: 'sans-serif' },
  { label: 'Lato', value: 'Lato', category: 'sans-serif' },
  { label: 'Montserrat', value: 'Montserrat', category: 'sans-serif' },
  { label: 'Oswald', value: 'Oswald', category: 'sans-serif' },
  { label: 'Raleway', value: 'Raleway', category: 'sans-serif' },
  { label: 'Nunito', value: 'Nunito', category: 'sans-serif' },
  { label: 'Poppins', value: 'Poppins', category: 'sans-serif' },
  { label: 'Quicksand', value: 'Quicksand', category: 'sans-serif' },

  // Serif
  { label: 'Roboto Slab', value: 'Roboto Slab', category: 'serif' },
  { label: 'Merriweather', value: 'Merriweather', category: 'serif' },
  { label: 'Playfair Display', value: 'Playfair Display', category: 'serif' },
  { label: 'Lora', value: 'Lora', category: 'serif' },
  { label: 'PT Serif', value: 'PT Serif', category: 'serif' },
  { label: 'Bitter', value: 'Bitter', category: 'serif' },
  { label: 'Arvo', value: 'Arvo', category: 'serif' },
  { label: 'Zilla Slab', value: 'Zilla Slab', category: 'serif' },

  // Display
  { label: 'Bebas Neue', value: 'Bebas Neue', category: 'display' },
  { label: 'Abril Fatface', value: 'Abril Fatface', category: 'display' },
  { label: 'Lobster', value: 'Lobster', category: 'display' },
  { label: 'Comfortaa', value: 'Comfortaa', category: 'display' },
  { label: 'Righteous', value: 'Righteous', category: 'display' },
  { label: 'Fredoka One', value: 'Fredoka One', category: 'display' },
  { label: 'Patua One', value: 'Patua One', category: 'display' },
  { label: 'Alfa Slab One', value: 'Alfa Slab One', category: 'display' },
  { label: 'Audiowide', value: 'Audiowide', category: 'display' },
  { label: 'Bangers', value: 'Bangers', category: 'display' },
  { label: 'Unica One', value: 'Unica One', category: 'display' },
  { label: 'Special Elite', value: 'Special Elite', category: 'display' },
  { label: 'Monoton', value: 'Monoton', category: 'display' },
  { label: 'Creepster', value: 'Creepster', category: 'display' },
  { label: 'Rye', value: 'Rye', category: 'display' },

  // Handwriting
  { label: 'Gloria Hallelujah', value: 'Gloria Hallelujah', category: 'handwriting' },
  { label: 'Pacifico', value: 'Pacifico', category: 'handwriting' },
  { label: 'Dancing Script', value: 'Dancing Script', category: 'handwriting' },
  { label: 'Indie Flower', value: 'Indie Flower', category: 'handwriting' },
  { label: 'Shadows Into Light', value: 'Shadows Into Light', category: 'handwriting' },
  { label: 'Amatic SC', value: 'Amatic SC', category: 'handwriting' },
  { label: 'Caveat', value: 'Caveat', category: 'handwriting' },
  { label: 'Satisfy', value: 'Satisfy', category: 'handwriting' },
  { label: 'Courgette', value: 'Courgette', category: 'handwriting' },
  { label: 'Permanent Marker', value: 'Permanent Marker', category: 'handwriting' },
  { label: 'Covered By Your Grace', value: 'Covered By Your Grace', category: 'handwriting' },
  { label: 'Kalam', value: 'Kalam', category: 'handwriting' },
  { label: 'Handlee', value: 'Handlee', category: 'handwriting' },
  { label: 'Patrick Hand', value: 'Patrick Hand', category: 'handwriting' },
  { label: 'Architects Daughter', value: 'Architects Daughter', category: 'handwriting' },
  { label: 'Coming Soon', value: 'Coming Soon', category: 'handwriting' },
  { label: 'Reenie Beanie', value: 'Reenie Beanie', category: 'handwriting' },
  { label: 'Nothing You Could Do', value: 'Nothing You Could Do', category: 'handwriting' },
  { label: 'Rock Salt', value: 'Rock Salt', category: 'handwriting' },

  // Monospace
  { label: 'Roboto Mono', value: 'Roboto Mono', category: 'monospace' },
  { label: 'Space Mono', value: 'Space Mono', category: 'monospace' },
  { label: 'VT323', value: 'VT323', category: 'monospace' },
  { label: 'Cutive Mono', value: 'Cutive Mono', category: 'monospace' },
  { label: 'Fira Code', value: 'Fira Code', category: 'monospace' },
  { label: 'Inconsolata', value: 'Inconsolata', category: 'monospace' },
  { label: 'Source Code Pro', value: 'Source Code Pro', category: 'monospace' },
  { label: 'IBM Plex Mono', value: 'IBM Plex Mono', category: 'monospace' },
  { label: 'Nanum Gothic Coding', value: 'Nanum Gothic Coding', category: 'monospace' },
  { label: 'Anonymous Pro', value: 'Anonymous Pro', category: 'monospace' },
];

export const DEFAULT_FONTS = {
  canvasTitle: 'Inter',
  canvasCaption: 'Inter',
  blockTitle: 'Inter',
  noteTitle: 'Gloria Hallelujah',
  noteBody: 'Inter',
};
