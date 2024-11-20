import { render } from '@testing-library/react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SignInForm from '@/modules/auth/components/sign-in-form';

jest.mock('@/components/ui/button', () => ({
  Button: jest.fn(() => null),
}));
jest.mock('@/components/ui/input', () => ({
  Input: jest.fn(() => null),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
}));

describe('SignInForm Unit Tests', () => {
  it('renders Input components with correct props', () => {
    render(<SignInForm />);

    expect(Input).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Email',
        id: 'login-email',
        type: 'text',
        placeholder: 'your@email.com',
        required: true,
      }),
      {},
    );

    expect(Input).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Пароль',
        id: 'login-password',
        type: 'password',
        placeholder: '••••••••',
        required: true,
      }),
      {},
    );
  });

  it('renders Button component with correct props', () => {
    render(<SignInForm />);

    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: true,
        isLoading: false,
        type: 'submit',
        className: 'w-full',
        children: 'Увійти',
      }),
      {},
    );
  });

  it('disables submit button when fields are empty', () => {
    render(<SignInForm />);

    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: true,
      }),
      {},
    );
  });
});
