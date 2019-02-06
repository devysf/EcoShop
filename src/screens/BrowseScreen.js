import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  ListView,
  Image,
  TouchableWithoutFeedback
} from "react-native";

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
        <View style={{ position: "absolute", bottom: 20, left: 0, right: 0 }}>
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
