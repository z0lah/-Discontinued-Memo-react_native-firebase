import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator,FlatList,TextInput } from 'react-native';
import firebase from 'react-native-firebase';
import Proc from './Proc';
import DatePicker from 'react-native-datepicker';

export default class HomeScreen extends React.Component{
  constructor() {
    super();
    let date = new Date().getDate();
    this.ref = firebase.firestore().collection('order');
    this.unsubscriber = '';
    this.state = {
      user: '',
      email: '', password: '', error: '',
      textInput: '',
      jmlOrder: '',
      order: [],
      date: this.date,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const order = [];
    querySnapshot.forEach((doc) => {
      const { title, complete,jmlOrder } = doc.data();

      order.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        complete,
        jmlOrder
      });
    });

    this.setState({
      order,
      loading: false,
   });
 }

updateTextInput(value) {
    this.setState({ textInput: value });
  }

updateNumberInput(value) {
     this.setState({ jmlOrder : value });
   }

addTodo() {
  this.ref.add({
    title: this.state.textInput,
    complete: false,
    jmlOrder: this.state.jmlOrder,
    waktu: this.state.date,
    });

  this.setState({
    textInput: '',
    jmlOrder: '',
    });
  }

  static navigationOptions = {
      title: 'Tambah Item',
    };
    
  render(){
    if (this.state.loading) {
      return null; // or render a loading icon
    }

    return (
      <View>
        <TextInput
          placeholder={'Nama'}
          value={this.state.textInput}
          onChangeText={(text) => this.updateTextInput(text)}
        />
        <TextInput
          placeholder={'Jumlah'}
          value={this.state.jmlOrder}
          keyboardType={'numeric'}
          onChangeText={(number) => this.updateNumberInput(number)}
        />
        <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="Waktu"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2099-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
        <Button
          title={'Tambah'}
          disabled={!this.state.textInput.length}
          onPress={() =>{
            this.addTodo();
            this.props.navigation.navigate('Home');
          }
        }
        />
        <Text>{"\n"}</Text>
            <Button title="Sign out"
          onPress={() => firebase.auth().signOut()} />
      </View>
  )
}
}
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
