import '@testing-library/jest-dom';
import { render, screen, fireEvent } from './test-utils';
import MainList from 'components/Todos/MainList';

describe(MainList, () => {
  window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn()
    }));

  test('displays correct link in main list page', () => {
    render(<MainList page="main" />);
    expect(screen.getByText('Go to Urgent Items List')).toBeInTheDocument();
  });

  test('displays correct link in urgent list page', () => {
    render(<MainList page="urgent" />);
    expect(screen.getByText('Go to All Items List')).toBeInTheDocument();
  });

  test('button click opens modal', async () => {
    render(<MainList page="main" />);
    expect(screen.getByText('Add Item')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /add item/i });
    fireEvent.click(button);

    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});
