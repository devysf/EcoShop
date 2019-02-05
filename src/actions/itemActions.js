import firebase from "firebase";
import { ITEMS_FETCH_WITH_UID, ALL_ITEMS_FETCH, ITEM_CREATE } from "./types";

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
        dispatch({ type: ALL_ITEMS_FETCH, payload: snapshot.val() });
      });
  };
};

export const itemCreate = ({ name, description, price }) => {
  const { currentUser } = firebase.auth();
  var owner = currentUser.displayName;

  return dispatch => {
    firebase
      .database()
      .ref("/items")
      .push({ name, description, price, owner })
      .then(() => {
        dispatch({ type: ITEM_CREATE });

        firebase
          .database()
          .ref(`/users/${currentUser.uid}/items`)
          .push({ name, description, price, owner });
      });
  };
};
