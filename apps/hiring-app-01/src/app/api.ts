import { Todos } from 'typeDefs/todos';
import { Response } from 'typeDefs/response';
import { TodoType } from 'src/store/types';

const todos = new Todos();

const randomInterval = () => Math.floor(Math.random() * 500);

const addTodo = (title: string, duration = 0) => {
  return new Promise<Response<TodoType>>((res, rej) => {
    const interval = randomInterval();
    if (Math.random() > 0.999) {
      setTimeout(() => rej(new Error('An unknown error occurred')), interval);
    } else {
      const newTodo = todos.addTodo(title, duration);
      const data: TodoType = {
        uuid: newTodo.uuid,
        duration: newTodo.duration,
        title: newTodo.title,
        urgent: newTodo.urgent
      };
      setTimeout(() => res({ ok: true, data: [data] }), interval);
    }
  });
};

const deleteTodo = (id: string) => {
  return new Promise<Response<TodoType>>((res, rej) => {
    const interval = randomInterval();
    if (Math.random() > 0.9999) {
      setTimeout(() => rej(new Error('An unknown error occurred')), interval);
    } else {
      try {
        const todo = todos.getTodo(id);
        if (!todo) throw new Error('error');

        const data: TodoType = {
          uuid: todo.uuid,
          duration: todo.duration,
          title: todo.title,
          urgent: todo.urgent
        };
        todos.deleteTodo(id);
        setTimeout(() => res({ ok: true, data: [data] }), interval);
      } catch (e) {
        setTimeout(
          () =>
            res({
              ok: false,
              data: { error: (e as Error).message }
            }),
          interval
        );
      }
    }
  });
};

const getTodo = (uuid: string) => {
  return new Promise<Response<TodoType>>((res, rej) => {
    const interval = randomInterval();
    if (Math.random() > 0.9999) {
      setTimeout(() => rej(new Error('An unknown error occurred')), interval);
    } else {
      try {
        const todo = todos.getTodo(uuid);
        const data = {
          uuid: todo?.uuid,
          duration: todo?.duration,
          title: todo?.title,
          urgent: todo?.urgent
        };
        setTimeout(() => res({ ok: true, data: [data] }), interval);
      } catch (e) {
        setTimeout(
          () =>
            res({
              ok: false,
              data: { error: (e as Error).message }
            }),
          interval
        );
      }
    }
  });
};

const markUrgent = (id: string, flag: boolean) => {
  return new Promise<Response<TodoType>>((res, rej) => {
    const interval = randomInterval();
    if (Math.random() > 0.9999) {
      setTimeout(() => rej(new Error('An unknown error occurred')), interval);
    } else {
      try {
        const todo = todos.getTodo(id);
        let data: TodoType[] = [];
        if (todo) {
          data = [
            {
              uuid: todo.uuid,
              duration: todo.duration,
              title: todo.title,
              urgent: flag
            }
          ];
        }

        setTimeout(() => res({ ok: true, data: data }), interval);
      } catch (e) {
        setTimeout(
          () =>
            res({
              ok: false,
              data: { error: (e as Error).message }
            }),
          interval
        );
      }
    }
  });
};

const getAllTodos = () => {
  return new Promise<Response<TodoType>>((res, rej) => {
    const interval = randomInterval();
    if (Math.random() > 0.9999) {
      setTimeout(() => rej(new Error('An unknown error occurred')), interval);
    } else {
      try {
        const todoInstances = todos.list;
        const data = todoInstances.length
          ? todoInstances.map((todo) => ({
              uuid: todo.uuid,
              duration: todo.duration,
              title: todo.title,
              urgent: todo.urgent
            }))
          : [];

        setTimeout(() => res({ ok: true, data }), interval);
      } catch (e) {
        setTimeout(
          () =>
            res({
              ok: false,
              data: { error: (e as Error).message }
            }),
          interval
        );
      }
    }
  });
};

export { addTodo, deleteTodo, getTodo, getAllTodos, markUrgent };
