import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
  TouchableHighlight
} from "react-native";

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
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://img.icons8.com/ios-glyphs/30/000000/user.png"
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Enter name:"
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://img.icons8.com/ios-glyphs/30/000000/new-post.png"
            }}
          />

          <TextInput
            style={styles.inputs}
            placeholder="Enter email:"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://img.icons8.com/ios-glyphs/30/000000/lock-2.png"
            }}
          />

          <TextInput
            style={styles.inputs}
            secureTextEntry
            placeholder="Enter password:"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>

        <Text style={styles.errorTextStyle}>{this.props.error}</Text>

        {this.renderButton()}

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => this.props.changeLoginRegisterFlag("login")}
        >
          <Text>Do you have an account?</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  errorTextStyle: {
    color: "red"
  }
});

function mapStateToProps({ auth }) {
  const { error, loading } = auth;

  return { error, loading };
}

export default connect(
  mapStateToProps,
  actions
)(RegisterForm);
