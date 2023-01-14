import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from 'src/store';
import { TodoType, TodoState, AddNewTodoPayload, SetUrgentPayload, DeleteTodoPayload } from 'src/store/types';
import { getAllTodos, addTodo, deleteTodo, markUrgent } from 'app/api';
import { isSuccessResponse, SuccessResponse, ErrorResponse } from 'typeDefs/response';

const initialState: TodoState = {
  data: [],
  status: 'idle',
  type: 'none'
};

export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
  const resp: SuccessResponse<TodoType> | ErrorResponse = await getAllTodos();
  if (isSuccessResponse(resp)) {
    return resp.data as TodoType[];
  } else {
    return [];
  }
});

export const addNewTodo = createAsyncThunk<TodoType[], AddNewTodoPayload>('todos/add', async (newData) => {
  const { title, duration } = newData;
  const resp: SuccessResponse<TodoType> | ErrorResponse = await addTodo(title, duration);
  if (isSuccessResponse(resp)) {
    return resp.data as TodoType[];
  } else {
    return [];
  }
});

export const setUrgent = createAsyncThunk<TodoType[], SetUrgentPayload>('todos/urgent', async (urgentData) => {
  const { uuid, flag } = urgentData;
  const resp: SuccessResponse<TodoType> | ErrorResponse = await markUrgent(uuid, flag);
  if (isSuccessResponse(resp)) {
    return resp.data as TodoType[];
  } else {
    return [];
  }
});

export const deleteTodoItem = createAsyncThunk<TodoType[], DeleteTodoPayload>('todos/delete', async (deleteData) => {
  const { uuid } = deleteData;
  const resp: SuccessResponse<TodoType> | ErrorResponse = await deleteTodo(uuid);
  if (isSuccessResponse(resp)) {
    return resp.data as TodoType[];
  } else {
    return [];
  }
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
        state.type = 'list';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'success';
        state.type = 'list';
        if (action.payload.length) {
          const data: TodoType[] = formatTodos([...action.payload]);
          /* immer.js handles push */
          state.data = [...data];
        }
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = 'error';
        state.type = 'list';
      })
      .addCase(addNewTodo.pending, (state) => {
        state.status = 'loading';
        state.type = 'added';
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.status = 'success';
        state.type = 'added';

        if (action.payload.length === 1) {
          const data: TodoType[] = formatTodos(action.payload);
          /* immer.js handles push */
          state.data.push(data[0]);
        }
      })
      .addCase(addNewTodo.rejected, (state) => {
        state.status = 'error';
        state.type = 'added';
      })
      .addCase(setUrgent.pending, (state) => {
        state.status = 'loading';
        state.type = 'update';
      })
      .addCase(setUrgent.fulfilled, (state, action) => {
        state.status = 'success';
        state.type = 'update';
        if (action.payload.length === 1) {
          const data: TodoType[] = formatTodos(action.payload);
          const newData = [...state.data].map((item) => (item.uuid !== data[0].uuid ? item : data[0]));
          state.data = newData;
        }
      })
      .addCase(setUrgent.rejected, (state) => {
        state.status = 'error';
        state.type = 'update';
      })
      .addCase(deleteTodoItem.pending, (state) => {
        state.status = 'loading';
        state.type = 'deleted';
      })
      .addCase(deleteTodoItem.fulfilled, (state, action) => {
        state.status = 'success';
        state.type = 'deleted';
        if (action.payload.length === 1) {
          const uuid = action.payload[0].uuid;
          const filtered = [...state.data].filter((item) => item.uuid !== uuid);
          state.data = filtered;
        }
      })
      .addCase(deleteTodoItem.rejected, (state) => {
        state.status = 'error';
        state.type = 'deleted';
      });
  }
});

const formatTodos = (origData: TodoType[]) => {
  const data = origData.map((item) => ({
    uuid: item.uuid ?? '',
    title: item.title ?? '',
    duration: item.duration ?? 0,
    urgent: item.urgent ?? false
  }));
  return data;
};

export const selectAllTodos = (state: RootState) => state.todos.data;
export const selectTodosStatus = (state: RootState) => state.todos.status;
export const selectTodosActionType = (state: RootState) => state.todos.type;

export const selectAllUrgentTodos = createSelector(selectAllTodos, (items) => items.filter((item) => item.urgent));

export default todosSlice.reducer;
