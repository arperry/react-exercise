import { Todo } from "./todo";

class Todos {
  private _todos: Map<string, Todo> = new Map();

  public clear() {
    this._todos.clear();
  }

  public addTodo(title: string, duration = 0, completed = false) {
    const newTodo = new Todo({ title, duration, completed });
    const { uuid } = newTodo;
    this._todos.set(uuid, newTodo);
    return newTodo;
  }

  public deleteTodo(uuid: string) {
    console.log(uuid);
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

  public updateTodo(
    title: string,
    duration: number,
    uuid: string,
    completed: boolean
  ) {
    if (!this._todos.has(uuid)) {
      throw new Error("Todo does not exist");
    } else {
      const updatingTodo = new Todo({ title, duration, completed, uuid });
      this._todos.set(uuid, updatingTodo);
      return updatingTodo;
    }
  }

  get list() {
    return Array.from(this._todos.values());
  }
}

export { Todos };
