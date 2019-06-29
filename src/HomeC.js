import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator,FlatList,TextInput } from 'react-native';
import firebase from 'react-native-firebase';
import Proc from './Proc';
import AppNavigator from './App';
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class HomeC extends React.Component{
  constructor() {
    super();
    this.ref1 = firebase.firestore().collection('order');
    this.ref = this.ref1.where('complete', '==', true);
    this.unsubscriber = '';
    this.state = {
      user: '',
      email: '', password: '', error: '',
      textInput: '',
      jmlOrder: '',
      order: [],
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
      const { title, complete,jmlOrder,waktu } = doc.data();

      order.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        complete,
        jmlOrder,
        waktu,
      });
    });

    this.setState({
      order,
      loading: false,
   });
 }

 static navigationOptions = {
     title: 'Home',
   };

  render(){
    if (this.state.loading) {
      return null; // or render a loading icon
    }
    return (
      <View style={{flex:1, flexDirection: 'column'}}>
        <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', paddingTop: 15, backgroundColor: "#e3e9f2", fontWeight: 'bold' }}>
            <View style={{ flex: 4 }}>
                <Text>Nama</Text>
            </View>
            <View style={{ flex: 2 }}>
                <Text>Jumlah</Text>
            </View>
            <View style={{ flex: 2 }}>
                <Text>Waktu</Text>
            </View>
            <View style={{ flex: 2 }}>
                <Text>Status</Text>
            </View>
        </View>
      <FlatList
        style={{flex:15}}
        data={this.state.order}
        renderItem={({ item }) => <Proc {...item} />}
      />

      <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
        <View style={{ flex: 1 }}>
          <Button
            title={'Tambah'}
            onPress={() => this.props.navigation.navigate('AddOrder')}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title={'belum selesai'}
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title={'Profile'}
            onPress={() => this.props.navigation.navigate('Profile')}
          />
        </View>
      </View>
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
