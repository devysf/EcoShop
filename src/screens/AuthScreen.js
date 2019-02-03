import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import { Button } from "react-native-elements";

import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

class AuthScreen extends Component {
  render() {
    if (this.props.registerLoginFlag) {
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

function mapStateToProps({ auth }) {
  return { registerLoginFlag: auth.registerLoginFlag };
}

export default connect(mapStateToProps)(AuthScreen);
