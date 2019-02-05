import firebase from "firebase";
import {
  ITEMS_FETCH_WITH_UID,
  ALL_ITEMS_FETCH,
  ITEM_CREATE,
  ITEM_UPDATE
} from "./types";

export const itemsFetchWithUid = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/items`)
      .on("value", snapshot => {
        if (snapshot.val() === null) {
          var snpsht = [];
          dispatch({ type: ITEMS_FETCH_WITH_UID, payload: snpsht });
        } else {
          dispatch({ type: ITEMS_FETCH_WITH_UID, payload: snapshot.val() });
        }
      });
  };
};

export const allItemsFetch = () => {
  return dispatch => {
    firebase
      .database()
      .ref("/items")
      .on("value", snapshot => {
        if (snapshot.val() === null) {
          var snpsht = [];
          dispatch({ type: ALL_ITEMS_FETCH, payload: snpsht });
        } else {
          dispatch({ type: ALL_ITEMS_FETCH, payload: snapshot.val() });
        }
      });
  };
};

export const itemUpdate = ({ prop, value }) => {
  return {
    type: ITEM_UPDATE,
    payload: { prop, value }
  };
};

export const itemCreate = ({ name, description, price, image }) => {
  const { currentUser } = firebase.auth();
  var owner = currentUser.displayName;

  return dispatch => {
    firebase
      .database()
      .ref("/items")
      .push({ name, description, price, owner, image })
      .then(() => {
        dispatch({ type: ITEM_CREATE });

        firebase
          .database()
          .ref(`/users/${currentUser.uid}/items`)
          .push({ name, description, price, owner, image });
      });
  };
};
