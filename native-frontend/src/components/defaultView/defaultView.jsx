import React from "react";
import { connect } from "react-redux";
import { View, Text, Image, Button, Linking } from "react-native";
import * as actions from "../../actions";

const logo = require("./logo.svg");

function DefaultView({ navigation, logout, isLoggedIn }) {
  if (!isLoggedIn) {
    navigation.navigate("Login");
  }
  return (
    <View className="App">
      <View className="App-header">
        <Image source={logo} className="App-logo" alt="logo" />
        <Text>Edit src/App.js and save to reload.</Text>
        <Text
          className="App-link"
          onPress={() =>
            Linking.openURL("https://reactnative.dev/docs/tutorial")
          }
        >
          Learn React
        </Text>
      </View>
      <Button onPress={logout} title="Logout" />
    </View>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
  };
}

export default connect(mapStateToProps, actions)(DefaultView);
