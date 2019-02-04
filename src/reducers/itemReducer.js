import { ITEMS_FETCH_WITH_UID, ALL_ITEMS_FETCH } from "../actions/types";

const INITIAL_STATE = {
  itemsWithUid: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ITEMS_FETCH_WITH_UID:
      return { ...state, itemsWithUid: action.payload };

    default:
      return state;
  }
};
