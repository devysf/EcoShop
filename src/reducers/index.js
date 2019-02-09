import { combineReducers } from "redux";
import authReducer from "./authReducer";
import itemReducer from "./itemReducer";
import itemFormReducer from "./itemFormReducer";
import messagesReducer from "./messagesReducer";

export default combineReducers({
  auth: authReducer,
  items: itemReducer,
  itemForm: itemFormReducer,
  messages: messagesReducer
});
