import { IS_AUTHENTICATED } from "../actions/types";

export default function reducer(state = false, action) {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return action.payload;
    default:
      return state;
  }
}
