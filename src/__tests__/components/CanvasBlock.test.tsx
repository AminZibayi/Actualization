import React from 'react';
import { render, screen } from '@testing-library/react';
import { CanvasBlock } from '@/components/CanvasBlock';
import { BlockData } from '@/types';

// Mock the StickyNoteCard component
jest.mock('@/components/StickyNoteCard', () => ({
  StickyNoteCard: ({ note }: { note: { title: string } }) => (
    <div data-testid={`mock-note-${note.title}`}>{note.title}</div>
  ),
}));

describe('CanvasBlock', () => {
  const mockBlockData: BlockData = {
    id: 'problem',
    titleEn: '1. Problem',
    titleFa: '۱. مسئله',
    notes: [
      { id: 'n1', title: 'Note 1', body: 'Body 1', color: 'yellow' },
      { id: 'n2', title: 'Note 2', body: 'Body 2', color: 'blue' },
    ],
  };

  it('renders block with correct test id', () => {
    render(<CanvasBlock data={mockBlockData} isRTL={false} />);
    expect(screen.getByTestId('canvas-block-problem')).toBeInTheDocument();
  });

  it('displays English title when isRTL is false', () => {
    render(<CanvasBlock data={mockBlockData} isRTL={false} />);
    expect(screen.getByTestId('block-title')).toHaveTextContent('1. Problem');
  });

  it('displays Persian title when isRTL is true', () => {
    render(<CanvasBlock data={mockBlockData} isRTL={true} />);
    expect(screen.getByTestId('block-title')).toHaveTextContent('۱. مسئله');
  });

  it('renders all notes in the block', () => {
    render(<CanvasBlock data={mockBlockData} isRTL={false} />);
    expect(screen.getByTestId('mock-note-Note 1')).toBeInTheDocument();
    expect(screen.getByTestId('mock-note-Note 2')).toBeInTheDocument();
  });

  it('handles empty notes array', () => {
    const emptyBlock: BlockData = {
      ...mockBlockData,
      notes: [],
    };
    render(<CanvasBlock data={emptyBlock} isRTL={false} />);
    expect(screen.getByTestId('canvas-block-problem')).toBeInTheDocument();
  });

  it('applies additional className when provided', () => {
    render(<CanvasBlock data={mockBlockData} isRTL={false} className='custom-class' />);
    const block = screen.getByTestId('canvas-block-problem');
    expect(block).toHaveClass('custom-class');
  });

  it('title alignment is left when isRTL is false', () => {
    render(<CanvasBlock data={mockBlockData} isRTL={false} />);
    expect(screen.getByTestId('block-title')).toHaveClass('text-left');
  });

  it('title alignment is right when isRTL is true', () => {
    render(<CanvasBlock data={mockBlockData} isRTL={true} />);
    expect(screen.getByTestId('block-title')).toHaveClass('text-right');
  });
});
