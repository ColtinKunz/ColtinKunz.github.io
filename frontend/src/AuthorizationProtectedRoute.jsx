import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AuthorizationProtectedRoute = (props) => {
  /*
   * If the user is signed in then return the component
   * Else redirect the user to fallback Route.
   */

  const { component: Component, isLoggedIn, fallbackRoute } = props;

  if (isLoggedIn) {
    return (
      <Route
        render={(routeProps) => <Component {...routeProps} {...props} />}
      />
    );
  }
  return <Redirect to={fallbackRoute} />;
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
  };
}

export default connect(mapStateToProps, null)(AuthorizationProtectedRoute);
