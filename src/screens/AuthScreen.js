import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

import firebase from "firebase";
import { firebaseConfig } from "../../config/firebaseConfig";

class AuthScreen extends Component {
  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
    //i made below code comment line because of easy debugging
    //if (this.props.user)
    this.props.navigation.navigate("browse");
  }

  componentWillReceiveProps(nextProps) {
    //i made below code comment line because of easy debugging
    //if (nextProps.user)
    this.props.navigation.navigate("browse");
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
  const { user, registerLoginFlag } = auth;

  return { user, registerLoginFlag };
}
export default connect(mapStateToProps)(AuthScreen);
