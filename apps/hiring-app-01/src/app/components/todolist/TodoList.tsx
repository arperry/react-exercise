import { useState, useEffect } from "react";
import { Container } from "@mantine/core";
import TodoCard from "./TodoCard";
import { getAllTodo } from "app/api";
import { Todo } from "app/types/todo";
import { toast } from "react-toastify";

const TodoList = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoListUpdated, setTodoListUpdated] = useState<boolean>(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getAllTodo();
      if (Array.isArray(response.data)) {
        setTodoList(response.data);
        setTodoListUpdated(false);
      } else {
        toast.error("Error loading todo list");
      }
    };
    fetchTodos();
  }, [todoListUpdated]);

  return (
    <Container>
      {todoList.length
        ? todoList.map((todo) => (
            <TodoCard
              setTodoListUpdated={setTodoListUpdated}
              completed={todo.completed}
              title={todo.title}
              duration={todo.duration}
              uuid={todo.uuid}
              key={todo.uuid}
            />
          ))
        : "Nothing Todo"}
    </Container>
  );
};

export default TodoList;
