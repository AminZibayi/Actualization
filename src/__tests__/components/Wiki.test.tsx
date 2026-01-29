import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Wiki } from '@/components/Wiki';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: 'en',
    },
  }),
}));

describe('Wiki', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    // Mock localStorage
    Storage.prototype.getItem = jest.fn(() => null);
    Storage.prototype.setItem = jest.fn();
  });

  it('does not render when closed', () => {
    const { container } = render(<Wiki isOpen={false} onClose={mockOnClose} isRTL={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders when open', () => {
    render(<Wiki isOpen={true} onClose={mockOnClose} isRTL={false} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('displays wiki title', () => {
    render(<Wiki isOpen={true} onClose={mockOnClose} isRTL={false} />);
    expect(screen.getByText('wiki.title')).toBeInTheDocument();
  });

  it('displays search input', () => {
    render(<Wiki isOpen={true} onClose={mockOnClose} isRTL={false} />);
    expect(screen.getByLabelText('wiki.search')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Wiki isOpen={true} onClose={mockOnClose} isRTL={false} />);
    const closeButton = screen.getByLabelText('wiki.close');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when escape key is pressed', () => {
    render(<Wiki isOpen={true} onClose={mockOnClose} isRTL={false} />);
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('displays all section titles', () => {
    render(<Wiki isOpen={true} onClose={mockOnClose} isRTL={false} />);
    expect(screen.getByText('wiki.sections.yamlSchema')).toBeInTheDocument();
    expect(screen.getByText('wiki.sections.canvasGuide')).toBeInTheDocument();
    expect(screen.getByText('wiki.sections.softwareGuide')).toBeInTheDocument();
  });

  it('filters sections based on search query', async () => {
    render(<Wiki isOpen={true} onClose={mockOnClose} isRTL={false} />);
    const searchInput = screen.getByLabelText('wiki.search');

    // Type search query
    fireEvent.change(searchInput, { target: { value: 'yaml' } });

    await waitFor(() => {
      // Should show search results count
      expect(screen.getByText(/wiki.searchResultsCount/)).toBeInTheDocument();
    });
  });

  it('shows no results message when search yields nothing', async () => {
    render(<Wiki isOpen={true} onClose={mockOnClose} isRTL={false} />);
    const searchInput = screen.getByLabelText('wiki.search');

    // Type search query that won't match anything
    fireEvent.change(searchInput, { target: { value: 'zzzzzzzzz' } });

    // The text 'wiki.noResults' appears twice (in search results and in content area)
    const noResultsMessages = screen.getAllByText('wiki.noResults');
    expect(noResultsMessages.length).toBeGreaterThan(0);
  });

  it('toggles accordion sections', () => {
    render(<Wiki isOpen={true} onClose={mockOnClose} isRTL={false} />);
    const yamlSchemaButton = screen.getByText('wiki.sections.yamlSchema');

    // Initially closed (no content visible)
    expect(yamlSchemaButton.closest('button')).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    fireEvent.click(yamlSchemaButton);

    // Should be open now
    expect(yamlSchemaButton.closest('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies RTL class when isRTL is true', () => {
    render(<Wiki isOpen={true} onClose={mockOnClose} isRTL={true} />);
    const dialog = screen.getByRole('dialog').querySelector('.glass-card');
    expect(dialog).toHaveClass('dir-rtl');
  });

  it('has proper ARIA attributes for accessibility', () => {
    render(<Wiki isOpen={true} onClose={mockOnClose} isRTL={false} />);
    const dialog = screen.getByRole('dialog');

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'wiki-title');
  });
});
