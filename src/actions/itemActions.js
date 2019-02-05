import firebase from "firebase";
import { ITEMS_FETCH_WITH_UID, ALL_ITEMS_FETCH } from "./types";

export const itemsFetchWithUid = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/items`)
      .on("value", snapshot => {
        dispatch({ type: ITEMS_FETCH_WITH_UID, payload: snapshot.val() });
      });
  };
};

export const allItemsFetch = () => {
  return dispatch => {
    firebase
      .database()
      .ref("/items")
      .on("value", snapshot => {
        dispatch({ type: ALL_ITEMS_FETCH, payload: snapshot.val() });
      });
  };
};
