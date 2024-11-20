import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

import AuthAPI from '@/api/auth-api';
import Routes from '@/constants/routes';
import useUserStore from '@/hooks/store/use-user-store';
import { useToast } from '@/hooks/use-toast';
import { ApiResponse } from '@/lib/api';
import SignInForm from '@/modules/auth/components/sign-in-form';
import { User } from '@/types/user';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));
jest.mock('@/api/auth-api');
jest.mock('@/hooks/store/use-user-store');
jest.mock('@/hooks/use-toast');

describe('SignInForm Integration Tests', () => {
  const mockReplace = jest.fn();
  const mockSetUser = jest.fn();
  const mockToast = jest.fn();
  let mockHandleSubmit: jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
    mockHandleSubmit = jest.fn((cb) =>
      jest.fn((event) => {
        event.preventDefault();
        return cb({ email: 'test@example.com', password: 'password123' });
      }),
    );
    (useRouter as jest.Mock).mockImplementation(() => ({
      replace: mockReplace,
    }));
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      setUser: mockSetUser,
    });
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn((name) => ({ name })),
      handleSubmit: mockHandleSubmit,
      watch: jest.fn().mockReturnValue({
        email: 'test@example.com',
        password: 'password123',
      }),
      formState: { isSubmitting: false },
    });
  });

  it('renders the form correctly', () => {
    render(<SignInForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Увійти' })).toBeInTheDocument();
  });

  it('submits the form with correct data', async () => {
    render(<SignInForm />);

    const mockLogin = jest
      .spyOn(AuthAPI, 'login')
      .mockResolvedValue({} as ApiResponse<unknown>);
    const mockGetMe = jest.spyOn(AuthAPI, 'getMe').mockResolvedValue({
      data: { id: 1, email: 'test@gmail.com', name: 'Test User' },
    } as ApiResponse<User>);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: 'password123' },
    });

    await waitFor(() => {
      fireEvent.submit(screen.getByRole('form'));
    });

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockGetMe).toHaveBeenCalled();
      expect(mockSetUser).toHaveBeenCalledWith({
        id: 1,
        email: 'test@gmail.com',
        name: 'Test User',
      });
      expect(mockReplace).toHaveBeenCalledWith(Routes.CATALOG);
    });
  });

  it('shows an error toast when login fails', async () => {
    jest.spyOn(AuthAPI, 'login').mockRejectedValue(new Error('Login failed'));

    render(<SignInForm />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: 'password123' },
    });

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Увійти' }));
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Помилка при вході',
        description: 'Перевірте правильність введених даних',
        variant: 'destructive',
      });
    });
  });
});
