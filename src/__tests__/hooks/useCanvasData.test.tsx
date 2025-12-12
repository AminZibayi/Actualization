import { renderHook, act } from '@testing-library/react';
import { useCanvasData } from '@/hooks/useCanvasData';
import { DEFAULT_DATA, SEED_DATA } from '@/constants';

// Mock window.confirm
const mockConfirm = jest.fn(() => true);
global.confirm = mockConfirm;

describe('useCanvasData', () => {
  beforeEach(() => {
    mockConfirm.mockClear();
  });

  describe('initial state', () => {
    it('initializes with default data', () => {
      const { result } = renderHook(() => useCanvasData());
      expect(result.current.data.meta.title).toBe(DEFAULT_DATA.meta.title);
    });

    it('initializes with editor tab active', () => {
      const { result } = renderHook(() => useCanvasData());
      expect(result.current.activeTab).toBe('editor');
    });

    it('initializes with English language', () => {
      const { result } = renderHook(() => useCanvasData());
      expect(result.current.language).toBe('en');
    });

    it('initializes with sidebar open', () => {
      const { result } = renderHook(() => useCanvasData());
      expect(result.current.isSidebarOpen).toBe(true);
    });

    it('isRTL is false for English', () => {
      const { result } = renderHook(() => useCanvasData());
      expect(result.current.isRTL).toBe(false);
    });
  });

  describe('handleSeed', () => {
    it('replaces data with seed data when confirmed', () => {
      mockConfirm.mockReturnValue(true);
      const { result } = renderHook(() => useCanvasData());

      act(() => {
        result.current.handleSeed();
      });

      expect(result.current.data.meta.title).toBe(SEED_DATA.meta.title);
    });

    it('does not replace data when cancelled', () => {
      mockConfirm.mockReturnValue(false);
      const { result } = renderHook(() => useCanvasData());
      const originalTitle = result.current.data.meta.title;

      act(() => {
        result.current.handleSeed();
      });

      expect(result.current.data.meta.title).toBe(originalTitle);
    });
  });

  describe('addNote', () => {
    it('adds a new note to the specified block', () => {
      const { result } = renderHook(() => useCanvasData());
      const initialNoteCount = result.current.data.blocks.solution.notes.length;

      act(() => {
        result.current.addNote('solution');
      });

      expect(result.current.data.blocks.solution.notes.length).toBe(initialNoteCount + 1);
    });

    it('creates note with default title for English', () => {
      const { result } = renderHook(() => useCanvasData());

      act(() => {
        result.current.addNote('solution');
      });

      const newNote =
        result.current.data.blocks.solution.notes[
          result.current.data.blocks.solution.notes.length - 1
        ];
      expect(newNote.title).toBe('New Note');
    });

    it('creates note with default yellow color', () => {
      const { result } = renderHook(() => useCanvasData());

      act(() => {
        result.current.addNote('solution');
      });

      const newNote =
        result.current.data.blocks.solution.notes[
          result.current.data.blocks.solution.notes.length - 1
        ];
      expect(newNote.color).toBe('yellow');
    });
  });

  describe('updateNote', () => {
    it('updates note title', () => {
      const { result } = renderHook(() => useCanvasData());
      const noteId = result.current.data.blocks.problem.notes[0].id;

      act(() => {
        result.current.updateNote('problem', noteId, 'title', 'Updated Title');
      });

      expect(result.current.data.blocks.problem.notes[0].title).toBe('Updated Title');
    });

    it('updates note body', () => {
      const { result } = renderHook(() => useCanvasData());
      const noteId = result.current.data.blocks.problem.notes[0].id;

      act(() => {
        result.current.updateNote('problem', noteId, 'body', 'Updated Body');
      });

      expect(result.current.data.blocks.problem.notes[0].body).toBe('Updated Body');
    });

    it('updates note color', () => {
      const { result } = renderHook(() => useCanvasData());
      const noteId = result.current.data.blocks.problem.notes[0].id;

      act(() => {
        result.current.updateNote('problem', noteId, 'color', 'blue');
      });

      expect(result.current.data.blocks.problem.notes[0].color).toBe('blue');
    });
  });

  describe('deleteNote', () => {
    it('removes note from the block', () => {
      const { result } = renderHook(() => useCanvasData());
      const noteId = result.current.data.blocks.problem.notes[0].id;
      const initialCount = result.current.data.blocks.problem.notes.length;

      act(() => {
        result.current.deleteNote('problem', noteId);
      });

      expect(result.current.data.blocks.problem.notes.length).toBe(initialCount - 1);
    });

    it('removes the correct note', () => {
      const { result } = renderHook(() => useCanvasData());
      const noteId = result.current.data.blocks.problem.notes[0].id;

      act(() => {
        result.current.deleteNote('problem', noteId);
      });

      const foundNote = result.current.data.blocks.problem.notes.find((n) => n.id === noteId);
      expect(foundNote).toBeUndefined();
    });
  });

  describe('language toggle', () => {
    it('toggles isRTL when language changes to Persian', () => {
      const { result } = renderHook(() => useCanvasData());

      act(() => {
        result.current.setLanguage('fa');
      });

      expect(result.current.isRTL).toBe(true);
    });
  });
});
