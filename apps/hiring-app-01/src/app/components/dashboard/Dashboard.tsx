import { Button, CSSObject, Grid, Paper } from "@mantine/core";
import { useEffect, useState } from "react";

import ToDoCard from "./ToDoCard";
import { Todo } from "../../types/todo";
import { AddTodo, addTodo, getAllTodos } from "../../api";
import { useHistory } from "react-router-dom";
import AddModal from "./AddModal";
import { displaySequence, toDos } from "../../fixtures";
import { errorStyles } from "../todoDetails/TodoDetails";

const styles: CSSObject = {
  marginTop: 12,
  textAlign: "center",
  fontSize: 22,
};

const Dashboard = () => {
  const history = useHistory();
  const [allToDos, setAllToDos] = useState<Todo[]>();
  // const [allToDos, setAllToDos] = useState<Todo[]>(toDos);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    getAllTodos()
      .then((res: any) => {
        setLoading(false);
        setError(false);
        setAllToDos(res.data);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOnAdd = async (todo: AddTodo) => {
    await addTodo(todo).then((res: any) => {
      history.push(`/todo/${res.data.uuid}`);
    });
  };

  if (loading) return null;

  /** I would normally handle errors differently (more UX friendly), however this is the quickest way I came up without adding too much additional UI with a client side api */
  if (!allToDos || error) {
    return (
      <Paper sx={errorStyles}>
        <div>Whoops - looks like something went wrong.</div>
        <Button onClick={getList}>Try Again!</Button>
      </Paper>
    );
  }

  return (
    <div>
      <Button onClick={handleOpen}>Add</Button>
      <AddModal open={open} handleOpen={handleOpen} handleOnAdd={handleOnAdd} />
      <Grid columns={5} sx={styles}>
        <Grid.Col span={1}>
          <div>{displaySequence.find((v) => v.value === "1")?.label}</div>
          {allToDos
            .filter((t) => t.displaySequence === 1)
            .map((todo) => {
              return <ToDoCard todo={todo} />;
            })}
        </Grid.Col>
        <Grid.Col span={1}>
          <div>{displaySequence.find((v) => v.value === "2")?.label}</div>
          {allToDos
            .filter((t) => t.displaySequence === 2)
            .map((todo) => {
              return <ToDoCard todo={todo} />;
            })}
        </Grid.Col>
        <Grid.Col span={1}>
          <div>{displaySequence.find((v) => v.value === "3")?.label}</div>
          {allToDos
            .filter((t) => t.displaySequence === 3)
            .map((todo) => {
              return <ToDoCard todo={todo} />;
            })}
        </Grid.Col>
        <Grid.Col span={1}>
          <div>{displaySequence.find((v) => v.value === "4")?.label}</div>
          {allToDos
            .filter((t) => t.displaySequence === 4)
            .map((todo) => {
              return <ToDoCard todo={todo} />;
            })}
        </Grid.Col>
        <Grid.Col span={1}>
          <div>{displaySequence.find((v) => v.value === "5")?.label}</div>
          {allToDos
            .filter((t) => t.displaySequence === 5)
            .map((todo) => {
              return <ToDoCard todo={todo} />;
            })}
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Dashboard;
