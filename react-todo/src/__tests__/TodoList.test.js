import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
  });

  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText('Add new todo');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'Buy milk' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Buy milk')).toBeInTheDocument();
  });

  test('toggles todo completion status', () => {
    render(<TodoList />);

    const checkbox = screen.getAllByRole('checkbox')[0];
    const todoText = screen.getByText('Learn React');

    fireEvent.click(checkbox);
    expect(todoText).toHaveClass('line-through');

    fireEvent.click(checkbox);
    expect(todoText).not.toHaveClass('line-through');
  });

  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);

    const deleteButtons = screen.getAllByText('Delete');
    const initialTodos = screen.getAllByRole('listitem').length;

    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(initialTodos - 1);
  });
});