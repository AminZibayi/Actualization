import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { StickyNoteCard } from '@/components/StickyNoteCard';
import { Note } from '@/types';

// Mock getRandomRotation to return consistent value for tests
jest.mock('@/utils', () => ({
  ...jest.requireActual('@/utils'),
  getRandomRotation: jest.fn(() => 0),
}));

describe('StickyNoteCard', () => {
  const mockNote: Note = {
    id: 'test-1',
    title: 'Test Title',
    body: 'Test Body Content',
    color: 'yellow',
  };

  it('renders note title', () => {
    render(<StickyNoteCard note={mockNote} isRTL={false} />);
    expect(screen.getByTestId('note-title')).toHaveTextContent('Test Title');
  });

  it('renders note body', () => {
    render(<StickyNoteCard note={mockNote} isRTL={false} />);
    expect(screen.getByTestId('note-body')).toHaveTextContent('Test Body Content');
  });

  it('applies yellow color classes by default', () => {
    render(<StickyNoteCard note={mockNote} isRTL={false} />);
    const card = screen.getByTestId('sticky-note');
    expect(card).toHaveClass('bg-yellow-100');
  });

  it('applies blue color classes for blue notes', () => {
    const blueNote = { ...mockNote, color: 'blue' as const };
    render(<StickyNoteCard note={blueNote} isRTL={false} />);
    const card = screen.getByTestId('sticky-note');
    expect(card).toHaveClass('bg-blue-100');
  });

  it('shows delete button when onDelete is provided', () => {
    const onDelete = jest.fn();
    render(<StickyNoteCard note={mockNote} isRTL={false} onDelete={onDelete} />);
    expect(screen.getByTestId('delete-note-btn')).toBeInTheDocument();
  });

  it('does not show delete button when onDelete is not provided', () => {
    render(<StickyNoteCard note={mockNote} isRTL={false} />);
    expect(screen.queryByTestId('delete-note-btn')).not.toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = jest.fn();
    render(<StickyNoteCard note={mockNote} isRTL={false} onDelete={onDelete} />);
    fireEvent.click(screen.getByTestId('delete-note-btn'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('applies RTL font family when isRTL is true', () => {
    render(<StickyNoteCard note={mockNote} isRTL={true} />);
    const card = screen.getByTestId('sticky-note');
    const style = card.getAttribute('style');
    expect(style).toContain('Vazirmatn');
  });

  it('applies LTR font family when isRTL is false', () => {
    render(<StickyNoteCard note={mockNote} isRTL={false} />);
    const card = screen.getByTestId('sticky-note');
    const style = card.getAttribute('style');
    expect(style).toContain('Gloria Hallelujah');
  });
});
