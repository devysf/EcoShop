import React, { Component } from "react";
import { Text, View, Button, Image, Platform, ScrollView } from "react-native";
import { MapView } from "expo";
import firebase from "firebase";

export default class DetailScreen extends Component {
  onButtonPress = () => {
    console.log(this.props.navigation.state);
    var { owner, uid } = this.props.navigation.state.params.item;
    var inbox = {
      name: owner,
      uid: uid
    };
    this.props.navigation.navigate("chat", { inbox });
  };

  renderMessageButton = () => {
    var { owner, uid } = this.props.navigation.state.params.item;
    const { displayName } = firebase.auth().currentUser;
    console.log(owner);
    console.log(displayName);

    if (owner !== displayName) {
      return (
        <View style={{ position: "absolute", bottom: 20, left: 0, right: 0 }}>
          <Button
            title="Send a message"
            backgroundColor="#009688"
            onPress={() => this.onButtonPress()}
          />
        </View>
      );
    }
    return null;
  };

  render() {
    const {
      name,
      description,
      price,
      owner,
      uid,
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
        {this.renderMessageButton()}
      </ScrollView>
    );
  }
}
