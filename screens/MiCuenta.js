import React from 'react';
import { StyleSheet, Text, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Image  as ReactImage } from 'react-native';
import { Form, Item, Label, Input, Button } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import { globalStyles, mainColor } from "../styles/globalStyles";

export default class MiCuenta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      image: 'empty',
      imageDownloadUrl: 'empty'
    };
  }

  static navigationOptions = {
    title: 'Mi Cuenta',
    headerTintColor: mainColor,
    headerStyle: {
      backgroundColor: '#fff'
    },
    headerTitleStyle: {
      color: mainColor
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          name: user.displayName,
          email: user.email,
          imageDownloadUrl: user.photoURL,
          image: 'not empty'
        });
      } else {
        this.props.navigation.replace('Signin');
      }
    });
  }

  actualizarDatos = async () => {
    if (this.state.name !== '' && this.state.email) {
      firebase.auth().currentUser.updateProfile({
        displayName: this.state.name,
        email: this.state.email
      });

      if (this.state.imageDownloadUrl !== 'empty' && this.state.image === 'empty') {
        const storageRef = firebase.storage().ref();
        const imageDownloadUrl = await this.cargarFoto(this.state.image, storageRef);
        this.setState({imageDownloadUrl});
        await firebase.auth().currentUser.updateProfile({
          photoURL: this.state.imageDownloadUrl
        });
      }
      this.props.navigation.navigate('Home', {
        name: this.state.name,
        email: this.state.email
      });
    } else {
      alert('Debes llenar los campos de Nombre e Email!');
    }
  }

  cargarFoto = async (uri, storageRef) => {
    const parts = uri.split('.');
    const extension = parts[parts.length - 1];

    //Crear blob
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(error) {
        console.log(error);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    // Cargar imagen
    const ref = storageRef
      .child('UserImage')
      .child(firebase.auth().currentUser.email + '.' + extension);

    const snapshot = await ref.put(blob);

    // Cerrar blob
    blob.close();
    return await snapshot.ref.getDownloadURL();
  }

  seleccionarFoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.2,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1]
    });
    if (!result.cancelled) {
      this.setState({image: result.uri})
    }
  }

  cerrarSesion = () => {
    firebase.auth().signOut()
      .then(() => {
        console.log('Signed Out');
      })
      .catch(error => {
        alert(error.message);
      })
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress = {() => {
          Keyboard.dismiss()
        }}
      >
        <KeyboardAvoidingView
          style = {globalStyles.container}
          behavior = 'padding'
          enabled
        >
          <TouchableOpacity
            style = {styles.logo}
            onPress={() => {
              this.seleccionarFoto();
            }}
          >
            <ReactImage
              style = {styles.image}
              source = {
                this.state.imageDownloadUrl === 'empty'
                  ? require("../assets/no_photo.png")
                  : {
                    uri: this.state.imageDownloadUrl
                  }
              }
            />
          </TouchableOpacity>
          <Form style = {globalStyles.form}>
            <Item floatingLabel
                style = {globalStyles.item}
              >
                <Label style = {styles.label}>Nombre</Label>
                <Input
                  style = {globalStyles.input}
                  autoCorrect = {false}
                  autoCapitalize = 'words'
                  keyboardType = 'name-phone-pad'
                  value = {this.state.name}
                  onChangeText = {name => {
                    this.setState({name})
                  }}
                />
              </Item>
            <Item floatingLabel
              style = {globalStyles.item}
            >
            <Label style = {styles.label}>Email</Label>
              <Input
                style = {globalStyles.input}
                autoCorrect = {false}
                autoCapitalize = 'none'
                keyboardType = 'email-address'
                value = {this.state.email}
                onChangeText = {email => {
                  this.setState({email})
                }}
              />
            </Item>
          </Form>
          <Button
            full rounded success
            style = {styles.buttonActualizar}
            onPress = {() => {
              this.actualizarDatos();
            }}
          >
            <Text style = {styles.buttonActText}>Actualizar mis datos</Text>
          </Button>
          <Button
            full rounded success
            style = {styles.buttonSalir}
            onPress = {() => {
              this.cerrarSesion();
            }}
          >
            <Text style = {styles.buttonSalirText}>Cerrar sesión</Text>
          </Button>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    alignItems: "center"
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  buttonActualizar: {
    backgroundColor: '#044417',
    height: 50,
    margin: 10
  },
  label: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: -10
  },
  buttonSalir: {
    backgroundColor: '#fff',
    height: 40,
    marginVertical: 10,
    marginHorizontal: 80
  },
  buttonActText: {
    fontSize: 20,
    color: '#fff'
  },
  buttonSalirText: {
    color: mainColor,
    fontSize: 20
  }
});