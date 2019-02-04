import {
  LOGIN_REGISTER_FLAG,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from "../actions/types";

const INITIAL_STATE = {
  registerLoginFlag: false,
  user: null,
  error: "",
  loading: false
};
export default function(state = INITIAL_STATE, action) {
  var flag = action.payload === "register";

  switch (action.type) {
    case LOGIN_REGISTER_FLAG:
      return { ...state, registerLoginFlag: flag };
    case LOGIN_USER:
      return { ...state, loading: true, error: "" };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload, error: "", loading: false };
    case LOGIN_USER_FAIL:
      return { ...state, error: "Fail", loading: false };
    default:
      return state;
  }
}
