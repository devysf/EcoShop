import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";

export default class LoginForm extends Component {
  render() {
    return (
      <View>
        <Text>Login</Text>
        <TextInput placeholder="Enter email:" />
        <TextInput placeholder="Enter password:" secureTextEntry />
        <Button title="Login" backgroundColor="#009688" />
        {/* DO: change registerLogin flag */}
        <Text onPress>Create Account</Text>
      </View>
    );
  }
}
