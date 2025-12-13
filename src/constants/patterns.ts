export const PATTERNS = [
  { label: 'None', value: 'none' },
  { label: 'Paper Fibers', value: 'paper-fibers' },
  { label: 'Cubes', value: 'cubes' },
  { label: 'Lined Paper', value: 'lined-paper' },
  { label: 'Bright Squares', value: 'bright-squares' },
  { label: 'Grid', value: 'grid' },
] as const;

export type PATTERN_TYPE = (typeof PATTERNS)[number]['value'];
