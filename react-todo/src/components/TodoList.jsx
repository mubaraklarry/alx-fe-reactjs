import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Write tests', completed: false },
    { id: 3, text: 'Pass ALX check', completed: false }
  ]);

  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo, completed: false }
    ]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Todo List</h1>

      <form onSubmit={addTodo} className="flex mb-8">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      <ul className="space-y-3">
        {todos.map(todo => (
          <li
  key={todo.id}
  className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
>
  <div className="flex items-center flex-1">
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => toggleTodo(todo.id)}
      className="mr-4 h-5 w-5"
    />
    <span
      className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
    >
      {todo.text}
    </span>
  </div>
  <button
    onClick={() => deleteTodo(todo.id)}
    className="text-red-600 hover:text-red-800 font-medium ml-4"
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