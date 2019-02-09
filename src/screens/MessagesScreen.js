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

class MessagesScreen extends Component {
  componentWillMount() {
    //feth inbox
    this.props.inboxFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ inbox }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(inbox);
  }

  renderRow = inbox => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          //Go to one to one message screen
          console.log("inbox: renderrow");
          console.log(inbox);
          this.props.navigation.navigate("chat", { inbox });
        }}
      >
        <View>
          <Text>{inbox.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <View>
        <Text>MessagesScreen</Text>
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
    inbox: state.messages.inbox
  };
};

export default connect(
  mapStateToProps,
  actions
)(MessagesScreen);
