import { CanvasData } from './canvas';

export type YamlErrorSeverity = 'error' | 'warning';

export interface YamlError {
  line: number;
  column?: number;
  message: string;
  severity: YamlErrorSeverity;
  path?: string; // e.g., "blocks.problem[0].color"
}

export interface YamlParseResult {
  success: boolean;
  data: CanvasData | null;
  errors: YamlError[];
}
