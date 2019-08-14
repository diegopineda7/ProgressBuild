import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Form, Item, Label, Input, Card, CardItem } from 'native-base';
import * as firebase from 'firebase';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign In</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});