import React from "react";
import { connect } from "react-redux";
import { View, TextInput, Button } from "react-native";
import * as actions from "../../actions";

function LoginView({ navigation, authenticate, verifyAccessToken }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const sendLogin = () => {
    if (username === "") {
      alert("Username cannot be blank.");
      return;
    }
    if (password === "") {
      alert("Password cannot be blank.");
      return;
    }
    authenticate(username, password, navigation);
    setUsername("");
    setPassword("");
  };

  return (
    <View className="login-box">
      <TextInput
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <Button onPress={sendLogin} title="Login" />
    </View>
  );
}

export default connect(null, actions)(LoginView);
