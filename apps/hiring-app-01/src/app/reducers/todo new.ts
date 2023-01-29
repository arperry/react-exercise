/** Unused */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { toDos } from "../fixtures";
import { Todo } from "../types/todo";

export interface RootState {
  all: Array<Todo>;
  selected: Todo | null;
}

const initialState: RootState = {
  all: toDos,
  selected: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state = { all: [...state.all, action.payload], selected: action.payload };
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const removeFromList = [...state.all];
      _.remove(removeFromList, {
        uuid: action.payload,
      });
      state = { all: removeFromList, selected: null };
    },
    listTodo: (state, action: PayloadAction<Todo[]>) => {
      state.all = [...action.payload];
    },
    selectTodo: (state, action: PayloadAction<Todo>) => {
      state.selected = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, listTodo, selectTodo } = todoSlice.actions;

export default todoSlice.reducer;
