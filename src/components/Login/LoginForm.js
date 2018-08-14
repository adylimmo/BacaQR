import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar
} from "react-native";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserEmail: "",
      UserPassword: ""
    };
  }
  onButtonPress = () => {
    const { UserEmail } = this.state;
    const { UserPassword } = this.state;

    fetch("http://192.168.0.11/laravel-jwt/public/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: UserEmail,

        password: UserPassword
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson === "success: true") {
          Alert.alert('berhasil login');
          console.log(responseJson);
        } else {
          Alert.alert('Gagal');
          console.log(responseJson);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Email"
          onChangeText={UserEmail => this.setState({ UserEmail })}
          placeholderTextColor="rgba(225,225,225,0.7)"
        />

        <TextInput
          style={styles.input}
          returnKeyType="go"
          ref={input => (this.passwordInput = input)}
          placeholder="Password"
          onChangeText={UserPassword => this.setState({ UserPassword })}
          placeholderTextColor="rgba(225,225,225,0.7)"
          secureTextEntry
        />
        {/*   <Button onPress={onButtonPress} title = 'Login' style={styles.loginButton} /> */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onButtonPress}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
    color: "#fff"
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  },
  loginButton: {
    backgroundColor: "#2980b6",
    color: "#fff"
  }
});

export default LoginForm;
