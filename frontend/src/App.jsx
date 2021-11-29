import { BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";
import { CircularProgress } from "@material-ui/core";
import * as actions from "./actions";
import AuthorizationProtectedRoute from "./AuthorizationProtectedRoute";
import LoggedInRedirection from "./LoggedInRedirection";
import LoginView from "./components/loginView";
import DefaultView from "./components/defaultView";

class App extends React.Component {
  // { isLoggedIn, refreshAccessToken }

  componentDidMount() {
    const { refreshAccessToken } = this.props;
    refreshAccessToken(true);
    const interval = 4 * 60 * 1000; // every 4 minutes
    setInterval(refreshAccessToken, interval);
  }

  render() {
    const { showLoadingWheel } = this.props;

    if (showLoadingWheel) {
      return (
        <div className="loading-app-progress">
          <CircularProgress color="secondary" />
        </div>
      );
    }
    return (
      <div className="App">
        <Router>
          <Switch>
            <AuthorizationProtectedRoute
              exact
              path="/"
              component={DefaultView}
              fallbackRoute="/login"
            />
            <LoggedInRedirection
              path="/login"
              redirectTo="/"
              fallbackComponent={LoginView}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    showLoadingWheel: state.showLoadingWheel,
  };
}

export default connect(mapStateToProps, actions)(App);
