import { useState } from "react";
import "./App.css";
import type { Todo } from "./utils/todoUtils";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  getActiveTodos,
  getCompletedTodos,
} from "./utils/todoUtils";
import { TodoList } from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    setTodos(addTodo(todos, inputValue));
    setInputValue("");
  };

  const handleToggle = (id: string) => {
    setTodos(toggleTodo(todos, id));
  };

  const handleDelete = (id: string) => {
    setTodos(deleteTodo(todos, id));
  };

  const activeTodos = getActiveTodos(todos);
  const completedTodos = getCompletedTodos(todos);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Todo List</h1>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          placeholder="Add a new todo..."
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          aria-label="New todo input"
        />
        <button
          onClick={handleAddTodo}
          style={{
            padding: "8px 16px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <p>
          Active: {activeTodos.length} | Completed: {completedTodos.length} |
          Total: {todos.length}
        </p>
      </div>

      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}

export default App;
