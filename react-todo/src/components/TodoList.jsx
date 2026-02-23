import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Write tests', completed: false },
  ]);

  const [inputValue, setInputValue] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setTodos([...todos, { id: Date.now(), text: inputValue.trim(), completed: false }]);
    setInputValue('');
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>

      <form onSubmit={addTodo} className="mb-8 flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new todo"
          className="flex-1 p-3 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 rounded-r hover:bg-blue-700">
          Add
        </button>
      </form>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-4 bg-white rounded shadow"
          >
            <div className="flex items-center flex-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="mr-4"
              />
              <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;