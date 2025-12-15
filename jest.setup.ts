import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock @zumer/snapdom
jest.mock('@zumer/snapdom', () => ({
  snapdom: jest.fn().mockResolvedValue({
    download: jest.fn().mockResolvedValue(undefined),
    toPng: jest.fn().mockResolvedValue(document.createElement('img')),
  }),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
      dir: jest.fn(() => 'ltr'),
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

// Mock js-yaml
jest.mock('js-yaml', () => ({
  dump: jest.fn((obj) => JSON.stringify(obj)),
  load: jest.fn((str) => JSON.parse(str)),
}));
