import React, { Component } from "react";
import { View, Text } from "react-native";

import { Button } from "react-native-elements";

class AuthScreen extends Component {
  render() {
    return (
      <View>
        <Text>Auth</Text>
        <Button
          title="To Other Screens"
          backgroundColor="#03A9F4"
          onPress={() => this.props.navigation.navigate("browse")}
        />
      </View>
    );
  }
}

export default AuthScreen;
