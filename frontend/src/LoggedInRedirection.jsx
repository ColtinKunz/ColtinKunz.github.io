import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const LoggedInRedirection = (props) => {
  /*
   * If the user is signed in then redirect the user to `redirectTo` route.
   * Else render the fallbackComponent.
   */
  const { redirectTo, isLoggedIn, fallbackComponent: Component } = props;

  if (isLoggedIn) {
    return <Redirect to={redirectTo} />;
  }
  return (
    <Route render={(routeProps) => <Component {...routeProps} {...props} />} />
  );
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
  };
}

export default connect(mapStateToProps, null)(LoggedInRedirection);
