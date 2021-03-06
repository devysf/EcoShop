import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";

import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

import firebase from "firebase";
import { firebaseConfig } from "../../config/firebaseConfig";

class AuthScreen extends Component {
  componentWillMount() {
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("browse");
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("browse");
      }
    });
  }

  render() {
    if (this.props.registerLoginFlag) {
      return (
        <View style={styles.container}>
          <RegisterForm />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <LoginForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ADD8E6"
  }
});

function mapStateToProps({ auth }) {
  const { user, registerLoginFlag } = auth;

  return { user, registerLoginFlag };
}
export default connect(mapStateToProps)(AuthScreen);
