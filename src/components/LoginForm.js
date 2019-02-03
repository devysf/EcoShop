import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";

import { connect } from "react-redux";
import * as actions from "../actions";

import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";

class LoginForm extends Component {
  render() {
    return (
      <View>
        <Text>Login</Text>
        <TextInput placeholder="Enter email:" />
        <TextInput placeholder="Enter password:" secureTextEntry />
        {/* DO: firebase register-login */}
        <Button title="Login" backgroundColor="#009688" />
        <Text onPress={() => this.props.changeLoginRegisterFlag("register")}>
          Create Account
        </Text>
      </View>
    );
  }
}

function mapStateToProps({ auth }) {
  return { registerLoginFlag: auth.registerLoginFlag };
}
export default connect(
  mapStateToProps,
  actions
)(LoginForm);
