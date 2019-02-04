import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";

import { connect } from "react-redux";
import * as actions from "../actions";

import firebase from "firebase";

import Icon from "react-native-vector-icons/FontAwesome";
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

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User login succes.");
      })
      .catch(err => {
        console.log("Login Fail. " + err);
      });
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
        <Button
          title="Login"
          backgroundColor="#009688"
          onPress={this.onButtonPress}
        />
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
