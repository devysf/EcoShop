import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import { Button } from "react-native-elements";

import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

import firebase from "firebase";

class AuthScreen extends Component {
  componentWillMount() {
    var config = {
      apiKey: "AIzaSyD2np5C0C16dh46rGZugUtv9lRHoUgkX4U",
      authDomain: "ecoshop-c0838.firebaseapp.com",
      databaseURL: "https://ecoshop-c0838.firebaseio.com",
      projectId: "ecoshop-c0838",
      storageBucket: "ecoshop-c0838.appspot.com",
      messagingSenderId: "469877786437"
    };
    firebase.initializeApp(config);
  }

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
