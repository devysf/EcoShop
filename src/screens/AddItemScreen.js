import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";

import { Button } from "react-native-elements";

import { connect } from "react-redux";
import * as actions from "../actions";
import UploadImage from "../components/UploadImage";

class AddItemScreen extends Component {
  onButtonPress = () => {
    const { name, description, price, image } = this.props;
    this.props.itemCreate({
      name,
      description,
      price,
      image
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
      <View>
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

        <Button
          title="Add Item"
          backgroundColor="#009688"
          onPress={this.onButtonPress}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { name, description, price, image } = state.itemForm;

  return { name, description, price, image };
};

export default connect(
  mapStateToProps,
  actions
)(AddItemScreen);
