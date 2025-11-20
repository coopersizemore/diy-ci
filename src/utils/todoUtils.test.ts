import {
  createTodo,
  addTodo,
  toggleTodo,
  deleteTodo,
  getActiveTodos,
  getCompletedTodos,
  type Todo,
} from "./todoUtils";

describe("todoUtils", () => {
  describe("createTodo", () => {
    it("should create a todo with the given text", () => {
      const todo = createTodo("Test todo");
      expect(todo.text).toBe("Test todo");
      expect(todo.completed).toBe(false);
      expect(todo.id).toBeDefined();
    });

    it("should generate unique IDs", () => {
      const todo1 = createTodo("Todo 1");
      const todo2 = createTodo("Todo 2");
      expect(todo1.id).not.toBe(todo2.id);
    });
  });

  describe("addTodo", () => {
    it("should add a new todo to an empty list", () => {
      const result = addTodo([], "New todo");
      expect(result).toHaveLength(1);
      expect(result[0].text).toBe("New todo");
      expect(result[0].completed).toBe(false);
    });

    it("should add a new todo to an existing list", () => {
      const existing: Todo[] = [
        { id: "1", text: "Existing todo", completed: false },
      ];
      const result = addTodo(existing, "New todo");
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(existing[0]);
      expect(result[1].text).toBe("New todo");
    });

    it("should not add empty todos", () => {
      const existing: Todo[] = [
        { id: "1", text: "Existing todo", completed: false },
      ];
      const result = addTodo(existing, "");
      expect(result).toEqual(existing);
    });

    it("should not add todos with only whitespace", () => {
      const existing: Todo[] = [
        { id: "1", text: "Existing todo", completed: false },
      ];
      const result = addTodo(existing, "   ");
      expect(result).toEqual(existing);
    });

    it("should not mutate the original array", () => {
      const original: Todo[] = [
        { id: "1", text: "Original todo", completed: false },
      ];
      const result = addTodo(original, "New todo");
      expect(result).not.toBe(original);
      expect(original).toHaveLength(1);
    });
  });

  describe("toggleTodo", () => {
    it("should toggle a todo from incomplete to complete", () => {
      const todos: Todo[] = [{ id: "1", text: "Test todo", completed: false }];
      const result = toggleTodo(todos, "1");
      expect(result[0].completed).toBe(true);
    });

    it("should toggle a todo from complete to incomplete", () => {
      const todos: Todo[] = [{ id: "1", text: "Test todo", completed: true }];
      const result = toggleTodo(todos, "1");
      expect(result[0].completed).toBe(false);
    });

    it("should only toggle the specified todo", () => {
      const todos: Todo[] = [
        { id: "1", text: "Todo 1", completed: false },
        { id: "2", text: "Todo 2", completed: false },
        { id: "3", text: "Todo 3", completed: true },
      ];
      const result = toggleTodo(todos, "2");
      expect(result[0].completed).toBe(false);
      expect(result[1].completed).toBe(true);
      expect(result[2].completed).toBe(true);
    });

    it("should return unchanged list if ID not found", () => {
      const todos: Todo[] = [{ id: "1", text: "Test todo", completed: false }];
      const result = toggleTodo(todos, "999");
      expect(result).toEqual(todos);
    });

    it("should not mutate the original array", () => {
      const original: Todo[] = [
        { id: "1", text: "Test todo", completed: false },
      ];
      const result = toggleTodo(original, "1");
      expect(result).not.toBe(original);
      expect(original[0].completed).toBe(false);
    });
  });

  describe("deleteTodo", () => {
    it("should delete a todo by ID", () => {
      const todos: Todo[] = [
        { id: "1", text: "Todo 1", completed: false },
        { id: "2", text: "Todo 2", completed: false },
      ];
      const result = deleteTodo(todos, "1");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("2");
    });

    it("should return unchanged list if ID not found", () => {
      const todos: Todo[] = [{ id: "1", text: "Test todo", completed: false }];
      const result = deleteTodo(todos, "999");
      expect(result).toEqual(todos);
    });

    it("should return empty list when deleting the only todo", () => {
      const todos: Todo[] = [{ id: "1", text: "Only todo", completed: false }];
      const result = deleteTodo(todos, "1");
      expect(result).toHaveLength(0);
    });

    it("should not mutate the original array", () => {
      const original: Todo[] = [
        { id: "1", text: "Test todo", completed: false },
      ];
      const result = deleteTodo(original, "1");
      expect(result).not.toBe(original);
      expect(original).toHaveLength(1);
    });
  });

  describe("getActiveTodos", () => {
    it("should return only incomplete todos", () => {
      const todos: Todo[] = [
        { id: "1", text: "Active 1", completed: false },
        { id: "2", text: "Completed", completed: true },
        { id: "3", text: "Active 2", completed: false },
      ];
      const result = getActiveTodos(todos);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("3");
    });

    it("should return empty array if all todos are completed", () => {
      const todos: Todo[] = [
        { id: "1", text: "Completed 1", completed: true },
        { id: "2", text: "Completed 2", completed: true },
      ];
      const result = getActiveTodos(todos);
      expect(result).toHaveLength(0);
    });

    it("should return all todos if none are completed", () => {
      const todos: Todo[] = [
        { id: "1", text: "Active 1", completed: false },
        { id: "2", text: "Active 2", completed: false },
      ];
      const result = getActiveTodos(todos);
      expect(result).toHaveLength(2);
    });
  });

  describe("getCompletedTodos", () => {
    it("should return only completed todos", () => {
      const todos: Todo[] = [
        { id: "1", text: "Active", completed: false },
        { id: "2", text: "Completed 1", completed: true },
        { id: "3", text: "Completed 2", completed: true },
      ];
      const result = getCompletedTodos(todos);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("2");
      expect(result[1].id).toBe("3");
    });

    it("should return empty array if no todos are completed", () => {
      const todos: Todo[] = [
        { id: "1", text: "Active 1", completed: false },
        { id: "2", text: "Active 2", completed: false },
      ];
      const result = getCompletedTodos(todos);
      expect(result).toHaveLength(0);
    });

    it("should return all todos if all are completed", () => {
      const todos: Todo[] = [
        { id: "1", text: "Completed 1", completed: true },
        { id: "2", text: "Completed 2", completed: true },
      ];
      const result = getCompletedTodos(todos);
      expect(result).toHaveLength(2);
    });
  });
});
