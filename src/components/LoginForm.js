import React, { Component } from "react";
import { Text, TextInput, View, ActivityIndicator } from "react-native";

import { connect } from "react-redux";
import * as actions from "../actions";

import firebase from "firebase";

import { Button } from "react-native-elements";

class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  onButtonPress = () => {
    /* DO: firebase register-login */
    console.log(this.state);
    const { email, password } = this.state;

    this.props.loginUser({ email, password });
  };

  renderButton = () => {
    if (this.props.loading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <Button
        title="Login"
        backgroundColor="#009688"
        onPress={this.onButtonPress}
      />
    );
  };

  render() {
    return (
      <View>
        <Text>Login</Text>

        <TextInput
          placeholder="Enter email:"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Enter password:"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Text style={styles.errorTextStyle}>{this.props.error}</Text>

        {this.renderButton()}

        <Text onPress={() => this.props.changeLoginRegisterFlag("register")}>
          Create Account
        </Text>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    color: "red"
  }
};
function mapStateToProps({ auth }) {
  const { error, loading } = auth;

  return { error, loading };
}
export default connect(
  mapStateToProps,
  actions
)(LoginForm);
