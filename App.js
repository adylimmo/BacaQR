import React, { Component } from 'react';

import {
Text,
StyleSheet,
TextInput,
View,
Alert,
TouchableOpacity
} from 'react-native';

import { StackNavigator } from 'react-navigation'

class InputUsers extends Component {
  static navigationOptions = {
    title: 'Input Users'
  }

  constructor(props){
    super(props)
    this.state = {
      TextInputName : '',
      TextInputEmail : '',
      TextInputPhoneNumber : ''
    }
  }

  InsertUsers = () => {
    const {TextInputName} = this.state;
    const {TextInputEmail} = this.state;
    const {TextInputPhoneNumber} = this.state;

    // Alert.alert('Proses Simpan');
    fetch('http://202.51.114.235/crudrn/insert.php',{
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        name : TextInputName,
        email: TextInputEmail,
        nomor_telpon: TextInputPhoneNumber,
      })
    }).then((response) => response.json())
    .then((responseJson) => {
      Alert.alert(responseJson);

    }).catch((error) =>{
      console.error(error);
    })
  }

  ViewUsersList = () => {
    this.props.navigation.navigate('Second')
  }

  render() {
    return (
      <View style = {styles.Container}>
        <TextInput 
        placeholder= 'Masukin Nama Lo'
        onChangeText = {TextInputValue =>this.setState({TextInputName: TextInputValue})}
        underlineColorAndroid = 'transparent'
        style = {styles.TextInputStyle2}
        />
        <TextInput 
        placeholder= 'Masukin Email Lo'
        onChangeText = {TextInputValue =>this.setState({TextInputEmail: TextInputValue})}
        underlineColorAndroid = 'transparent'
        style = {styles.TextInputStyle}
        />
        <TextInput 
        placeholder= 'Masukin Nomor Lo'
        onChangeText = {TextInputValue =>this.setState({TextInputPhoneNumber: TextInputValue})}
        underlineColorAndroid = 'transparent'
        style = {styles.TextInputStyle}
        />
        <TouchableOpacity activeopacity = {.4} style = {styles.TouchableOpacityStyle} onPress={this.InsertUsers}>
        <Text style = {styles.TextStyle}>Simpan</Text>
        </TouchableOpacity>
        <TouchableOpacity activeopacity = {.4} style = {styles.TouchableOpacityStyle2} onPress={this.ViewUsersList}>
        <Text style = {styles.TextStyle}>Tampilkan</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class ViewDataUser extends Component {
  static navigationOptions = {
    title: 'Data User'
  }
  render(){
    return (
      <View style = {styles.ContainerDataUser}>

      </View>
    )
  }
}

export default App = StackNavigator ({
 First: { screen: InputUsers },
 Second: { screen: ViewDataUser }
});

const styles = StyleSheet.create({
  Container:{
    alignItems: 'center',
    flex: 1,
    marginTop: 5,
    backgroundColor: '#fff'
  },
  TextInputStyle:{
    textAlign: 'center',
    marginBottom: 7,
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ff5722'
  },
  TextInputStyle2:{
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 7,
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ff5722'
  },
  TextStyle:{
    color: '#ffff',
    textAlign: 'center'
  },
  TouchableOpacityStyle:{
    width: '60%',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f0fc'
  },
  TouchableOpacityStyle2:{
    width: '60%',
    paddingTop: 10,
    marginTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f0fc'
  },
  ContainerDataUser:{
    alignItems: 'center',
    flex: 1,
    marginTop: 5,
    backgroundColor: '#fff'
  }
})
