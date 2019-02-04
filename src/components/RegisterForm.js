import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";

import { connect } from "react-redux";
import * as actions from "../actions";

import firebase from "firebase";

import { Button, Icon } from "react-native-elements";

class RegisterForm extends Component {
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
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("register user succes");
      })
      .catch(err => {
        console.log("User register fail" + err);
      });
  };
  render() {
    return (
      <View>
        <Text>Register</Text>

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
          title="Register"
          backgroundColor="#009688"
          onPress={this.onButtonPress}
        />
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