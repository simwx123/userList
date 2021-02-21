import * as actionTypes from "./actionTypes";
import { modelKey, listmap } from "../util/common";

const initialState: UsersState = {
  users: [],
};

const reducer = (
  state: UsersState = initialState,
  action: UsersAction
): UsersState => {
  const newState: uList = action.user;
  switch (action.type) {
    case actionTypes.GET_USERS:
      let meta = {};
      if (action.page) {
        meta = {
          [modelKey("p", action)]: newState.map((value: any) => value.id),
          [modelKey("t", action)]: action.total,
        };
      }

      return Object.assign({
        ...state,
        users: { ...state.users, ...listmap(newState), ...meta },
      });
  }
  return state;
};

export default reducer;
