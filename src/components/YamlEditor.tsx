'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { YamlError } from '@/types';
import { AlertCircle, AlertTriangle, ChevronRight } from 'lucide-react';

interface YamlEditorProps {
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errors: YamlError[];
  isRTL: boolean;
}

export const YamlEditor: React.FC<YamlEditorProps> = ({ value, onChange, errors, isRTL }) => {
  const { t } = useTranslation();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Calculate line count
  const lineCount = useMemo(() => {
    return value.split('\n').length;
  }, [value]);

  // Lines with errors for highlighting
  const errorLines = useMemo(() => {
    const lines = new Map<number, YamlError>();
    for (const error of errors) {
      if (!lines.has(error.line) || error.severity === 'error') {
        lines.set(error.line, error);
      }
    }
    return lines;
  }, [errors]);

  // Sync scroll between textarea and line numbers
  useEffect(() => {
    const textarea = textAreaRef.current;
    const lineNumbers = lineNumbersRef.current;

    if (!textarea || !lineNumbers) return;

    const handleScroll = () => {
      lineNumbers.scrollTop = textarea.scrollTop;
    };

    textarea.addEventListener('scroll', handleScroll);
    return () => textarea.removeEventListener('scroll', handleScroll);
  }, []);

  // NOTE: Removed auto-resize logic - we want fixed height with scroll, not dynamic height

  // Scroll to error line
  const scrollToLine = (line: number) => {
    if (textAreaRef.current) {
      const lineHeight = 20; // Approximate line height in pixels
      textAreaRef.current.scrollTop = (line - 1) * lineHeight;

      // Focus and position cursor
      const lines = value.split('\n');
      let position = 0;
      for (let i = 0; i < line - 1 && i < lines.length; i++) {
        position += lines[i].length + 1;
      }
      textAreaRef.current.focus();
      textAreaRef.current.setSelectionRange(position, position + (lines[line - 1]?.length || 0));
    }
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

      {/* Editor area with line numbers */}
      <div className='flex flex-1 bg-gray-900 overflow-auto'>
        {/* Line numbers */}
        <div
          ref={lineNumbersRef}
          className='flex-shrink-0 bg-gray-800 text-gray-500 text-right select-none overflow-y-scroll overflow-x-hidden'
          style={{ width: '48px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {Array.from({ length: lineCount }, (_, i) => {
            const lineNum = i + 1;
            const error = errorLines.get(lineNum);
            return (
              <div
                key={lineNum}
                className={`px-2 leading-5 text-xs font-mono ${
                  error
                    ? error.severity === 'error'
                      ? 'bg-red-900/40 text-red-400'
                      : 'bg-amber-900/30 text-amber-400'
                    : ''
                }`}
                style={{ height: '20px' }}
              >
                {lineNum}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          ref={textAreaRef}
          className='flex-1 p-4 font-mono text-sm bg-gray-900 text-green-400 resize-none outline-none leading-5 h-full overflow-y-auto'
          value={value}
          onChange={onChange}
          spellCheck={false}
          dir='ltr'
          data-testid='yaml-editor'
          style={{ lineHeight: '20px' }}
        />
      </div>

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
