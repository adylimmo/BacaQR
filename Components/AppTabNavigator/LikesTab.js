import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Icon } from "native-base";

class LikesTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-heart" style={{ color: tintColor }} />
    )
  };

  constructor(props) {
    super(props)
    this.state = {
      dataqr: '',
      status: 'Ready'
    };
  }

  onSuccess(e) {
    this.setState({
      dataqr:this.state.dataqr+''+e.data,
      status: 'Coba Lagi'
    })
    Alert.alert(
      'QR Code',
      'Code : '+e.data,
      [
        {text: 'OK', onPress: () => console.log('OK PRess')},
      ],
      { cancelable: false}
    )
    //this.props.navigation.navigate('Second') //setelah scan ke screen second
  }
  render (){
    return (
      <View style={styles.conMain}>
          <View style={styles.conQR}>
            <QRCodeScanner
            onRead={this.onSuccess.bind(this)}
            ref={(node) => { this.scanner = node }}
            topContent={
              <View>
                <Text style={styles.centerText}>
                Silahkan Ulang
                </Text>
                <Button
                onPress={() => {
                  this.scanner.reactivate()
                  this.setState({status:'Ready'})
                }}
                title={this.state.status}
                />
              </View>
            }
            bottomContent={
              <View>
                <Text>Code {this.state.dataqr} </Text>
                <TextInput
                value = {this.state.dataqr} 
                placeholder= 'Masukin Nama Lo'
                />
              </View>
            }
            />
            </View>
      </View>
    );
  }
}
export default LikesTab;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 10
  },

  TextStyle: {
    fontSize: 26,
    textAlign: "center",
    color: "#009688",
    marginBottom: 20
  },
  conMain : {
    flex:1
  },
  conQR : {
    flex:8,
    padding: 5
  },
  centerText: {
    fontSize: 12,
    color: '#777',
  },
});
