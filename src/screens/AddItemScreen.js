import React, { Component } from "react";
import { ScrollView, View, Text, TextInput, Button } from "react-native";

import { connect } from "react-redux";
import * as actions from "../actions";

import UploadImage from "../components/UploadImage";
import UploadLocation from "../components/UploadLocation";

class AddItemScreen extends Component {
  onButtonPress = () => {
    const { name, description, price, image, location } = this.props;
    this.props.itemCreate({
      name,
      description,
      price,
      image,
      location
    });

    this.props.navigation.navigate("browse");
  };

  handleInputChange = value => {
    if (/^\d+$/.test(value)) {
      this.props.itemUpdate({ prop: "price", value });
    }
  };

  render() {
    return (
      <ScrollView>
        <Text>ADD ITEM</Text>
        <TextInput
          placeholder="Enter name:"
          value={this.props.name}
          onChangeText={value => this.props.itemUpdate({ prop: "name", value })}
        />

        <TextInput
          placeholder="Enter description:"
          value={this.props.description}
          onChangeText={value =>
            this.props.itemUpdate({ prop: "description", value })
          }
        />
        <TextInput
          keyboardType="numeric"
          placeholder="Enter price:"
          onChangeText={this.handleInputChange}
          value={this.props.price}
        />

        <View>
          <UploadImage />
        </View>

        <View>
          <UploadLocation />
        </View>

        <View style={{ position: "absolute", bottom: 20, left: 0, right: 0 }}>
          <Button
            title="Add Item"
            backgroundColor="#009688"
            onPress={this.onButtonPress}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { name, description, price, image, location } = state.itemForm;

  return { name, description, price, image, location };
};

export default connect(
  mapStateToProps,
  actions
)(AddItemScreen);
