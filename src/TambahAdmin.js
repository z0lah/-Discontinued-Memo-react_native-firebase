import React, { Component } from 'react';
import { View, Button, Text, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import Input from './Input';

export default class TmbahAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '' };
  }

  onButtonPress() {
    this.setState({ error: '', loading: true })
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
            this.setState({error:'', loading:false});
            //this.props.navigation.navigate('Main');
        })
        .then(() => this.props.navigation.navigate('Profile'))
        .catch(() => {
            this.setState({error:'Login Gagal', loading:false});
        });

  }

  onLoginSuccess() {
    this.props.navigation.navigate('Profile');
  }

  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage, loading: false })
  }

  renderButton() {
    if (this.state.loading) {
      return (
        <View style={styles.spinnerStyle}>
          <ActivityIndicator size={"small"} />
        </View>
      )
    } else {
      return (
        <Button
          title="Tambah"
          onPress={this.onButtonPress.bind(this)}
          disabled={!this.state.password.length || !this.state.email.length}
        />
      )
    }
  }

  static navigationOptions = {
  navigationOptions: {
      headerVisible: null,
  }
    };

  render() {
    return (
      <View>
        <Input label="Email"
          placeholder="user@mail.com"
          value={this.state.email}
          secureTextEntry={false}
          onChangeText={email => this.setState({ email })} />

        <Input label="Password"
          placeholder="password"
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })} />

        {this.renderButton()}

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
      </View>
    )
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red'
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}
