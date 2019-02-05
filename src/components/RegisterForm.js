import React, { Component } from "react";
import { Text, TextInput, View, ActivityIndicator } from "react-native";

import { connect } from "react-redux";
import * as actions from "../actions";

import firebase from "firebase";

import { Button, Icon } from "react-native-elements";

class RegisterForm extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  onButtonPress = () => {
    /* DO: firebase register-login */
    console.log(this.state);

    const { name, email, password } = this.state;

    this.props.registerUser({ name, email, password });
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
        title="Register"
        backgroundColor="#009688"
        onPress={this.onButtonPress}
      />
    );
  };

  render() {
    return (
      <View>
        <Text>Register</Text>

        <TextInput
          placeholder="Enter name:"
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />

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

        <Text onPress={() => this.props.changeLoginRegisterFlag("login")}>
          Do you have an account?
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
)(RegisterForm);
