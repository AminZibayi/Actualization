export type NoteColor = 'yellow' | 'blue' | 'green' | 'pink' | 'red';

export interface Note {
  id: string;
  title: string;
  body: string;
  color: NoteColor;
}

export interface BlockData {
  id: string;
  titleEn: string;
  titleFa: string;
  notes: Note[];
}

export interface CanvasMeta {
  title: string;
  caption: string;
  logoUrl: string;
  canvasSize: 'A4' | 'A3' | 'A2' | 'A1';
  backgroundPattern?: string;
}

export interface CanvasData {
  meta: CanvasMeta;
  blocks: Record<string, BlockData>;
}

export type Language = 'en' | 'fa';
export type EditorTab = 'editor' | 'yaml';
