import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";

import { Button, Icon } from "react-native-elements";

export default class RegisterForm extends Component {
  render() {
    return (
      <View>
        <Text>Register</Text>
        <TextInput placeholder="Enter email:" />
        <TextInput placeholder="Enter password:" secureTextEntry />
        <Button title="Register" backgroundColor="#009688" />
        {/* DO: change registerLogin flag */}
        <Text onPress>Do you have an account?</Text>
      </View>
    );
  }
}
