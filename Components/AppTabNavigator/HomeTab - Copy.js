import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button, Alert } from "react-native";

import { Icon } from "native-base";

class HomeTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-alarm" style={{ color: tintColor }} />
    )
  };
  
  render() {
    return (
      <View style={styles.MainContainer}>
        <TouchableOpacity style = {styles.TouchableOpacityStyle}>
        <Text style = {styles.TextStyle2}>Absen Masuk</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.TouchableOpacityStyle}>
        <Text style = {styles.TextStyle2}>Absen Pulang</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default HomeTab;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 10
  },
  TouchableOpacityStyle:{
    width: '50%',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f0fc'
  },
  TextStyle2:{
    color: '#ffff',
    textAlign: 'center'
  }
});
