import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import AuthScreen from "./screens/AuthScreen";
import BrowseScreen from "./screens/BrowseScreen";
import ProfileScreen from "./screens/ProfileScreen";

const MainNavigator = createBottomTabNavigator({
  auth: {
    screen: AuthScreen,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  main: {
    screen: createBottomTabNavigator(
      {
        browse: { screen: BrowseScreen },
        profile: { screen: ProfileScreen }
      },
      {
        navigationOptions: {
          tabBarVisible: false
        }
      }
    )
  }
});

const RootNavigation = createAppContainer(MainNavigator);

class App extends React.Component {
  render() {
    return <RootNavigation />;
  }
}
export default App;
