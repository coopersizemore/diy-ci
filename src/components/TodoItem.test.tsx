import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoItem } from "./TodoItem";
import type { Todo } from "../utils/todoUtils";

describe("TodoItem", () => {
  const mockTodo: Todo = {
    id: "1",
    text: "Test todo",
    completed: false,
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the todo text", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );
    expect(screen.getByText("Test todo")).toBeInTheDocument();
  });

  it("should render an unchecked checkbox for incomplete todo", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("should render a checked checkbox for completed todo", () => {
    const completedTodo: Todo = { ...mockTodo, completed: true };
    render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("should call onToggle when checkbox is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith("1");
  });

  it("should call onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  it("should apply line-through style to completed todo text", () => {
    const completedTodo: Todo = { ...mockTodo, completed: true };
    render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );
    const text = screen.getByText("Test todo");
    expect(text).toHaveStyle({ textDecoration: "line-through" });
  });

  it("should not apply line-through style to incomplete todo text", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );
    const text = screen.getByText("Test todo");
    expect(text).toHaveStyle({ textDecoration: "none" });
  });

  it("should have accessible labels for checkbox", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );
    expect(screen.getByLabelText("Toggle Test todo")).toBeInTheDocument();
  });

  it("should have accessible labels for delete button", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />,
    );
    expect(screen.getByLabelText("Delete Test todo")).toBeInTheDocument();
  });
});
