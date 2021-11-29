import React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import logo from "./logo.svg";
import "./defaultView.css";
import * as actions from "../../actions";

function DefaultView({ logout }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          <code>
            src/App.js
          </code>
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Button color="secondary" variant="contained" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

export default connect(null, actions)(DefaultView);
