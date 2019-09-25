import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { Button } from 'native-base';
import * as firebase from 'firebase';
import { mainColor } from "../styles/globalStyles";
import { Stitch, UserPasswordCredential, RemoteMongoClient } from 'mongodb-stitch-react-native-sdk';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: undefined,
      name: '',
      email: '',
      isLoading: true
    };
  }

  static navigationOptions = {
    title: 'ProgressBuild'
  };
  
  componentDidMount() {
    //Firebase Config
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          name: user.displayName,
          email: user.email
        });
      } else {
        this.props.navigation.replace('Signin');
      }
    });

    //Mongo Config
    Stitch.initializeDefaultAppClient('progressbuild-lrkpa')
      .then(client => {
        client.auth.loginWithCredential(new UserPasswordCredential('diego7@gmail.com', 'mente777'))
          .then(user => {
            const mongoClient = client.getServiceClient(
              RemoteMongoClient.factory,
              'mongodb-atlas'
            );
            this.setState({
              client: mongoClient,
              isLoading: false
            });
          })
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.navigation.state.params.name,
      email: nextProps.navigation.state.params.email,
    });
  }

  primerNmombre = nombre => {
    const partes = nombre.split(' ');
    return partes[0];
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
        <ActivityIndicator
          size = 'large'
          color = {mainColor}
        />
      </View>
      );
    }
    return (
      <View style = {styles.container}>
        <Button full rounded
          style = {styles.buttonUser}
          onPress = {() => {
            this.props.navigation.navigate('Micuenta');
          }}
        >
          <Text style = {styles.textButtonUser}>Mi Cuenta</Text>
        </Button>
        <Text style = {styles.welcomeText}>Bienvenido {this.primerNmombre(this.state.name)}</Text>
        <View style = {styles.viewModulos}>
          <TouchableOpacity style = {styles.modulo}
            onPress = {() => {
              this.props.navigation.navigate('Guia', {client: this.state.client});
            }}
          >
            <ImageBackground
              style = {styles.imageModulo}
              imageStyle = {styles.imageModulo}
              source = {require('../assets/guia.jpg')}
            >
              <Text style = {styles.textModulo}>Guía de ejercicios</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.modulo}
            onPress = {() => {
              this.props.navigation.navigate('Registrar', {client: this.state.client});
            }}
          >
            <ImageBackground
              style = {styles.imageModulo}
              imageStyle = {styles.imageModulo}
              source = {require('../assets/modulo_registro.jpg')}
            >
              <Text style = {styles.textModulo}>Registrar entrenamiento</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
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
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  buttonUser: {
    backgroundColor: mainColor,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  textButtonUser: {
    fontSize: 17,
    padding: 20,
    color: '#fff'
  },
  viewModulos: {
    marginTop: 30,
    flex: .4,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modulo: {
    width: '48%'
  },
  imageModulo: {
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  textModulo: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, .4)'
  }
});