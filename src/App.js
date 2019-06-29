import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import firebase from 'react-native-firebase';
import LoginForm from './LoginForm';
import HomeScreen from './Home';
import AddOrder from './AddOrder';
import AppNavigator from './AppNavigator';

class App extends React.Component {
  render() {
      return(<AppNavigator />);
   }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 64,
    padding: 10,
    width: 135,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
