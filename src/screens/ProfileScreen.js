import React, { Component } from "react";
import { View, Text, ListView } from "react-native";

import { connect } from "react-redux";
import * as actions from "../actions";

import { Button } from "react-native-elements";

class ProfileScreen extends Component {
  componentWillMount() {
    this.props.itemsFetchWithUid();

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
    console.log(this.props);

    return (
      <View>
        <Text>ProfileScreen</Text>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items.itemsWithUid
  };
};

export default connect(
  mapStateToProps,
  actions
)(ProfileScreen);
