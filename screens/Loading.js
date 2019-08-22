import React from 'react';
import { StyleSheet, Image, Text, View, ActivityIndicator } from 'react-native';
import * as firebase from "firebase";
import { mainColor } from "../styles/globalStyles";

export default class Loading extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.replace('Home');
      } else {
        this.props.navigation.replace('Signup');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.logo}>
          <Image
            source = {require('../assets/icon.png')}
          />
          <Text style={styles.logoText}>Bienvenido a ProgressBuild!</Text>
        </View>
        <ActivityIndicator
          size='large'
          color='#fff'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center'
  },
  logoText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 30,
    color: '#fff'
  }
});
