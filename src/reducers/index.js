import { combineReducers } from "redux";
import authReducer from "./authReducer";
import itemReducer from "./itemReducer";
import itemFormReducer from "./itemFormReducer";

export default combineReducers({
  auth: authReducer,
  items: itemReducer,
  itemForm: itemFormReducer
});
