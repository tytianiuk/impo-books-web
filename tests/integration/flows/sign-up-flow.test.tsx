import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import React from 'react';

import AuthAPI from '@/api/auth-api';
import Routes from '@/constants/routes';
import useUserStore from '@/hooks/store/use-user-store';
import { useToast } from '@/hooks/use-toast';
import { ApiResponse } from '@/lib/api';
import SignUpForm from '@/modules/auth/components/sign-up-form';
import { User } from '@/types/user';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/api/auth-api');
jest.mock('@/hooks/store/use-user-store');
jest.mock('@/hooks/use-toast');

describe('SignUp Flow Integration Tests', () => {
  const mockReplace = jest.fn();
  const mockSetUser = jest.fn();
  const mockToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({
      replace: mockReplace,
    }));
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      setUser: mockSetUser,
    });
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
  });

  it('completes the registration flow successfully', async () => {
    const mockRegister = jest
      .spyOn(AuthAPI, 'register')
      .mockResolvedValue({ status: 201 } as ApiResponse<unknown>);
    const mockLogin = jest
      .spyOn(AuthAPI, 'login')
      .mockResolvedValue({} as ApiResponse<unknown>);
    const mockGetMe = jest.spyOn(AuthAPI, 'getMe').mockResolvedValue({
      data: { id: 1, email: 'john@example.com', name: 'John Doe' },
    } as ApiResponse<User>);

    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText("Ім'я"), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Підтвердження паролю'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Зареєструватися' }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(
        'john@example.com',
        'John Doe',
        'password123',
      );
      expect(mockLogin).toHaveBeenCalledWith('john@example.com', 'password123');
      expect(mockGetMe).toHaveBeenCalled();
      expect(mockSetUser).toHaveBeenCalledWith({
        id: 1,
        email: 'john@example.com',
        name: 'John Doe',
      });
      expect(mockReplace).toHaveBeenCalledWith(Routes.CATALOG);
    });
  });

  it('shows an error toast when registration fails', async () => {
    jest
      .spyOn(AuthAPI, 'register')
      .mockRejectedValue(new Error('Registration failed'));

    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText("Ім'я"), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Підтвердження паролю'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Зареєструватися' }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Помилка при створенні аккаунту',
        description: 'Перевірте правильність введених даних',
        variant: 'destructive',
      });
    });
  });

  it('disables the submit button when fields are empty', () => {
    render(<SignUpForm />);

    const submitButton = screen.getByRole('button', {
      name: 'Зареєструватися',
    });
    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText("Ім'я"), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Підтвердження паролю'), {
      target: { value: 'password123' },
    });

    expect(submitButton).not.toBeDisabled();
  });
});
