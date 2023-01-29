import { Todo } from "../types/todo";

const init = [
  {
    color: "#FFF",
    completed: true,
    displaySequence: 1,
    duration: 60 * 1,
    title: "Clone and try to run coding assessment",
  },
  {
    color: "#CCCCFF", //Periwinkle
    completed: true,
    displaySequence: 2,
    duration: 60 * 1,
    title: "Install Babel preloader and run assessment",
  },
  {
    color: "#CCCCFF", //Periwinkle
    completed: true,
    displaySequence: 2,
    duration: 0,
    title: "Brainstorm design and functionality",
  },
  {
    color: "#A7C7E7", //Pastel Blue
    completed: true,
    displaySequence: 3,
    duration: 60 * 3,
    title: "Begin coding",
  },
  {
    color: "#96DED1", //Robin Egg
    completed: false,
    displaySequence: 4,
    duration: 60 * 5,
    title: "Finish assessment and create PR",
  },
  {
    color: "#C1E1C1", // Lime
    completed: false,
    displaySequence: 5,
    duration: 0,
    title: "Get The Job!",
  },
];

export const initToDoList = () => {
  return init.map((todo) => {
    return new Todo({
      color: todo.color,
      completed: todo.completed,
      displaySequence: todo.displaySequence,
      duration: todo.duration,
      title: todo.title,
    });
  });
};
const toDos: Array<Todo> = initToDoList();

export default toDos;
