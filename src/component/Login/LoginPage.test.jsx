// LoginPage.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { LoginPage } from './LoginPage';
import { vi } from 'vitest';

// Mock des modules
vi.mock('axios');
vi.mock('react-hot-toast', () => {
  return {
    toast: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

describe('LoginPage component', () => {
   const setIsAuthenticated = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('display login form', () => {
    render(
        <MemoryRouter>
        <LoginPage setIsAuthenticated={setIsAuthenticated} />
        </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('connect user', async () => {
    axios.post.mockResolvedValue({ data: { token: 'fake-token' } });

    render(
      <MemoryRouter>
        <LoginPage setIsAuthenticated={setIsAuthenticated} />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByTestId('email'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.input(screen.getByTestId('password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email: 'user@example.com', password: 'password123' }
      );
      expect(localStorage.getItem('token')).toBe('fake-token');
      expect(setIsAuthenticated).toHaveBeenCalledWith(true);
      expect(toast.success).toHaveBeenCalledWith('Connexion réussie ! Bienvenue 👋');
      // expect(navigate).toHaveBeenCalledWith('/test-form-exemple/list');
    });
  });

  it('display error for bad credentials', async () => {
    axios.post.mockRejectedValue({ response: { status: 401 } });

    render(
      <MemoryRouter>
        <LoginPage setIsAuthenticated={setIsAuthenticated} />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email: 'wrong@example.com', password: 'wrongpassword' }
      );
      expect(setIsAuthenticated).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Erreur de connexion. Vérifiez vos identifiants.');
      expect(screen.getByText('Invalid credentials. Please try again.')).toBeInTheDocument();
    });
  });

  it('display network error', async () => {
    axios.post.mockRejectedValue(new Error('Network Error'));

    render(
      <MemoryRouter>
        <LoginPage setIsAuthenticated={setIsAuthenticated} />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email: 'user@example.com', password: 'password123' }
      );
      expect(setIsAuthenticated).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Erreur de connexion. Vérifiez vos identifiants.');
      expect(screen.getByText('Invalid credentials. Please try again.')).toBeInTheDocument();
    });
  });
});
