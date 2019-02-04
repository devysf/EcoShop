import firebase from "firebase";
import { ITEMS_FETCH_WITH_UID } from "./types";

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
