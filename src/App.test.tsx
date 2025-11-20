import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("should render the app title", () => {
    render(<App />);
    expect(screen.getByText("Todo List")).toBeInTheDocument();
  });

  it("should render the input field and add button", () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/add a new todo/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("should show 'No todos yet!' when there are no todos", () => {
    render(<App />);
    expect(screen.getByText("No todos yet!")).toBeInTheDocument();
  });

  it("should display counts showing 0 todos initially", () => {
    render(<App />);
    expect(screen.getByText(/Active: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: 0/i)).toBeInTheDocument();
  });

  it("should add a new todo when add button is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    await user.type(input, "Buy groceries");
    await user.click(addButton);

    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
    expect(screen.queryByText("No todos yet!")).not.toBeInTheDocument();
  });

  it("should add a new todo when Enter key is pressed", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/add a new todo/i);

    await user.type(input, "Walk the dog{Enter}");

    expect(screen.getByText("Walk the dog")).toBeInTheDocument();
  });

  it("should clear the input field after adding a todo", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(
      /add a new todo/i,
    ) as HTMLInputElement;
    const addButton = screen.getByRole("button", { name: /add/i });

    await user.type(input, "Test todo");
    await user.click(addButton);

    expect(input.value).toBe("");
  });

  it("should update counts when adding todos", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    await user.type(input, "First todo");
    await user.click(addButton);

    expect(screen.getByText(/Active: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: 1/i)).toBeInTheDocument();

    await user.type(input, "Second todo");
    await user.click(addButton);

    expect(screen.getByText(/Active: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: 2/i)).toBeInTheDocument();
  });

  it("should toggle todo completion when checkbox is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    await user.type(input, "Test todo{Enter}");

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    expect(screen.getByText(/Active: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed: 0/i)).toBeInTheDocument();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getByText(/Active: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed: 1/i)).toBeInTheDocument();

    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(screen.getByText(/Active: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed: 0/i)).toBeInTheDocument();
  });

  it("should delete a todo when delete button is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    await user.type(input, "Todo to delete{Enter}");

    expect(screen.getByText("Todo to delete")).toBeInTheDocument();
    expect(screen.getByText(/Total: 1/i)).toBeInTheDocument();

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);

    expect(screen.queryByText("Todo to delete")).not.toBeInTheDocument();
    expect(screen.getByText(/Total: 0/i)).toBeInTheDocument();
    expect(screen.getByText("No todos yet!")).toBeInTheDocument();
  });

  it("should handle multiple todos with different states", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/add a new todo/i);

    await user.type(input, "First todo{Enter}");
    await user.type(input, "Second todo{Enter}");
    await user.type(input, "Third todo{Enter}");

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);
    await user.click(checkboxes[2]);

    expect(screen.getByText(/Active: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: 3/i)).toBeInTheDocument();
  });

  it("should maintain all todos when deleting one", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/add a new todo/i);

    await user.type(input, "Keep this{Enter}");
    await user.type(input, "Delete this{Enter}");
    await user.type(input, "Keep this too{Enter}");

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    await user.click(deleteButtons[1]);

    expect(screen.getByText("Keep this")).toBeInTheDocument();
    expect(screen.queryByText("Delete this")).not.toBeInTheDocument();
    expect(screen.getByText("Keep this too")).toBeInTheDocument();
    expect(screen.getByText(/Total: 2/i)).toBeInTheDocument();
  });
});
