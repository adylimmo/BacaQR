import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text
} from "react-native";

import { Icon } from 'native-base'

class HomeTab extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-alarm" style={{ color: tintColor }} />
        )
    }

    render() {
        return (
            <View style={styles.container}>
               <Text>Home</Text>
            </View>
        );
    }
}
export default HomeTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});