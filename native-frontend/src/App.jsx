import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { connect } from "react-redux";
import React from "react";
import { View, Text } from "react-native";
import DefaultView from "./components/defaultView";
import LoginView from "./components/loginView";
import * as actions from "./actions";

const Stack = createNativeStackNavigator();

class App extends React.Component {
  componentDidMount() {
    const { refreshAccessToken } = this.props;
    refreshAccessToken(true);

    const interval = 4 * 60 * 1000; // every 4 minutes
    setInterval(refreshAccessToken, interval);
  }

  render() {
    const { isLoggedIn, showLoading } = this.props;

    if (showLoading) {
      return (
        <View className="loading-app-progress">
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen name="Home" component={DefaultView} />
          ) : (
            <Stack.Screen name="Login" component={LoginView} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
    showLoading: state.showLoading,
  };
}

export default connect(mapStateToProps, actions)(App);
