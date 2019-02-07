//Note: I took advantage of below url
//https://snack.expo.io/@schazers/expo-map-and-location-example
import React, { Component } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { MapView, Location, Permissions } from "expo";

import { connect } from "react-redux";
import * as actions from "../actions";

class UploadLocation extends Component {
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
    this.props.itemUpdate({ prop: "location", value: mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log(status);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied"
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: false
    });
    this.setState({ locationResult: JSON.stringify(location) });

    var mapRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421
    };
    this.props.itemUpdate({ prop: "location", value: mapRegion });
    this.setState({
      mapRegion
    });
  };

  render() {
    return (
      <View>
        {this.state.locationResult === null ? (
          <Text>Finding your current location...</Text>
        ) : this.state.hasLocationPermissions === false ? (
          <Text>Location permissions are not granted.</Text>
        ) : this.state.mapRegion === null ? (
          <Text>Map region doesn't exist.</Text>
        ) : (
          <MapView
            style={{ alignSelf: "stretch", height: 200 }}
            region={this.state.mapRegion}
            onRegionChange={this._handleMapRegionChange}
            cacheEnabled={Platform.OS === "android"}
            scrollEnabled={false}
          />
        )}
      </View>
    );
  }
}

export default connect(
  null,
  actions
)(UploadLocation);
