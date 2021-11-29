import React from "react";
import { connect } from "react-redux";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import * as actions from "../../actions";
import "./loginView.css";

function LoginView({ authenticate, verifyAccessToken }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  const sendLogin = () => {
    if (username === "") {
      alert("Username cannot be blank.");
      return;
    }
    if (password === "") {
      alert("Password cannot be blank.");
      return;
    }
    authenticate(username, password, history);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-box">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10} sm={10} md={8} lg={6} xl={4}>
          <Paper elevation={10}>
            <TextField
              onChange={(event) => setUsername(event.target.value)}
              value={username}
              variant="outlined"
              label="Username"
              placeholder="Enter username"
              fullWidth
              required
            />
            <TextField
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              variant="outlined"
              label="Password"
              placeholder="Enter password"
              fullWidth
              required
              type="password"
            />
            <Button
              onClick={sendLogin}
              type="submit"
              color="secondary"
              variant="contained"
              fullWidth
            >
              Login
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(null, actions)(LoginView);
