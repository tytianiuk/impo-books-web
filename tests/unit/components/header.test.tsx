import { beforeEach, describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen, within } from '@testing-library/react';

import '@testing-library/jest-dom';
import Header from '@/components/header/header';
import Navigation from '@/components/header/navigation';
import { menuItems } from '@/constants/header-items';

describe('Header Component - Unit Tests', () => {
  beforeEach(() => {
    render(<Header />);
  });

  it('should render the logo link with correct href', () => {
    const logoLink = screen.getByRole('link', { name: /ImpoBooks/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('should render the company name', () => {
    const companyName = screen.getByText('ImpoBooks');
    expect(companyName).toBeInTheDocument();
  });

  it('should render the SquareLibrary icon', () => {
    const icon = screen.getByTestId('square-library');
    expect(icon).toBeInTheDocument();
  });

  it('should render the navigation component', () => {
    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeInTheDocument();
  });

  it('should render the login button', () => {
    const loginButton = screen.getByText('Увійти');
    expect(loginButton).toBeInTheDocument();
  });
});

describe('Navigation Component - Unit Tests', () => {
  beforeEach(() => {
    render(<Navigation />);
  });

  it('renders menu items for desktop view', () => {
    const desktopNav = screen.getByRole('navigation', { hidden: true });
    menuItems.forEach((item) => {
      const link = within(desktopNav).getByText(item.name);
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', item.href);
    });
  });

  it('renders correct icons for each navigation link', () => {
    const desktopNav = screen.getByRole('navigation', { hidden: true });
    menuItems.forEach((item) => {
      const linkContainer = within(desktopNav)
        .getByText(item.name)
        .closest('a');
      const icon = linkContainer?.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  it('renders all navigation links in mobile menu', () => {
    const menuButton = screen.getByRole('button', { name: /відкрити меню/i });
    fireEvent.click(menuButton);
    const dialog = screen.getByRole('dialog');
    menuItems.forEach((item) => {
      const link = within(dialog).getByText(item.name);
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', item.href);
    });
  });

  it('renders login button in mobile menu', () => {
    const menuButton = screen.getByRole('button', { name: /відкрити меню/i });
    fireEvent.click(menuButton);
    const dialog = screen.getByRole('dialog');
    const loginButton = within(dialog).getByText('Увійти');
    expect(loginButton).toBeInTheDocument();
    expect(loginButton.closest('a')).toHaveAttribute('href', '/auth');
  });
});
