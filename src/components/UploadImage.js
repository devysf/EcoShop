//Note: I took advantage of below url
//https://github.com/expo/firebase-storage-upload-example/blob/master/App.js
import React from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import { ImagePicker, Permissions } from "expo";
import uuid from "uuid";
import * as firebase from "firebase";

import { connect } from "react-redux";
import * as actions from "../actions";

console.disableYellowBox = true;

const url =
  "https://firebasestorage.googleapis.com/v0/b/ecoshop-c0838.appspot.com/o/Obsidian.jar?alt=media&token=574c4b95-8eee-40f2-bbdd-d8716b77e3f4";
class UploadImage extends React.Component {
  state = {
    uploading: false
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <Button onPress={this._pickImage} title="Pick an image from galery" />

          <Button onPress={this._takePhoto} title="Take a photo" />
        </View>

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center"
            }
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.props;
    if (!image) {
      return;
    }

    return (
      <View>
        <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
      </View>
    );
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        value = await uploadImageAsync(pickerResult.uri);
        this.props.itemUpdate({ prop: "image", value });
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };
}

const mapStateToProps = state => {
  const { image } = state.itemForm;

  return { image };
};

export default connect(
  mapStateToProps,
  actions
)(UploadImage);

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}
