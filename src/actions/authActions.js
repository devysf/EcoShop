import firebase from "firebase";

import {
  LOGIN_REGISTER_FLAG,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from "./types";

export const changeLoginRegisterFlag = flag => {
  return {
    type: LOGIN_REGISTER_FLAG,
    payload: flag
  };
};

export const registerUser = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log("register user succes");

        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: user
        });
      })
      .catch(err => {
        console.log("User register fail" + err);

        dispatch({ type: LOGIN_USER_FAIL });
      });
  };
};

export const loginUser = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log("User login succes.");

        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: user
        });
      })
      .catch(err => {
        console.log("Login Fail. " + err);
        dispatch({ type: LOGIN_USER_FAIL });
      });
  };
};
