import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ScrollView
} from "react-native";
import { MapView } from "expo";
import firebase from "firebase";

import { Card, Button, Icon } from "react-native-elements";

export default class DetailScreen extends Component {
  static navigationOptions = {
    title: "Details",
    headerStyle: {
      backgroundColor: "#ADD8E6"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

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
        <View>
          <Button
            title={`Send message to ${owner}`}
            onPress={this.onButtonPress}
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
        <Card title={name ? name : null} image={{ uri: image }}>
          <Text style={styles.headline}>{description}</Text>
          <Text style={styles.headline}>{price}$</Text>
          <Text style={styles.headline}> by {owner}</Text>
          <MapView
            style={{ alignSelf: "stretch", height: 200 }}
            region={location}
            cacheEnabled={Platform.OS === "android"}
            scrollEnabled={false}
          />
          {this.renderMessageButton()}
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headline: {
    textAlign: "center", // <-- the magic
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 0,
    width: 200
  }
});
