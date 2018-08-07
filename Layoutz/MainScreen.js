import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class MainScreen extends React.Component {
  render(){
    return(
      <View style={styles.container}>
        <Text>Mainscreen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})