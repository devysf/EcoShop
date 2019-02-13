// DO: users can edit your profile photo
//Also, can edit,delete your item
import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ListView,
  Image
} from "react-native";

import { connect } from "react-redux";
import * as actions from "../actions";

import { Card, Button, Icon } from "react-native-elements";

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
      <View style={styles.item}>
        <Text>{item.name}</Text>
        <View>
          <Image
            source={{ uri: item.image }}
            style={{ width: 100, height: 100 }}
          />
        </View>
      </View>
    );
  }

  renderRow2(item) {
    return (
      <View style={styles.item}>
        <Card title={item.name ? item.name : null} image={{ uri: item.image }}>
          <Text style={{ marginBottom: 10 }}>{item.description}</Text>
        </Card>
      </View>
    );
  }

  onButtonPress = () => {
    this.props.navigation.navigate("addItem");
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header} />

        <Image
          style={styles.avatar}
          source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
        />

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>John Doe</Text>
          </View>
        </View>

        <View>
          <ListView
            contentContainerStyle={styles.list}
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow2}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  item: {
    margin: 5,
    width: 150
  },
  header: {
    backgroundColor: "#ADD8E6",
    height: 100
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 50
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  }
});

const mapStateToProps = state => {
  return {
    items: state.items.itemsWithUid
  };
};

export default connect(
  mapStateToProps,
  actions
)(ProfileScreen);
