import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('All');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  const handleAddTodo = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleToggle = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingValue(todos[index].text);
  };

  const handleEditChange = (e) => {
    setEditingValue(e.target.value);
  };

  const handleEditSubmit = (e, index) => {
    if (e.key === 'Enter' && editingValue.trim()) {
      const newTodos = [...todos];
      newTodos[index].text = editingValue;
      setTodos(newTodos);
      setEditingIndex(null);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddTodo}
          autoFocus
        />
      </header>
      <section className="main">
        <ul className="todo-list">
          {filteredTodos.map((todo, index) => (
            <li key={index} className={`todo ${todo.completed ? 'completed' : ''}`}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(index)}
                />
                {editingIndex === index ? (
                  <input
                    className="edit"
                    value={editingValue}
                    onChange={handleEditChange}
                    onKeyDown={(e) => handleEditSubmit(e, index)}
                    autoFocus
                  />
                ) : (
                  <label onDoubleClick={() => handleEdit(index)}>{todo.text}</label>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.filter(todo => !todo.completed).length}</strong> item left
        </span>
        <ul className="filters">
          <li><button onClick={() => setFilter('All')} className={filter === 'All' ? 'selected' : ''}>All</button></li>
          <li><button onClick={() => setFilter('Active')} className={filter === 'Active' ? 'selected' : ''}>Active</button></li>
          <li><button onClick={() => setFilter('Completed')} className={filter === 'Completed' ? 'selected' : ''}>Completed</button></li>
        </ul>
        <button className="clear-completed" onClick={handleClearCompleted}>
          Clear completed
        </button>
      </footer>
    </div>
  );
}

export default App;
