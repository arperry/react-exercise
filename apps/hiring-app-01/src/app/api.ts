import { Todos } from "./types/todos";
import { Todo } from "./types/todo";
import { Response } from "./types/response";

const todos = new Todos();

const randomInterval = () => Math.floor(Math.random() * 500);

const addTodo = (title: string, duration = 0) => {
  return new Promise<Response<Todo>>((res, rej) => {
    const interval = randomInterval();
    if (Math.random() > 0.9999) {
      setTimeout(() => rej(new Error("An unknown error occurred")), interval);
    } else {
      const todo = todos.addTodo(title, duration);
      setTimeout(() => res({ ok: true, data: todo }), interval);
    }
  });
};

const updateTodo = (
  uuid: string,
  title: string,
  completed: boolean,
  duration = 0
) => {
  return new Promise<Response<Todo>>((res, rej) => {
    const interval = randomInterval();
    if (Math.random() > 0.9999) {
      setTimeout(() => rej(new Error("An unknown error occurred")), interval);
    } else {
      const todo = todos.updateTodo(title, duration, uuid, completed);
      setTimeout(() => res({ ok: true, data: todo }), interval);
    }
  });
};

const deleteTodo = (uuid: string) => {
  return new Promise<Response<object>>((res, rej) => {
    const interval = randomInterval();
    if (Math.random() > 0.9999) {
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
    if (Math.random() > 0.9999) {
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

const getAllTodo = () => {
  return new Promise<Response<object>>((res, rej) => {
    const interval = randomInterval();
    if (Math.random() > 0.9999) {
      setTimeout(() => rej(new Error("An unknown error occurred")), interval);
    } else {
      try {
        const todoList = todos.list;
        const data = todoList.length
          ? todoList.map((todo) => {
              return {
                uuid: todo.uuid,
                duration: todo.duration,
                title: todo.title,
                completed: todo.completed,
              };
            })
          : [];
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
export { addTodo, deleteTodo, getTodo, getAllTodo, updateTodo };
