import { combineReducers } from "redux";
import IsLoggedInReducer from "./is-logged-in-reducer";
import ShowLoadingReducer from "./show-loading-reducer";

const rootReducer = combineReducers({
  isLoggedIn: IsLoggedInReducer,
  showLoading: ShowLoadingReducer,
});

export default rootReducer;
