import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

// Dark theme matching the current YAML editor design
export const yamlEditorTheme = EditorView.theme(
  {
    '&': {
      color: '#4ade80', // text-green-400
      backgroundColor: '#111827', // bg-gray-900
      fontSize: '14px',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    '.cm-content': {
      caretColor: '#4ade80',
      padding: '16px',
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: '#4ade80',
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
      backgroundColor: '#374151', // gray-700
    },
    '.cm-activeLine': {
      backgroundColor: '#1f2937', // bg-gray-800
    },
    '.cm-gutters': {
      backgroundColor: '#1f2937', // bg-gray-800
      color: '#6b7280', // text-gray-500
      border: 'none',
      paddingRight: '8px',
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#1f2937',
      color: '#9ca3af', // text-gray-400
    },
    '.cm-lineNumbers .cm-gutterElement': {
      padding: '0 8px 0 0',
      minWidth: '32px',
      textAlign: 'right',
      fontSize: '12px',
    },
    // Error line highlighting
    '.cm-line-error': {
      backgroundColor: 'rgba(127, 29, 29, 0.25)', // red-900/25
    },
    '.cm-line-warning': {
      backgroundColor: 'rgba(120, 53, 15, 0.2)', // amber-900/20
    },
    // Lint gutter markers
    '.cm-lintRange-error': {
      backgroundImage: 'none',
      textDecoration: 'underline wavy #ef4444', // red-500
    },
    '.cm-lintRange-warning': {
      backgroundImage: 'none',
      textDecoration: 'underline wavy #f59e0b', // amber-500
    },
    '.cm-diagnostic': {
      padding: '2px 4px',
    },
    '.cm-diagnostic-error': {
      borderLeft: '3px solid #ef4444', // red-500
    },
    '.cm-diagnostic-warning': {
      borderLeft: '3px solid #f59e0b', // amber-500
    },
  },
  { dark: true }
);

// Syntax highlighting for YAML
export const yamlHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: '#60a5fa' }, // blue-400
  { tag: t.string, color: '#4ade80' }, // green-400
  { tag: t.number, color: '#fbbf24' }, // amber-400
  { tag: t.bool, color: '#f472b6' }, // pink-400
  { tag: t.null, color: '#9ca3af' }, // gray-400
  { tag: t.comment, color: '#6b7280', fontStyle: 'italic' }, // gray-500
  { tag: t.propertyName, color: '#60a5fa' }, // blue-400
  { tag: t.operator, color: '#9ca3af' }, // gray-400
  { tag: t.punctuation, color: '#9ca3af' }, // gray-400
]);

export function yamlEditorExtensions(): Extension[] {
  return [yamlEditorTheme, syntaxHighlighting(yamlHighlightStyle)];
}
