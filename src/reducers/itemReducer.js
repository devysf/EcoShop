import {
  ITEMS_FETCH_WITH_UID,
  ALL_ITEMS_FETCH,
  ITEM_CREATE
} from "../actions/types";

const INITIAL_STATE = {
  itemsWithUid: [],
  allItems: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ITEMS_FETCH_WITH_UID:
      return { ...state, itemsWithUid: action.payload };
    case ALL_ITEMS_FETCH:
      return { ...state, allItems: action.payload };
    case ITEM_CREATE:
      return { ...state };
    default:
      return state;
  }
};
