import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator,FlatList,TextInput } from 'react-native';
import firebase from 'react-native-firebase';
import Proc from './Proc';
import AppNavigator from './App';
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class HomeScreen extends React.Component{
  constructor() {
    super();
    this.ref1 = firebase.firestore().collection('order');
    this.ref = this.ref1.where('complete', '==', false);
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
        <View style={{ flex: 0.1, flexDirection: 'row', alignItems: 'center', fontWeight: 'bold', backgroundColor: "#e3e9f2" }}>
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
              style={{padding:10}}
              title={'sudah selesai'}
              onPress={() => this.props.navigation.navigate('HomeC')}
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
  }
});
