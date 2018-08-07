import React, { Component } from 'react';

import {
Text,
StyleSheet,
TextInput,
View,
Alert,
TouchableOpacity,
ActivityIndicator,
ListView,
Dimensions,
Button
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { StackNavigator } from 'react-navigation'
import MapView, { MAP_TYPES, Polygon, ProviderPropType } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;
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
      this.props.navigation.navigate('Second')
    }).catch((error) =>{
      console.error(error);
    })
  }

  ViewUsersList = () => {
    this.props.navigation.navigate('Second')
  }

  ScanCodeQr = () => {
    this.props.navigation.navigate('Four')
  }

  RadiusAbsensi = () => {
    this.props.navigation.navigate('Five')
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
        <TouchableOpacity activeopacity = {.4} style = {styles.TouchableOpacityStyle2} onPress={this.ScanCodeQr}>
        <Text style = {styles.TextStyle}>SCAN QR</Text>
        </TouchableOpacity>
        <TouchableOpacity activeopacity = {.4} style = {styles.TouchableOpacityStyle2} onPress={this.RadiusAbsensi}>
        <Text style = {styles.TextStyle}>Radius Absensi</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class ViewDataUser extends Component {
  static navigationOptions = {
    title: 'Data User'
  }

  constructor(props){
    super(props)
    this.state = {
      isLoding : true
    }
  }

  componentDidMount(){
    return fetch('http://202.51.114.235/crudrn/view_users.php')
    .then((response) => response.json())
    .then((responseJson) => {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.setState ({
      isLoding: false,
      dataSource: ds.cloneWithRows(responseJson)
    },function(){})
    }).catch((error) => {
      console.error(error);
    })
  }

  Action_Click(id, name, email, nomor_telpon){
    this.props.navigation.navigate('Three',{
      id: id,
      name: name,
      email: email,
      nomor_telpon: nomor_telpon
    })
    //Alert.alert('click nih');
  }

  ListViewItemSeparator = () => {
    return (
      <View
      style = {{
        height: .5,
        width: '100%',
        backgroundColor: '#2196f3'
      }}
      />
    )
  }

  render(){
    if(this.state.isLoding){
      return(
        <View style ={{flex:1, paddingTop:20}}>
        <ActivityIndicator/>
        </View>
      )

    }
    return (
      <View style = {styles.ContainerDataUser}>
      <ListView
      dataSource = {this.state.dataSource}
      renderSeparator = {this.ListViewItemSeparator}
      renderRow = {(rowData) => 
      <Text style = {styles.rowViewContainer} onPress = {this.Action_Click.bind(this,
        rowData.id,
        rowData.name,
        rowData.email,
        rowData.nomor_telpon
      )}>
      {rowData.name}
      </Text>
      }
      />
      </View>
    )
  }
}

class PolygonCreator extends Component {
  static navigationOptions = {
    title: 'Radius'
  }
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      polygons: [],
      editing: null,
      creatingHole: false,
    };
  }

  finish() {
    const { polygons, editing } = this.state;
    this.setState({
      polygons: [...polygons, editing],
      editing: null,
      creatingHole: false,
    });
  }

  createHole() {
    const { editing, creatingHole } = this.state;
    if (!creatingHole) {
      this.setState({
        creatingHole: true,
        editing: {
          ...editing,
          holes: [
            ...editing.holes,
            [],
          ],
        },
      });
    } else {
      const holes = [...editing.holes];
      if (holes[holes.length - 1].length === 0) {
        holes.pop();
        this.setState({
          editing: {
            ...editing,
            holes,
          },
        });
      }
      this.setState({ creatingHole: false });
    }
  }

  onPress(e) {
    const { editing, creatingHole } = this.state;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
          holes: [],
        },
      });
    } else if (!creatingHole) {
      this.setState({
        editing: {
          ...editing,
          coordinates: [
            ...editing.coordinates,
            e.nativeEvent.coordinate,
          ],
        },
      });
    } else {
      const holes = [...editing.holes];
      holes[holes.length - 1] = [
        ...holes[holes.length - 1],
        e.nativeEvent.coordinate,
      ];
      this.setState({
        editing: {
          ...editing,
          id: id++, // keep incrementing id to trigger display refresh
          coordinates: [
            ...editing.coordinates,
          ],
          holes,
        },
      });
    }
  }

  render() {
    const mapOptions = {
      scrollEnabled: true,
    };

    if (this.state.editing) {
      mapOptions.scrollEnabled = false;
      mapOptions.onPanDrag = e => this.onPress(e);
    }
    return(
      <View style={styles.container}>
        <MapView 
        provider="google"
        showsUserLocation={true}
        followsUserLocation={true}
          provider={this.props.provider}
          style={styles.map}
          mapType={MAP_TYPES.HYBRID}
          initialRegion={this.state.region}
          onPress={e => this.onPress(e)}
          {...mapOptions}
        >
          {this.state.polygons.map(polygon => (
            <Polygon
              key={polygon.id}
              coordinates={polygon.coordinates}
              holes={polygon.holes}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          ))}
          {this.state.editing && (
            <Polygon
              key={this.state.editing.id}
              coordinates={this.state.editing.coordinates}
              holes={this.state.editing.holes}
              strokeColor="#000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          )}
        </MapView>
        <View style={styles.buttonContainer}>
          {this.state.editing && (
            <TouchableOpacity
              onPress={() => this.createHole()}
              style={[styles.bubble, styles.button]}
            >
              <Text>{this.state.creatingHole ? 'Finish Hole' : 'Create Hole'}</Text>
            </TouchableOpacity>
          )}
          {this.state.editing && (
            <TouchableOpacity
              onPress={() => this.finish()}
              style={[styles.bubble, styles.button]}
            >
              <Text>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

class ScanAbsensiQr extends Component {
  static navigationOptions = {
    title: 'SCAN'
  }
  constructor(props) {
    super(props)
    this.state = {
      dataqr: '',
      status: 'Ready'
    };
  }

  onSuccess(e) {
    this.setState({
      dataqr:this.state.dataqr+', '+e.data,
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

class UpdateAndDeleteUser extends Component {
  static navigationOptions = {
    title: 'Update And Delete'
  }
  constructor(props){
    super(props)
    this.state = {
      TextInputId: '',
      TextInputName: '',
      TextInputEmail: '',
      TextInputPhoneNumber: '',
    }
  }

componentDidMount(){
  this.setState({
    TextInputId: this.props.navigation.state.params.id,
    TextInputName: this.props.navigation.state.params.name,
    TextInputEmail: this.props.navigation.state.params.email,
    TextInputPhoneNumber: this.props.navigation.state.params.nomor_telpon,
  })
}

  UpdateUser = () => {
    fetch('http://202.51.114.235/crudrn/update.php',{
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'

      },
      body: JSON.stringify({
       id: this.state.TextInputId,
       name: this.state.TextInputName,
       email: this.state.TextInputEmail,
       nomor_telpon: this.state.TextInputPhoneNumber,
      })
    }).then((response) => response.json())
    .then((responseJson) => {
      Alert.alert(responseJson);
      

    }).catch((error) =>{
      console.error(error);
    })
    this.props.navigation.navigate('Second')
  }

  DeleteUser = () => {
    fetch('http://202.51.114.235/crudrn/delete.php',{
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
       id: this.state.TextInputId
      })
    }).then((response) => response.json())
    .then((responseJson) => {
      Alert.alert(responseJson);
      

    }).catch((error) =>{
      console.error(error);
    })
    this.props.navigation.navigate('Second')
  }
render(){
  return(
    <View style = {styles.Container}>
        <TextInput
        value = {this.state.TextInputName} 
        placeholder= 'Masukin Nama Lo'
        onChangeText = {TextInputValue =>this.setState({TextInputName: TextInputValue})}
        underlineColorAndroid = 'transparent'
        style = {styles.TextInputStyle2}
        />
        <TextInput
        value = {this.state.TextInputEmail} 
        placeholder= 'Masukin Email Lo'
        onChangeText = {TextInputValue =>this.setState({TextInputEmail: TextInputValue})}
        underlineColorAndroid = 'transparent'
        style = {styles.TextInputStyle}
        />
        <TextInput
        value = {this.state.TextInputPhoneNumber} 
        placeholder= 'Masukin Nomor Lo'
        onChangeText = {TextInputValue =>this.setState({TextInputPhoneNumber: TextInputValue})}
        underlineColorAndroid = 'transparent'
        style = {styles.TextInputStyle}
        />
        <TouchableOpacity activeopacity = {.4} style = {styles.TouchableOpacityStyle} onPress={this.UpdateUser}>
        <Text style = {styles.TextStyle}>UPDATE</Text>
        </TouchableOpacity>
        <TouchableOpacity activeopacity = {.4} style = {styles.TouchableOpacityStyle2} onPress={this.DeleteUser}>
        <Text style = {styles.TextStyle}>HAPUS</Text>
        </TouchableOpacity>
      </View>
  )
}
}

export default App = StackNavigator ({
 First: { screen: InputUsers },
 Second: { screen: ViewDataUser },
 Three : { screen: UpdateAndDeleteUser },
 Four : { screen: ScanAbsensiQr },
 Five : { screen: PolygonCreator }
});

PolygonCreator.propTypes = {
  provider: ProviderPropType,
};

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
  },
  rowViewContainer:{
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10

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
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
})
