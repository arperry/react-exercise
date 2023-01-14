export type TodoType = {
  uuid: string | unknown;
  title: string | unknown;
  duration: number | unknown;
  urgent: boolean | unknown;
};

export type AddNewTodoPayload = {
  title: string;
  duration: number;
};

export type SetUrgentPayload = {
  uuid: string;
  flag: boolean;
};

export type DeleteTodoPayload = {
  uuid: string;
};

export type TodoState = {
  data: TodoType[];
  status: 'idle' | 'loading' | 'success' | 'error';
  type: 'added' | 'list' | 'deleted' | 'update' | 'none';
};
