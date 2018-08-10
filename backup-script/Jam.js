import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    Alert
} from "react-native";

import { Icon } from 'native-base'

class HomeTab extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-alarm" style={{ color: tintColor }} />
        )
    }
    constructor(props) {

        super(props);
    
        this.state = {
    
          time: ''
        
        };
      }
    
      componentDidMount() {
    
        this.Clock = setInterval( () => this.GetTime(), 1000 );
    
      }
    
      componentWillUnmount(){
    
        clearInterval(this.Clock);
    
      }
    
      GetTime() {
    
        // Creating variables to hold time.
        var date, TimeType, hour, minutes, seconds, fullTime;
    
        // Creating Date() function object.
        date = new Date();
    
        // Getting current hour from Date object.
        hour = date.getHours(); 
    
        // Checking if the Hour is less than equals to 11 then Set the Time format as AM.
        if(hour <= 11)
        {
    
          TimeType = 'AM';
    
        }
        else{
    
          // If the Hour is Not less than equals to 11 then Set the Time format as PM.
          TimeType = 'PM';
    
        }
    
    
        // IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
        if( hour > 12 )
        {
          hour = hour - 12;
        }
     
        // If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format. 
        if( hour == 0 )
        {
            hour = 12;
        } 
    
    
        // Getting the current minutes from date object.
        minutes = date.getMinutes();
    
        // Checking if the minutes value is less then 10 then add 0 before minutes.
        if(minutes < 10)
        {
          minutes = '0' + minutes.toString();
        }
    
    
        //Getting current seconds from date object.
        seconds = date.getSeconds();
    
        // If seconds value is less than 10 then add 0 before seconds.
        if(seconds < 10)
        {
          seconds = '0' + seconds.toString();
        }
    
    
        // Adding all the variables in fullTime variable.
        fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString() + ' ' + TimeType.toString();
    
    
        // Setting up fullTime variable in State.
        this.setState({
    
          time: fullTime
    
        });
      }
    
      showTime=()=>{
    
          Alert.alert(this.state.time.toString()) ;
    
      }

    render() {
        return (
            <View style={styles.MainContainer}>
 
        <Text style={styles.TextStyle}> {this.state.time} </Text>

        <Button title='Click Here To Get Current Time' onPress={this.showTime} />
 
      </View>
        );
    }
}
export default HomeTab;

const styles = StyleSheet.create({
    MainContainer:
  {
     justifyContent: 'center',
     alignItems: 'center',
     flex:1,
     margin: 10
   
  },
 
  TextStyle:
  {
     fontSize: 26,
     textAlign: 'center',
     color: '#009688',
     marginBottom: 20,
  }
});