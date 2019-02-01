import React from "react";

import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import AuthScreen from "./screens/AuthScreen";
import BrowseScreen from "./screens/BrowseScreen";
import ProfileScreen from "./screens/ProfileScreen";

//Structure of Navigation
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

//Settings of redux store
const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    );
  }
}
export default App;
