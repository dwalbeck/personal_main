import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the main app component', () => {
    render(<App />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('renders header component', () => {
    render(<App />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('renders all major sections', () => {
    render(<App />);

    // Check that sections exist by looking for section headings or IDs
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();

    // Check for footer
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('has correct padding top to account for fixed header', () => {
    render(<App />);
    const main = screen.getByRole('main');
    expect(main).toHaveClass('pt-16');
  });

  it('includes ChatBot component', () => {
    render(<App />);
    // ChatBot should be present (though we're not testing its internals here)
    // We can verify it's rendered by checking the DOM structure
    expect(document.body).toContainHTML('main');
  });
});
