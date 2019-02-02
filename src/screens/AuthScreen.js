import React, { Component } from "react";
import { View, Text } from "react-native";

import { Button } from "react-native-elements";

import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

class AuthScreen extends Component {
  state = {
    registerLogin: true
  };

  render() {
    if (this.state.registerLogin) {
      return (
        <View>
          <RegisterForm />
        </View>
      );
    }
    return (
      <View>
        <LoginForm />
      </View>
    );
  }
}

export default AuthScreen;
