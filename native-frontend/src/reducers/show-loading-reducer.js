import { SHOW_LOADING } from "../actions/types";

export default function reducer(state = true, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return action.payload;
    default:
      return state;
  }
}
