import { INBOX_FETCH } from "../actions/types";

const INITIAL_STATE = {
  inbox: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INBOX_FETCH:
      return { ...state, inbox: action.payload };
    default:
      return { ...state };
  }
};
