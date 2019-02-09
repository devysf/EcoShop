import firebase from "firebase";
import { INBOX_FETCH } from "./types";

export const inboxFetch = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`users/${currentUser.uid}/inbox`)
      .on("value", snapshot => {
        if (snapshot.val() === null) {
          var snpsht = [];
          dispatch({ type: INBOX_FETCH, payload: snpsht });
        } else {
          dispatch({ type: INBOX_FETCH, payload: snapshot.val() });
        }
      });
  };
};
