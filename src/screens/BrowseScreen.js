import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  Image,
  TouchableWithoutFeedback,
  BackHandler,
  Alert
} from "react-native";
import { Card, Button, Icon } from "react-native-elements";

import { connect } from "react-redux";
import * as actions from "../actions";

import firebase from "firebase";

class BrowseScreen extends Component {
  static navigationOptions = {
    title: "Browse",
    headerStyle: {
      backgroundColor: "#ADD8E6"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

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
    console.log(item.name);
    return (
      <View>
        <Card title={item.name ? item.name : null} image={{ uri: item.image }}>
          <Text style={{ marginBottom: 10 }}>{item.description}</Text>
          <Button
            onPress={() => {
              this.props.navigation.navigate("detail", { item });
            }}
            icon={<Icon name="code" color="#ffffff" />}
            backgroundColor="#03A9F4"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title="VIEW NOW"
          />
        </Card>
      </View>
    );
  };

  onButtonPress = () => {
    this.props.navigation.navigate("addItem");
  };

  render() {
    return (
      <View>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
        <View style={{ position: "absolute", bottom: 15, left: 15, right: 15 }}>
          <Button
            title="  Add Item"
            onPress={this.onButtonPress}
            icon={<Icon name="plus" type="font-awesome" color="#ffffff" />}
            buttonStyle={{
              backgroundColor: "#00D8E6",
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
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
