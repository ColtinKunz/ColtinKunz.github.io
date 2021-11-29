import { SHOW_LOADING_WHEEL } from "../actions/types";

export default function reducer(state = true, action) {
  switch (action.type) {
    case SHOW_LOADING_WHEEL:
      return action.payload;
    default:
      return state;
  }
}
