export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const createTodo = (text: string): Todo => {
  return {
    id: crypto.randomUUID(),
    text,
    completed: false,
  };
};

export const addTodo = (todos: Todo[], text: string): Todo[] => {
  if (!text.trim()) {
    return todos;
  }
  return [...todos, createTodo(text)];
};

export const toggleTodo = (todos: Todo[], id: string): Todo[] => {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
};

export const deleteTodo = (todos: Todo[], id: string): Todo[] => {
  return todos.filter((todo) => todo.id !== id);
};

export const getActiveTodos = (todos: Todo[]): Todo[] => {
  return todos.filter((todo) => !todo.completed);
};

export const getCompletedTodos = (todos: Todo[]): Todo[] => {
  return todos.filter((todo) => todo.completed);
};
