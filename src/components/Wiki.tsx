'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Search, ChevronDown, ChevronUp, Copy, Check, BookOpen } from 'lucide-react';

interface WikiProps {
  isOpen: boolean;
  onClose: () => void;
  isRTL: boolean;
}

interface AccordionState {
  [key: string]: boolean;
}

const STORAGE_KEY = 'actualization-wiki-accordion-state';

export const Wiki: React.FC<WikiProps> = ({ isOpen, onClose, isRTL }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [accordionState, setAccordionState] = useState<AccordionState>({});
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Load accordion state from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setAccordionState(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to load accordion state', e);
        }
      }
    }
  }, []);

  // Save accordion state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && Object.keys(accordionState).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(accordionState));
    }
  }, [accordionState]);

  // Handle Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const toggleAccordion = useCallback((key: string) => {
    setAccordionState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const copyToClipboard = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  // YAML examples - memoized to avoid recreating on every render
  const yamlExamples = useMemo(
    () => ({
      meta: `meta:
  title: "My Startup"
  caption: "Innovating the Future"
  canvasSize: "A4"
  noteColumns: 2
  logo:
    type: "url"
    value: "https://example.com/logo.png"
  advanced:
    exportScale: 2`,
      block: `blocks:
  - id: "problem"
    title: "Problem"
    color: "#f59e0b"
    notes:
      - title: "High Costs"
        body: "Existing solutions are too expensive"
      - title: "Poor UX"
        body: "Current tools are hard to use"`,
      complete: `meta:
  title: "The Actualization"
  caption: "Business Model Canvas"
  canvasSize: "A4"
  noteColumns: 2

blocks:
  - id: "problem"
    title: "Problem"
    color: "#f59e0b"
    notes:
      - title: "Problem 1"
        body: "Description"
  - id: "solution"
    title: "Solution"
    color: "#10b981"
    notes:
      - title: "Our Solution"
        body: "How we solve it"`,
    }),
    []
  );

  // Content sections
  const sections = useMemo(
    () => [
      {
        id: 'yamlSchema',
        title: t('wiki.sections.yamlSchema'),
        content: (
          <div className='space-y-4'>
            <p className='text-gray-700'>{t('wiki.yamlSchema.intro')}</p>

            <div className='space-y-3'>
              <h4 className='font-bold text-gray-800'>{t('wiki.yamlSchema.metaTitle')}</h4>
              <p className='text-sm text-gray-600'>{t('wiki.yamlSchema.metaDesc')}</p>
              <CodeBlock
                code={yamlExamples.meta}
                onCopy={() => copyToClipboard(yamlExamples.meta, 'meta')}
                copied={copiedCode === 'meta'}
              />
            </div>

            <div className='space-y-3'>
              <h4 className='font-bold text-gray-800'>{t('wiki.yamlSchema.blocksTitle')}</h4>
              <p className='text-sm text-gray-600'>{t('wiki.yamlSchema.blocksDesc')}</p>
              <CodeBlock
                code={yamlExamples.block}
                onCopy={() => copyToClipboard(yamlExamples.block, 'block')}
                copied={copiedCode === 'block'}
              />
            </div>

            <div className='space-y-3'>
              <h4 className='font-bold text-gray-800'>{t('wiki.yamlSchema.exampleTitle')}</h4>
              <CodeBlock
                code={yamlExamples.complete}
                onCopy={() => copyToClipboard(yamlExamples.complete, 'complete')}
                copied={copiedCode === 'complete'}
              />
            </div>
          </div>
        ),
      },
      {
        id: 'canvasGuide',
        title: t('wiki.sections.canvasGuide'),
        content: (
          <div className='space-y-4'>
            <p className='text-gray-700'>{t('wiki.canvasGuide.intro')}</p>

            <div className='space-y-3'>
              <h4 className='font-bold text-gray-800'>{t('wiki.canvasGuide.whatIs')}</h4>
              <p className='text-sm text-gray-600'>{t('wiki.canvasGuide.whatIsDesc')}</p>
            </div>

            <div className='space-y-3'>
              <h4 className='font-bold text-gray-800'>{t('wiki.canvasGuide.howToUse')}</h4>
              <ol className='list-decimal list-inside space-y-2 text-sm text-gray-600'>
                <li>{t('wiki.canvasGuide.step1')}</li>
                <li>{t('wiki.canvasGuide.step2')}</li>
                <li>{t('wiki.canvasGuide.step3')}</li>
                <li>{t('wiki.canvasGuide.step4')}</li>
              </ol>
            </div>

            <div className='space-y-3'>
              <h4 className='font-bold text-gray-800'>{t('wiki.canvasGuide.blocks')}</h4>
              <ul className='list-disc list-inside space-y-2 text-sm text-gray-600'>
                <li>{t('wiki.canvasGuide.blocksProblem')}</li>
                <li>{t('wiki.canvasGuide.blocksSolution')}</li>
                <li>{t('wiki.canvasGuide.blocksCustomers')}</li>
                <li>{t('wiki.canvasGuide.blocksChannels')}</li>
                <li>{t('wiki.canvasGuide.blocksRevenue')}</li>
                <li>{t('wiki.canvasGuide.blocksCost')}</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: 'softwareGuide',
        title: t('wiki.sections.softwareGuide'),
        content: (
          <div className='space-y-4'>
            <p className='text-gray-700'>{t('wiki.softwareGuide.intro')}</p>

            <div className='space-y-3'>
              <h4 className='font-bold text-gray-800'>{t('wiki.softwareGuide.navigation')}</h4>
              <p className='text-sm text-gray-600'>{t('wiki.softwareGuide.navDesc')}</p>
            </div>

            <div className='space-y-3'>
              <h4 className='font-bold text-gray-800'>{t('wiki.softwareGuide.editing')}</h4>
              <p className='text-sm text-gray-600'>{t('wiki.softwareGuide.editGuiDesc')}</p>
              <p className='text-sm text-gray-600'>{t('wiki.softwareGuide.editYamlDesc')}</p>
            </div>

            <div className='space-y-3'>
              <h4 className='font-bold text-gray-800'>{t('wiki.softwareGuide.exporting')}</h4>
              <p className='text-sm text-gray-600'>{t('wiki.softwareGuide.exportDesc')}</p>
            </div>

            <div className='space-y-3'>
              <h4 className='font-bold text-gray-800'>{t('wiki.softwareGuide.keyboard')}</h4>
              <ul className='list-disc list-inside space-y-2 text-sm text-gray-600'>
                <li>{t('wiki.softwareGuide.keyboardTab')}</li>
                <li>{t('wiki.softwareGuide.keyboardEnter')}</li>
                <li>{t('wiki.softwareGuide.keyboardEsc')}</li>
                <li>{t('wiki.softwareGuide.keyboardCtrlS')}</li>
              </ul>
            </div>

            <div className='space-y-3'>
              <h4 className='font-bold text-gray-800'>{t('wiki.softwareGuide.tips')}</h4>
              <ul className='list-disc list-inside space-y-2 text-sm text-gray-600'>
                <li>{t('wiki.softwareGuide.tip1')}</li>
                <li>{t('wiki.softwareGuide.tip2')}</li>
                <li>{t('wiki.softwareGuide.tip3')}</li>
                <li>{t('wiki.softwareGuide.tip4')}</li>
                <li>{t('wiki.softwareGuide.tip5')}</li>
              </ul>
            </div>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, copiedCode, copyToClipboard, yamlExamples]
  );

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;

    const query = searchQuery.toLowerCase();
    return sections.filter((section) => {
      // Search in section title and ID
      const titleMatch = section.title.toLowerCase().includes(query);
      const idMatch = section.id.toLowerCase().includes(query);
      return titleMatch || idMatch;
    });
  }, [searchQuery, sections]);

  // Highlight search matches in text
  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;

    // Escape special regex characters
    const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const query = escapeRegex(searchQuery.trim());
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchQuery.trim().toLowerCase() ? (
            <mark key={i} className='bg-yellow-200 px-1 rounded'>
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-labelledby='wiki-title'
    >
      <div
        className={`glass-card w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col animate-slide-down ${
          isRTL ? 'dir-rtl' : 'dir-ltr'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200/50'>
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600'>
              <BookOpen className='h-5 w-5 text-white' />
            </div>
            <h2 id='wiki-title' className='text-2xl font-bold text-gray-800'>
              {t('wiki.title')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className='p-2 rounded-lg hover:bg-gray-100 transition-colors'
            aria-label={t('wiki.close')}
          >
            <X className='h-5 w-5 text-gray-600' />
          </button>
        </div>

        {/* Search Bar */}
        <div className='p-6 pb-4 border-b border-gray-200/50'>
          <div className='relative'>
            <Search
              className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`}
            />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('wiki.search')}
              className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              aria-label={t('wiki.search')}
            />
          </div>
          {searchQuery && (
            <p className='mt-2 text-sm text-gray-600'>
              {filteredSections.length > 0
                ? t('wiki.searchResultsCount', { count: filteredSections.length })
                : t('wiki.noResults')}
            </p>
          )}
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto custom-scrollbar p-6'>
          {filteredSections.length === 0 ? (
            <div className='text-center py-12'>
              <p className='text-gray-500'>{t('wiki.noResults')}</p>
            </div>
          ) : (
            <div className='space-y-4'>
              {filteredSections.map((section) => (
                <AccordionSection
                  key={section.id}
                  id={section.id}
                  title={highlightText(section.title)}
                  isOpen={accordionState[section.id] ?? false}
                  onToggle={() => toggleAccordion(section.id)}
                  isRTL={isRTL}
                >
                  {section.content}
                </AccordionSection>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Accordion Section Component
interface AccordionSectionProps {
  id: string;
  title: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isRTL: boolean;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  id,
  title,
  isOpen,
  onToggle,
  children,
  isRTL,
}) => {
  return (
    <div className='border border-gray-200 rounded-lg overflow-hidden'>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-100/50 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
        aria-expanded={isOpen}
        aria-controls={`accordion-${id}`}
      >
        <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
        {isOpen ? (
          <ChevronUp className='h-5 w-5 text-gray-600 flex-shrink-0' />
        ) : (
          <ChevronDown className='h-5 w-5 text-gray-600 flex-shrink-0' />
        )}
      </button>
      {isOpen && (
        <div id={`accordion-${id}`} className='p-4 bg-white' role='region'>
          {children}
        </div>
      )}
    </div>
  );
};

// Code Block Component with Syntax Highlighting
interface CodeBlockProps {
  code: string;
  onCopy: () => void;
  copied: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, onCopy, copied }) => {
  const { t } = useTranslation();

  // Simple YAML syntax highlighting
  const highlightYAML = (code: string) => {
    const lines = code.split('\n');
    return lines.map((line, i) => {
      let highlighted = line;

      // Comments
      if (line.trim().startsWith('#')) {
        return (
          <div key={i} className='text-gray-500'>
            {line}
          </div>
        );
      }

      // Keys (before colon)
      highlighted = line.replace(
        /^(\s*)([a-zA-Z_][a-zA-Z0-9_]*)(:)/g,
        (match, indent, key, colon) => {
          return `${indent}<span class="text-indigo-600 font-semibold">${key}</span>${colon}`;
        }
      );

      // String values (quoted)
      highlighted = highlighted.replace(/(".*?"|'.*?')/g, '<span class="text-green-600">$1</span>');

      // Numbers
      highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="text-orange-500">$1</span>');

      // Booleans
      highlighted = highlighted.replace(
        /\b(true|false|yes|no|null)\b/g,
        '<span class="text-purple-600">$1</span>'
      );

      // List items
      highlighted = highlighted.replace(/^(\s*-\s)/g, '<span class="text-gray-600">$1</span>');

      return <div key={i} dangerouslySetInnerHTML={{ __html: highlighted }} />;
    });
  };

  return (
    <div className='relative group'>
      <pre className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono'>
        <code>{highlightYAML(code)}</code>
      </pre>
      <button
        onClick={onCopy}
        className='absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2'
        aria-label={copied ? t('wiki.copied') : t('wiki.copy')}
      >
        {copied ? (
          <>
            <Check className='h-4 w-4' />
            <span className='text-xs'>{t('wiki.copied')}</span>
          </>
        ) : (
          <>
            <Copy className='h-4 w-4' />
            <span className='text-xs'>{t('wiki.copy')}</span>
          </>
        )}
      </button>
    </div>
  );
};
