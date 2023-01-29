import { Todos } from "./types/todos";
import { Todo } from "./types/todo";
import { Response } from "./types/response";

const todos = new Todos();

const randomInterval = () => Math.floor(Math.random() * 500);
export type AddTodo = Omit<Todo, "uuid">;

const addTodo = ({
  color = "#FFF",
  completed = false,
  displaySequence = 1,
  duration = 0,
  title = "New Todo",
}: AddTodo) => {
  return new Promise<Response<Todo>>((res, rej) => {
    const interval = randomInterval();
    if (Math.random() > 0.9) {
      setTimeout(() => rej(new Error("An unknown error occurred")), interval);
    } else {
      const todo = todos.addTodo({
        color,
        completed,
        displaySequence,
        duration,
        title,
      });
      setTimeout(() => res({ ok: true, data: todo }), interval);
    }
  });
};

const deleteTodo = (uuid: string) => {
  return new Promise<Response<object>>((res, rej) => {
    const interval = randomInterval();
    if (Math.random() > 0.9) {
      setTimeout(() => rej(new Error("An unknown error occurred")), interval);
    } else {
      try {
        todos.deleteTodo(uuid);
        setTimeout(() => res({ ok: true, data: {} }), interval);
      } catch (e) {
        setTimeout(
          () =>
            res({
              ok: false,
              data: { error: (e as Error).message },
            }),
          interval
        );
      }
    }
  });
};

const getTodo = (uuid: string) => {
  return new Promise<Response<object>>((res, rej) => {
    const interval = randomInterval();
    if (Math.random() > 0.9) {
      setTimeout(() => rej(new Error("An unknown error occurred")), interval);
    } else {
      try {
        const todo = todos.getTodo(uuid);
        setTimeout(() => res({ ok: true, data: { todo } }), interval);
      } catch (e) {
        setTimeout(
          () =>
            res({
              ok: false,
              data: { error: (e as Error).message },
            }),
          interval
        );
      }
    }
  });
};

// Added a function to get All Todos in order to list on the "dashboard" page
const getAllTodos = () => {
  return new Promise<Response<object>>((res, rej) => {
    const interval = randomInterval();
    if (Math.random() > 0.9) {
      setTimeout(() => rej(new Error("An unknown error occurred")), interval);
    } else {
      try {
        const all = todos.list;
        const data = all.map((todo) => {
          return {
            uuid: todo.uuid,
            color: todo.color,
            completed: todo.completed,
            displaySequence: todo.displaySequence,
            duration: todo.duration,
            title: todo.title,
          };
        });
        setTimeout(() => res({ ok: true, data: data }), interval);
      } catch (e) {
        setTimeout(
          () =>
            res({
              ok: false,
              data: { error: (e as Error).message },
            }),
          interval
        );
      }
    }
  });
};

export { addTodo, deleteTodo, getTodo, getAllTodos };
