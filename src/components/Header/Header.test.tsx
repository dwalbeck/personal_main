import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('Header', () => {
  it('renders the header component', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('displays the name/brand', () => {
    render(<Header />);
    const brandName = screen.getByText('Davey Walbeck');
    expect(brandName).toBeInTheDocument();
    expect(brandName).toHaveClass('font-bold', 'text-xl', 'text-purple-800');
  });

  it('renders all navigation links on desktop', () => {
    render(<Header />);
    const navLinks = ['Home', 'Experience', 'Skills', 'Projects', 'Meet Davey', 'Interests', 'Q & A', 'Contact'];

    navLinks.forEach(linkText => {
      const links = screen.getAllByText(linkText);
      expect(links.length).toBeGreaterThan(0);
    });
  });

  it('mobile menu is hidden by default', () => {
    render(<Header />);
    // The mobile menu should not be visible initially
    const button = screen.getByRole('button', { name: /toggle navigation/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles mobile menu when burger button is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggleButton = screen.getByRole('button', { name: /toggle navigation/i });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    // Click to open menu
    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

    // Click to close menu
    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes mobile menu when a link is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggleButton = screen.getByRole('button', { name: /toggle navigation/i });

    // Open menu
    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

    // Click on a mobile menu link (we need to find the mobile-specific links)
    const mobileLinks = screen.getAllByText('Home');
    // Click the last one (should be in mobile menu)
    await user.click(mobileLinks[mobileLinks.length - 1]);

    // Menu should be closed
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('has fixed positioning', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50');
  });

  it('navigation links have correct href attributes', () => {
    render(<Header />);
    const homeLinks = screen.getAllByRole('link', { name: /home/i });
    homeLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '#home');
    });
  });
});
