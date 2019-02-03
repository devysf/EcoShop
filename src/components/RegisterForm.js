import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";

import { connect } from "react-redux";
import * as actions from "../actions";

import { Button, Icon } from "react-native-elements";

class RegisterForm extends Component {
  render() {
    return (
      <View>
        <Text>Register</Text>
        <TextInput placeholder="Enter email:" />
        <TextInput placeholder="Enter password:" secureTextEntry />
        {/* DO: firebase register-login */}
        <Button title="Register" backgroundColor="#009688" />
        <Text onPress={() => this.props.changeLoginRegisterFlag("login")}>
          Do you have an account?
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
)(RegisterForm);
