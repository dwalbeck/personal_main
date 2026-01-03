import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders footer component', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('displays copyright text with current year', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/© 2025 Davey Walbeck. All rights reserved./i);
    expect(copyrightText).toBeInTheDocument();
  });

  it('has correct background styling', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-purple-800');
  });

  it('centers the content', () => {
    render(<Footer />);
    const container = screen.getByText(/© 2025 Davey Walbeck. All rights reserved./i).closest('.text-center');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('text-center');
  });
});
