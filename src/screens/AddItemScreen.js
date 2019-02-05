import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";

import { Button } from "react-native-elements";

import { connect } from "react-redux";
import * as actions from "../actions";

class AddItemScreen extends Component {
  state = {
    name: "",
    description: "",
    price: ""
  };
  onButtonPress = () => {
    const { name, description, price } = this.state;
    this.props.itemCreate({
      name,
      description,
      price
    });

    this.props.navigation.navigate("browse");
  };

  handleInputChange = price => {
    if (/^\d+$/.test(price)) {
      this.setState({
        price: price
      });
    }
  };

  render() {
    return (
      <View>
        <Text>ADD ITEM</Text>
        <TextInput
          placeholder="Enter name:"
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />

        <TextInput
          placeholder="Enter description:"
          onChangeText={description => this.setState({ description })}
          value={this.state.description}
        />
        <TextInput
          keyboardType="numeric"
          placeholder="Enter price:"
          onChangeText={this.handleInputChange}
          value={this.state.price}
        />

        <Button
          title="Add Item"
          backgroundColor="#009688"
          onPress={this.onButtonPress}
        />
      </View>
    );
  }
}

export default connect(
  null,
  actions
)(AddItemScreen);
