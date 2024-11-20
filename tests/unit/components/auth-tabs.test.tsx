import { render, screen } from '@testing-library/react';
import { useQueryState } from 'nuqs';
import React from 'react';

import AuthTabs from '@/modules/auth/components/auth-tabs';

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}));

// eslint-disable-next-line react/display-name
jest.mock('@/modules/auth/components/sign-in-form', () => () => (
  <div>SignInForm</div>
));

// eslint-disable-next-line react/display-name
jest.mock('@/modules/auth/components/sign-up-form', () => () => (
  <div>SignUpForm</div>
));

describe('AuthTabs', () => {
  const mockSetTab = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useQueryState as jest.Mock).mockReturnValue(['login', mockSetTab]);
  });

  it('renders the component with default "login" tab', () => {
    render(<AuthTabs />);

    expect(screen.getByTestId('login')).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByTestId('register')).toHaveAttribute(
      'aria-selected',
      'false',
    );
    expect(screen.getByText('SignInForm')).toBeInTheDocument();
  });

  it('renders "register" tab content when tab query param is set to "register"', () => {
    (useQueryState as jest.Mock).mockReturnValue(['register', mockSetTab]);

    render(<AuthTabs />);

    expect(screen.getByTestId('register')).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByTestId('login')).toHaveAttribute(
      'aria-selected',
      'false',
    );
    expect(screen.getByText('SignUpForm')).toBeInTheDocument();
  });

  it('uses "login" as default value when tab query param is not set', () => {
    (useQueryState as jest.Mock).mockReturnValue([undefined, mockSetTab]);

    render(<AuthTabs />);

    expect(screen.getByTestId('login')).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByText('SignInForm')).toBeInTheDocument();
  });
});
