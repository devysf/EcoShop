//Note: I took advantage of below url
//https://blog.expo.io/how-to-build-a-chat-app-with-react-native-3ef8604ebb3c
import React, { Component } from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0

import firebase from "firebase";

class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.inbox.name,
    tabBarVisible: true
  });

  state = {
    messages: []
  };

  componentDidMount() {
    console.log(this.props.navigation.state.params.inbox);
    this.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
    );
  }
  componentWillUnmount() {
    this.off();
  }

  on = callback => {
    this.ref
      .limitToLast(20)
      .on("child_added", snapshot => callback(this.parse(snapshot)));
  };
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // close the connection to the Backend
  off() {
    this.ref.off();
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user
    };
    return message;
  };

  get user() {
    return {
      name: firebase.auth().currentUser.displayName,
      _id: firebase.auth().currentUser.uid
    };
  }
  nodeName = () => {
    const { name } = this.props.navigation.state.params.inbox;
    const { currentUser } = firebase.auth();

    var result = name.localeCompare(currentUser.displayName);
    var nodeName = "";
    if (result > 0) nodeName = `${name}->${currentUser.displayName}`;
    else nodeName = `${currentUser.displayName}->${name}`;
    return nodeName;
  };
  get ref() {
    var nodeName = this.nodeName();
    return firebase.database().ref(`messages/${nodeName}`);
  }

  send = messages => {
    const { text, user } = messages[0];
    const message = {
      text,
      user,
      timestamp: this.timestamp
    };
    this.ref.push(message);

    const { name, uid } = this.props.navigation.state.params.inbox;
    const { currentUser } = firebase.auth();
    var cUid = currentUser.uid;
    var cName = currentUser.displayName;

    firebase
      .database()
      .ref(`users/${currentUser.uid}/inbox/${name}`)
      .set({ name, uid });

    firebase
      .database()
      .ref(`users/${uid}/inbox/${currentUser.displayName}`)
      .set({ name: cName, uid: cUid });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.send}
          user={this.user}
          placeholder={"Type a message..."}
        />
        <KeyboardAvoidingView
          behavior={"padding"}
          keyboardVerticalOffset={80}
        />
      </View>
    );
  }
}

export default ChatScreen;
