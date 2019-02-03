import { LOGIN_REGISTER_FLAG } from "./types";

export const changeLoginRegisterFlag = flag => {
  return {
    type: LOGIN_REGISTER_FLAG,
    payload: flag
  };
};
