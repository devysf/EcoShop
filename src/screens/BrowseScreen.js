import React, { Component } from "react";
import { View, Text } from "react-native";

import { Button } from "react-native-elements";

class BrowseScreen extends Component {
  onButtonPress = () => {
    this.props.navigation.navigate("addItem");
  };

  render() {
    console.log(this.props);

    return (
      <View>
        <Text>BrowseScreen</Text>

        <Button
          title="Add Item"
          backgroundColor="#009688"
          onPress={this.onButtonPress}
        />
      </View>
    );
  }
}

export default BrowseScreen;
