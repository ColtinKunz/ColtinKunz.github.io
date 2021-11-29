import { combineReducers } from "redux";
import IsLoggedInReducer from "./is-logged-in-reducer";
import ShowLoadingWheelReducer from "./show-loading-wheel-reducer";

const rootReducer = combineReducers({
  isLoggedIn: IsLoggedInReducer,
  showLoadingWheel: ShowLoadingWheelReducer,
});

export default rootReducer;
