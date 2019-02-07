import React, { Component } from "react";
import { Text, View, Image, Platform, ScrollView } from "react-native";
import { MapView } from "expo";

export default class DetailScreen extends Component {
  render() {
    const {
      name,
      description,
      price,
      owner,
      image,
      location
    } = this.props.navigation.state.params.item;

    return (
      <ScrollView>
        <Text> Details Page </Text>
        <Text> {name}</Text>
        <Text> {description}</Text>
        <Text> {price} $</Text>
        <Text> {owner}</Text>

        <View>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>

        <MapView
          style={{ alignSelf: "stretch", height: 200 }}
          region={location}
          cacheEnabled={Platform.OS === "android"}
          scrollEnabled={false}
        />
      </ScrollView>
    );
  }
}
