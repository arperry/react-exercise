/** Unused */
import _ from "lodash";
import { Todo } from "../types/todo";

export type RootState = {
  todo: {
    all: Todo[];
    selected: Todo;
  };
};
type Action = {
  type: string;
  payload: any;
};
const defaultState = {
  all: [],
  selected: null,
};

export default function todo(state = defaultState, action: Action) {
  switch (action.type) {
    /** Get All To Dos*/
    case "GET_ALL_TODOS": {
      return {
        all: [...state.all, action.payload.data],
      };
    }
    case "ADD_TODO": {
      return {
        all: [...state.all, action.payload.data],
        selected: action.payload.data,
      };
    }
    case "REMOVE_TODO": {
      let allList = [...state.all];
      delete allList[action.payload.data.uuid];
      return {
        all: allList,
        selected: null,
      };
    }
    case "UPDATE_TODO": {
      let allList = [...state.all];
      // let index = _.findIndex(allList, {
      //   uuid: action.payload.data,
      // });
      // allList[index] = action.payload.data;
      return {
        all: allList,
        selected: action.payload.data,
      };
    }
    default:
      return state;
  }
}
