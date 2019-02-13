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
import { ListItem } from "react-native-elements";

class MessagesScreen extends Component {
  static navigationOptions = {
    title: "Messages",
    headerStyle: {
      backgroundColor: "#ADD8E6"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
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

  renderRow = (inbox, i) => {
    return (
      <ListItem
        onPress={() => {
          this.props.navigation.navigate("chat", { inbox });
        }}
        key={i}
        title={inbox.name}
        leftAvatar={{
          source: null
        }}
      />
    );
  };

  render() {
    return (
      <View>
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
