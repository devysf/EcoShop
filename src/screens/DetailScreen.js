import React, { Component } from "react";
import { Text, View, Image } from "react-native";

export default class DetailScreen extends Component {
  render() {
    const {
      name,
      description,
      image
    } = this.props.navigation.state.params.item;

    return (
      <View>
        <Text> Details Page </Text>
        <Text> {name}</Text>
        <Text> {description}</Text>
        <View>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
        <Text>Map will place here</Text>
      </View>
    );
  }
}
