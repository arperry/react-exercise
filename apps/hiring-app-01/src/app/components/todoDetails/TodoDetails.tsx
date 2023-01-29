import { Button, CSSObject, Paper } from "@mantine/core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { deleteTodo, getTodo } from "../../api";
import { Todo } from "../../types/todo";

const styles: CSSObject = {
  textAlign: "center",
  width: "50%",
  margin: "auto",
  fontSize: 22,
  padding: 20,
};

export const errorStyles: CSSObject = {
  ...styles,
  display: "flex",
  flexDirection: "column",
  width: "fit-content",
};

type ToDoDetailsParams = {
  // Todo ID from route
  id: string;
};

const TodoDetails = () => {
  const history = useHistory();
  const params = useParams<ToDoDetailsParams>();
  const id = params.id;
  const [details, setDetails] = useState<Todo>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    getTodo(id)
      .then((res: any) => {
        setLoading(false);
        setError(false);
        setDetails(res.data.todo);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  const handleOnDelete = async () => {
    await deleteTodo(id).then(() => {
      history.push(`/`);
    });
  };

  const backToDashboard = () => {
    history.push("/");
  };

  if (loading) return null;

  /** All data is lost on refresh - resulting in !details = true always. Would handle this differently in production environment when the api was not client side. */

  if (!details || error) {
    return (
      <Paper sx={errorStyles}>
        <div>Whoops - looks like something went wrong.</div>
        <Button onClick={getDetails}>Try Again!</Button>
        <div>Or</div>
        <Button onClick={backToDashboard}>Go Back</Button>
      </Paper>
    );
  }

  console.log(details);
  return (
    <div>
      <Button onClick={backToDashboard}>Back</Button>
      <Paper sx={styles} bg={details.color}>
        <div>{details.title}</div>
        <div>Completed in: {details.duration} minutes</div>
        <Button onClick={handleOnDelete}>Delete</Button>
      </Paper>
    </div>
  );
};

export default TodoDetails;
