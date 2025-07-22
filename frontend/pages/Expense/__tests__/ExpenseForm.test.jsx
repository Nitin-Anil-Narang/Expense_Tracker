import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import ExpenseForm from '../ExpenseForm';


vi.mock('../../../Context/UserAuth', () => ({
  useUser: () => ({
    user: {
      id: 1,
      names: 'Test User',
      role: 'admin',
    },
    headers: { Authorization: 'Bearer fake-token' },
    loading: false,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

describe('ExpenseForm', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ExpenseForm />
      </MemoryRouter>
    );

  it('renders the expense form title', () => {
    renderComponent();
    expect(screen.getByText(/submit expense/i)).toBeInTheDocument(); 
  });

  it('renders input fields', () => {
    renderComponent();
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Expense/i)).toBeInTheDocument();
  });
});
