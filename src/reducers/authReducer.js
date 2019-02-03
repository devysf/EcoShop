import { LOGIN_REGISTER_FLAG } from "../actions/types";

const INITIAL_STATE = {
  registerLoginFlag: false,
  user: null,
  error: ""
};
export default function(state = INITIAL_STATE, action) {
  var flag = action.payload === "register";

  switch (action.type) {
    case LOGIN_REGISTER_FLAG:
      return { ...state, registerLoginFlag: flag };
    default:
      return state;
  }
}
