import React from "react";

import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./src/reducers";

import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import Ionicons from "react-native-vector-icons/Ionicons";

import AuthScreen from "./src/screens/AuthScreen";
import BrowseScreen from "./src/screens/BrowseScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import AddItemScreen from "./src/screens/AddItemScreen";
import DetailScreen from "./src/screens/DetailScreen";
import MessagesScreen from "./src/screens/MessagesScreen";
import ChatScreen from "./src/screens/ChatScreen";

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
        browse: {
          screen: createStackNavigator({
            browse: { screen: BrowseScreen },
            addItem: { screen: AddItemScreen },
            detail: { screen: DetailScreen }
          })
        },
        profile: { screen: ProfileScreen },
        messages: {
          screen: createStackNavigator({
            messages: { screen: MessagesScreen },
            chat: { screen: ChatScreen }
          })
        }
      },
      {
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = Ionicons;

            let iconName;

            if (routeName === "browse") {
              iconName = `ios-search`;
            } else if (routeName === "profile") {
              iconName = `ios-home`;
            } else if (routeName === "messages") {
              iconName = `ios-chatboxes`;
            }

            return (
              <IconComponent name={iconName} size={25} color={tintColor} />
            );
          }
        }),
        tabBarOptions: {
          activeTintColor: "blue",
          inactiveTintColor: "gray"
        },
        navigationOptions: {
          tabBarVisible: false
        }
      }
    )
  }
});

var RootNavigation = createAppContainer(MainNavigator);

//Settings of redux store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

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
