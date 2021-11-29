import React from "react";
// import { AppRegistry } from "react-native";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import App from "./src/App";
import rootReducer from "./src/reducers";
import { name as appName } from "./app.json";

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

// AppRegistry.registerComponent(appName, () => RNRedux);
registerRootComponent(RNRedux);
