import { combineReducers } from "redux";
import authReducer from "./authReducer";
import itemReducer from "./itemReducer";
import itemFormReducer from "./itemFormReducer";
import messagesReducer from "./messagesReducer";

import { USER_LOGOUT } from "../actions/types";
const appReducer = combineReducers({
  auth: authReducer,
  items: itemReducer,
  itemForm: itemFormReducer,
  messages: messagesReducer
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = {};
  }

  return appReducer(state, action);
};

export default rootReducer;
