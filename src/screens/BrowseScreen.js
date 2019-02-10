import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  ListView,
  Image,
  TouchableWithoutFeedback,
  BackHandler,
  Alert
} from "react-native";

import { connect } from "react-redux";
import * as actions from "../actions";

import firebase from "firebase";

class BrowseScreen extends Component {
  signOutUser = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.navigate("auth");
      this.props.userLogout();
    } catch (e) {
      console.log(e);
    }
  };

  onBackButtonPressed = () => {
    //DO: confirm message to log out
    Alert.alert(
      "Alert!!!",
      "Are you sure that you want to close the application?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            this.signOutUser();
          }
        }
      ],
      { cancelable: false }
    );

    return true;
  };
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackButtonPressed);

    this.props.allItemsFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ items }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(items);
  }

  renderRow = item => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.navigation.navigate("detail", { item });
        }}
      >
        <View>
          <Text>{item.name}</Text>
          <View>
            <Image
              source={{ uri: item.image }}
              style={{ width: 250, height: 250 }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  onButtonPress = () => {
    this.props.navigation.navigate("addItem");
  };

  render() {
    return (
      <View>
        <Text>BrowseScreen</Text>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
        <View style={{ position: "absolute", right: 0 }}>
          <Button
            title="Add Item"
            backgroundColor="#009688"
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items.allItems
  };
};

export default connect(
  mapStateToProps,
  actions
)(BrowseScreen);
