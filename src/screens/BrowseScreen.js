import React, { Component } from "react";
import { View, Text, ListView } from "react-native";

import { Button } from "react-native-elements";

import { connect } from "react-redux";
import * as actions from "../actions";

class BrowseScreen extends Component {
  componentWillMount() {
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

  renderRow(item) {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  }

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
  return {
    items: state.items.allItems
  };
};

export default connect(
  mapStateToProps,
  actions
)(BrowseScreen);
