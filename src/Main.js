import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import firebase from 'react-native-firebase';
import LoginForm from './LoginForm';
import HomeScreen from './Home';
import AddOrder from './AddOrder';
import AppNavigator from './AppNavigator';

export default class Main extends React.Component {

  constructor() {
    super();
    this.unsubscriber = '';
    this.state = {
      user: '',
    };
  }

  componentDidMount(){
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
          this.setState({ user });
        });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {
    if (!this.state.user) {
      return (
        <LoginForm />
      );
    }
    return (
      <HomeScreen user={this.state.user.email} navigation={this.props.navigation} />
    );
  }

}
