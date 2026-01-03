import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';

// Mock fetch globally
global.fetch = vi.fn();

describe('Contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders contact form with all fields', () => {
    render(<Contact />);

    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type message here')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Contact />);

    expect(screen.getByText('Davey Walbeck')).toBeInTheDocument();
    expect(screen.getByText('Senior Software Architect')).toBeInTheDocument();
    expect(screen.getByText(/385-434-4400/)).toBeInTheDocument();
    expect(screen.getByText(/daveywalbeck@gmail.com/)).toBeInTheDocument();
  });

  it('displays validation errors when submitting empty form', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument();
      expect(screen.getByText('Last name is required')).toBeInTheDocument();
      expect(screen.getByText('Phone number is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });
  });

  it('validates phone format', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const phoneInput = screen.getByPlaceholderText('Phone number');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(phoneInput, '123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument();
    });
  });

  it('clears error when user starts typing', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const firstNameInput = screen.getByPlaceholderText('First Name');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Submit to trigger validation
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument();
    });

    // Start typing
    await user.type(firstNameInput, 'John');

    // Error should be cleared
    expect(screen.queryByText('First name is required')).not.toBeInTheDocument();
  });

  it('submits form successfully with valid data', async () => {
    const user = userEvent.setup();
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'success' })
    });
    global.fetch = mockFetch;

    render(<Contact />);

    // Fill in the form
    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Phone number'), '1234567890');
    await user.type(screen.getByPlaceholderText('Email Address'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Type message here'), 'Test message');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[0]).toMatch(/\/contact\/$/);
      expect(callArgs[1]).toEqual({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          phone: '1234567890',
          email: 'john@example.com',
          message: 'Test message'
        })
      });
    });

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/Thank you! Your message has been sent successfully./i)).toBeInTheDocument();
    });
  });

  it('displays error message when submission fails', async () => {
    const user = userEvent.setup();
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    });
    global.fetch = mockFetch;

    render(<Contact />);

    // Fill in the form
    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Phone number'), '1234567890');
    await user.type(screen.getByPlaceholderText('Email Address'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Type message here'), 'Test message');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Sorry, there was an error sending your message. Please try again./i)).toBeInTheDocument();
    });
  });

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup();
    const mockFetch = vi.fn().mockImplementation(() =>
      new Promise(resolve => setTimeout(() => resolve({ ok: true }), 100))
    );
    global.fetch = mockFetch;

    render(<Contact />);

    // Fill in the form
    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Phone number'), '1234567890');
    await user.type(screen.getByPlaceholderText('Email Address'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Type message here'), 'Test message');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    // Button should show "Sending..." and be disabled
    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
  });

  it('clears form after successful submission', async () => {
    const user = userEvent.setup();
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'success' })
    });
    global.fetch = mockFetch;

    render(<Contact />);

    const firstNameInput = screen.getByPlaceholderText('First Name') as HTMLInputElement;
    const lastNameInput = screen.getByPlaceholderText('Last Name') as HTMLInputElement;
    const phoneInput = screen.getByPlaceholderText('Phone number') as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText('Email Address') as HTMLInputElement;
    const messageInput = screen.getByPlaceholderText('Type message here') as HTMLTextAreaElement;

    // Fill in the form
    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Doe');
    await user.type(phoneInput, '1234567890');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(firstNameInput.value).toBe('');
      expect(lastNameInput.value).toBe('');
      expect(phoneInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });
  });
});
