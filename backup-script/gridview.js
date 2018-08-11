import React, { Component } from 'react';
 
import { StyleSheet, View, Text, ActivityIndicator, FlatList, Alert, Platform } from 'react-native';
 
export default class Project extends Component {
  
  constructor(props)
  {
 
    super(props);
 
    this.state = { 

        loading: true
    
    }

  }
 
  componentDidMount() {
    
       return fetch('https://reactnativecode.000webhostapp.com/FruitsList.php')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             loading: false,
             dataSource: responseJson
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }
 
  GetGridViewItem (fruit_name) {
   
  Alert.alert(fruit_name);
 
  }
 
 
  render() {
 
    if (this.state.loading) {
      return (

            <View style={styles.ActivityIndicator_Style}>

            <ActivityIndicator size="large" />

            </View>
      );
    }
 
    return (
 
        <View style={styles.MainContainer}>
        
            <FlatList
            
                data={ this.state.dataSource }
                renderItem={({item}) => 
                
                        <View style={styles.GridViewBlockStyle}>
                        
                            <Text 
                            style={styles.GridViewInsideTextItemStyle} 
                            onPress={this.GetGridViewItem.bind(this, item.fruit_name)} > 

                            {item.fruit_name} 
                            
                            </Text>

                        </View>
                
                }
        
                keyExtractor={(item, index) => index}
                numColumns={2}
                
                />
            
            
        </View>
            
    );
  }
}
 
const styles = StyleSheet.create({
 
MainContainer :{
 
justifyContent: 'center',
flex:1,
margin: 10,
paddingTop: (Platform.OS === 'ios') ? 20 : 0,
 
},

ActivityIndicator_Style:{

    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
},
 
GridViewBlockStyle: {
 
    justifyContent: 'center',
    flex:1,
    alignItems: 'center',
    height: 100,
    margin: 5,
    backgroundColor: '#009688'
   
  }
  ,
   
  GridViewInsideTextItemStyle: {
   
     color: '#fff',
     padding: 10,
     fontSize: 18,
     justifyContent: 'center',
     
   },
 
});