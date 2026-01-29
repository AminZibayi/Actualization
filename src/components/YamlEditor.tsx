'use client';

import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { YamlError } from '@/types';
import { AlertCircle, AlertTriangle, ChevronRight } from 'lucide-react';
import { EditorView, lineNumbers, ViewUpdate } from '@codemirror/view';
import { EditorState, StateEffect, StateField } from '@codemirror/state';
import { yaml } from '@codemirror/lang-yaml';
import { linter, Diagnostic } from '@codemirror/lint';
import { yamlEditorExtensions } from '@/styles/codemirror-theme';

interface YamlEditorProps {
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errors: YamlError[];
  isRTL: boolean;
}

// Custom line decoration for error highlighting
const errorLineEffect = StateEffect.define<{ line: number; severity: 'error' | 'warning' }>();
const errorLineField = StateField.define({
  create() {
    return [];
  },
  update(value, tr) {
    for (const effect of tr.effects) {
      if (effect.is(errorLineEffect)) {
        return [...value, effect.value];
      }
    }
    return value;
  },
});

export const YamlEditor: React.FC<YamlEditorProps> = ({ value, onChange, errors, isRTL }) => {
  const { t } = useTranslation();
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  // Convert YamlError[] to CodeMirror Diagnostic[]
  const errorsToLintDiagnostics = (yamlErrors: YamlError[]): Diagnostic[] => {
    return yamlErrors.map((error) => {
      const line = Math.max(0, error.line - 1); // Convert to 0-indexed

      return {
        from: 0, // Will be calculated properly below
        to: 0,
        severity: error.severity,
        message: error.message,
        renderMessage: () => {
          const div = document.createElement('div');
          div.className = 'text-xs';
          div.textContent = error.message;
          if (error.path) {
            const pathEl = document.createElement('div');
            pathEl.className = 'text-gray-500 font-mono text-xs mt-1';
            pathEl.textContent = error.path;
            div.appendChild(pathEl);
          }
          return div;
        },
      };
    });
  };

  // Initialize CodeMirror
  useEffect(() => {
    if (!editorRef.current || viewRef.current) return;

    const startState = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        EditorView.lineWrapping, // Enable line wrapping like VS Code
        yaml(),
        ...yamlEditorExtensions(),
        linter(() => errorsToLintDiagnostics(errors)),
        errorLineField,
        EditorView.updateListener.of((update: ViewUpdate) => {
          if (update.docChanged) {
            const newValue = update.state.doc.toString();
            // Create a synthetic event to match the onChange signature
            const syntheticEvent = {
              target: { value: newValue },
              currentTarget: { value: newValue },
            } as React.ChangeEvent<HTMLTextAreaElement>;
            onChange(syntheticEvent);
          }
        }),
        EditorView.theme({
          '&': { height: '100%' },
          '.cm-scroller': { overflow: 'auto', height: '100%' },
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  // Update document when value changes externally
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    const currentValue = view.state.doc.toString();
    if (currentValue !== value) {
      view.dispatch({
        changes: { from: 0, to: currentValue.length, insert: value },
      });
    }
  }, [value]);

  // Update linter when errors change
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    // Force linter update by dispatching a no-op transaction
    view.dispatch({
      effects: StateEffect.reconfigure.of([
        lineNumbers(),
        EditorView.lineWrapping,
        yaml(),
        ...yamlEditorExtensions(),
        linter(() => errorsToLintDiagnostics(errors)),
        errorLineField,
        EditorView.updateListener.of((update: ViewUpdate) => {
          if (update.docChanged) {
            const newValue = update.state.doc.toString();
            const syntheticEvent = {
              target: { value: newValue },
              currentTarget: { value: newValue },
            } as React.ChangeEvent<HTMLTextAreaElement>;
            onChange(syntheticEvent);
          }
        }),
        EditorView.theme({
          '&': { height: '100%' },
          '.cm-scroller': { overflow: 'auto', height: '100%' },
        }),
      ]),
    });
  }, [errors]);

  // Scroll to error line
  const scrollToLine = (line: number) => {
    const view = viewRef.current;
    if (!view) return;

    const pos = view.state.doc.line(line).from;
    view.dispatch({
      selection: { anchor: pos },
      effects: EditorView.scrollIntoView(pos, { y: 'center' }),
    });
    view.focus();
  };

  const errorCount = errors.filter((e) => e.severity === 'error').length;
  const warningCount = errors.filter((e) => e.severity === 'warning').length;

  return (
    <div className='flex flex-col h-full'>
      {/* Error summary bar */}
      {errors.length > 0 && (
        <div className='bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center gap-4 text-xs'>
          {errorCount > 0 && (
            <span className='flex items-center gap-1.5 text-red-400'>
              <AlertCircle size={14} />
              {errorCount} {errorCount === 1 ? t('yaml.error') : t('yaml.errors')}
            </span>
          )}
          {warningCount > 0 && (
            <span className='flex items-center gap-1.5 text-amber-400'>
              <AlertTriangle size={14} />
              {warningCount} {warningCount === 1 ? t('yaml.warning') : t('yaml.warnings')}
            </span>
          )}
        </div>
      )}

      {/* CodeMirror Editor */}
      <div ref={editorRef} className='flex-1 bg-gray-900 overflow-hidden' />

      {/* Error details panel */}
      {errors.length > 0 && (
        <div className='bg-gray-800 border-t border-gray-700 max-h-48 overflow-y-auto'>
          <div className='px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-700'>
            {t('yaml.problems')}
          </div>
          <div className='divide-y divide-gray-700/50'>
            {errors.map((error, index) => (
              <button
                key={index}
                onClick={() => scrollToLine(error.line)}
                className={`w-full px-3 py-2 flex items-start gap-2 text-left hover:bg-gray-700/50 transition-colors ${
                  isRTL ? 'flex-row-reverse text-right' : ''
                }`}
              >
                {error.severity === 'error' ? (
                  <AlertCircle size={14} className='text-red-400 mt-0.5 flex-shrink-0' />
                ) : (
                  <AlertTriangle size={14} className='text-amber-400 mt-0.5 flex-shrink-0' />
                )}
                <div className='flex-1 min-w-0'>
                  <p
                    className={`text-xs ${
                      error.severity === 'error' ? 'text-red-300' : 'text-amber-300'
                    }`}
                  >
                    {error.message}
                  </p>
                  {error.path && (
                    <p className='text-xs text-gray-500 mt-0.5 font-mono truncate'>{error.path}</p>
                  )}
                </div>
                <span className='text-xs text-gray-500 flex-shrink-0'>
                  {t('yaml.line')} {error.line}
                </span>
                <ChevronRight size={12} className='text-gray-600 flex-shrink-0 mt-0.5' />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
