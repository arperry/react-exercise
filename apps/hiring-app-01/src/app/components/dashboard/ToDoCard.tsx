import { Card, CSSObject } from "@mantine/core";
import { Link } from "react-router-dom";
import { Todo } from "../../types/todo";

export type ToDoCardProps = {
  // Todo Details
  todo: Todo;
};

const styles: CSSObject = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",

  /** Styles partially used from: https://codepen.io/jweden/pen/kGBBpM */
  width: 250,
  height: 240,
  background: "#ffa",
  margin: "30px auto",
  padding: "20px",
  borderRadius: "0 0 0 30px/45px",
  boxShadow:
    "inset 0 -40px 40px rgba(0,0,0,0.1), inset 0 25px 10px rgba(0,0,0,0.1), 0 5px 6px 5px rgba(0,0,0,0.1)",

  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    width: 20,
    height: 25,
    background: "#fff",
    boxShadow:
      "3px -2px 10px rgba(0,0,0,0.1), inset 15px -15px 15px rgba(0,0,0,0.2)",
    left: 0,
    bottom: 0,
    zIndex: 2,
    transform: "skewX(25deg)",
  },
};
const ToDoCard = ({ todo }: ToDoCardProps) => {
  return (
    <Link to={`/todo/${todo.uuid}`}>
      <Card
        sx={styles}
        bg={todo.color}
        td={todo.completed ? "line-through" : ""}
      >
        <div style={{ textDecoration: "none" }}>{todo.title}</div>
        <div>Est. Time: {todo.duration}</div>
      </Card>
    </Link>
  );
};

export default ToDoCard;
