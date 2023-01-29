import { AddTodo } from "../api";
import { Todo } from "./todo";

class Todos {
  private _todos: Map<string, Todo> = new Map();

  public clear() {
    this._todos.clear();
  }

  public addTodo({
    color = "#FFF",
    completed = false,
    displaySequence = 1,
    duration = 0,
    title = "New Todo",
  }: AddTodo) {
    const newTodo = new Todo({
      color,
      completed,
      displaySequence,
      duration,
      title,
    });
    const { uuid } = newTodo;
    this._todos.set(uuid, newTodo);
    return newTodo;
  }

  public deleteTodo(uuid: string) {
    if (!this._todos.delete(uuid)) {
      throw new Error("Todo does not exist");
    }
  }

  public getTodo(uuid: string) {
    if (!this._todos.has(uuid)) {
      throw new Error("Todo does not exist");
    } else {
      return this._todos.get(uuid);
    }
  }

  get list() {
    return Array.from(this._todos.values());
  }
}

export { Todos };
