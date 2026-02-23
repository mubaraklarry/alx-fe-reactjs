import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Pass ALX check')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const button = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(button);

    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  test('toggles todo completion', () => {
    render(<TodoList />);
    
    const todoText = screen.getByText('Learn React');
    const checkbox = screen.getAllByRole('checkbox')[0];

    fireEvent.click(checkbox);
    expect(todoText).toHaveClass('line-through');
    
    fireEvent.click(checkbox);
    expect(todoText).not.toHaveClass('line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    
    const deleteButtons = screen.getAllByText('Delete');
    const initialCount = screen.getAllByRole('listitem').length;

    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(initialCount - 1);
  });
});