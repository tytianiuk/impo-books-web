import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

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

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: jest.fn(),
}));

jest.mock('@/api/auth-api');
jest.mock('@/hooks/store/use-user-store');
jest.mock('@/hooks/use-toast');

describe('SignUpForm', () => {
  const mockReplace = jest.fn();
  const mockSetUser = jest.fn();
  const mockToast = jest.fn();
  let mockHandleSubmit: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockHandleSubmit = jest.fn((cb) =>
      jest.fn((event) => {
        event.preventDefault();
        return cb({
          fullName: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          confirmPassword: 'password123',
        });
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
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }),
      formState: { errors: {}, isSubmitting: false },
    });
  });

  it('renders the form correctly', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText("Ім'я")).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getByLabelText('Підтвердження паролю')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Зареєструватися' }),
    ).toBeInTheDocument();
  });

  it('submits the form with correct data', async () => {
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

    fireEvent.submit(screen.getByRole('form'));

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

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Помилка при створенні аккаунту',
        description: 'Перевірте правильність введених даних',
        variant: 'destructive',
      });
    });
  });
});
