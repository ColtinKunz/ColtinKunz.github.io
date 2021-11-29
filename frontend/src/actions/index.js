import axios from "axios";
import { IS_AUTHENTICATED, SHOW_LOADING_WHEEL } from "./types";
import { apiUrl } from "../config";

axios.defaults.baseURL = `${apiUrl}`;
axios.defaults.withCredentials = true;
axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const authenticate = (username, password, history) => (dispatch) => {
  axios
    .post("auth/login/", { username, password })
    .then((response) => {
      dispatch({ type: IS_AUTHENTICATED, payload: true });
      history.push("/");
    })
    .catch((error) => {
      alert("Invalid username or password.");
      dispatch({ type: IS_AUTHENTICATED, payload: false });
    });
};

export const verifyAccessToken =
  (recurse = true) =>
  (dispatch) => {
    axios
      .post("auth/verify/")
      .then((response) => {
        dispatch({ type: IS_AUTHENTICATED, payload: true });
      })
      .catch((error) => {
        if (recurse) {
          axios
            .post("auth/verify/refresh/")
            .then((response) => {
              verifyAccessToken(false);
            })
            .catch((refreshError) => {
              dispatch({ type: IS_AUTHENTICATED, payload: false });
            });
        } else {
          dispatch({ type: IS_AUTHENTICATED, payload: false });
        }
      });
  };

export const refreshAccessToken =
  (firstCall = false) =>
  async (dispatch) => {
    try {
      await axios.post("auth/verify/refresh/");
      await axios.post("auth/refresh/");
      dispatch({ type: IS_AUTHENTICATED, payload: true });
    } catch (e) {
      dispatch({ type: IS_AUTHENTICATED, payload: false });
    }
    if (firstCall) {
      dispatch({ type: SHOW_LOADING_WHEEL, payload: false });
    }
  };

export const logout = () => (dispatch) => {
  axios
    .post("auth/logout/")
    .then((response) => {
      dispatch({ type: IS_AUTHENTICATED, payload: false });
    })
    .catch((error) => {
      dispatch({ type: IS_AUTHENTICATED, payload: false });
    });
};
