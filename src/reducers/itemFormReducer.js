import { ITEM_UPDATE, ITEM_CREATE } from "../actions/types";

const INITIAL_STATE = {
  name: "",
  description: "",
  price: "",
  image: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ITEM_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };

    case ITEM_CREATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};
