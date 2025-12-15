export type NoteColor = 'yellow' | 'blue' | 'green' | 'pink' | 'red';

export interface CanvasFonts {
  canvasTitle: string;
  canvasCaption: string;
  blockTitle: string;
  noteTitle: string;
  noteBody: string;
}

export interface Note {
  id: string;
  title: string;
  body: string;
  color: NoteColor;
}

export interface BlockData {
  id: string;
  notes: Note[];
}

export interface CanvasMeta {
  title: string;
  caption: string;
  logoUrl: string;
  canvasSize: 'A4' | 'A3' | 'A2' | 'A1';
  backgroundPattern?: string;
  noteColumns?: number;
  advanced?: {
    exportScale?: number;
  };
  fonts?: CanvasFonts;
}

export interface CanvasData {
  meta: CanvasMeta;
  blocks: Record<string, BlockData>;
}

export type Language = 'en' | 'fa';
export type EditorTab = 'editor' | 'yaml';
