import React from 'react';
import { StyleSheet, Text, View, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Form, Item, Label, Input, Button } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

export default class Signup extends React.Component {
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

  signUpUser = (name, email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async result => {
        await result.user.updateProfile({displayName: name});
        this.props.navigation.replace('Home');
      })
      .catch(error => {
        alert(error.message);
      })
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress = {() => {Keyboard.dismiss()}}
      >
        <KeyboardAvoidingView
          style = {styles.container}
          behavior = 'padding'
          enabled
        >
          <View style = {styles.logo}>
            <Image
              source = {require('../assets/icon.png')}
            />
            <Text style={styles.logoText}>Bienvenido a ProgressBuild!</Text>
          </View>
          <Form style = {styles.form}>
            <Item floatingLabel
              style = {styles.item}
            >
              <Label style = {styles.label}>Nombre</Label>
              <Input
                style = {styles.input}
                autoCorrect = {false}
                autoCapitalize = 'words'
                keyboardType = 'name-phone-pad'
                onChangeText = {name => {
                  this.setState({name})
                }}
              />
            </Item>
            <Item floatingLabel
              style = {styles.item}
            >
            <Label style = {styles.label}>Email</Label>
              <Input
                style = {styles.input}
                autoCorrect = {false}
                autoCapitalize = 'none'
                keyboardType = 'email-address'
                onChangeText = {email => {
                  this.setState({email})
                }}
              />
            </Item>
            <Item floatingLabel
              style = {styles.item}
            >
            <Label style = {styles.label}>Contraseña</Label>
              <Input
                style = {styles.input}
                secureTextEntry = {true}
                autoCorrect = {false}
                autoCapitalize = 'none'
                keyboardType = 'default'
                onChangeText = {password => {
                  this.setState({password})
                }}
              />
            </Item>
          </Form>
          <Button
            full rounded success
            style = {styles.button}
            onPress = {() => {
              this.signUpUser(this.state.name, this.state.email, this.state.password);
            }}
          >
            <Text style = {styles.buttonText}>Empecemos!</Text>
          </Button>
          <View style = {styles.footer}>
            <TouchableOpacity
            style={styles.touchableFooter}
            onPress = {() => {
              this.props.navigation.navigate('Signin')
            }}
            >
              <Text style = {styles.footerText}>Ya tienes una cuenta?</Text>
            </TouchableOpacity>
            
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A73C07',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: "center"
  },
  logoText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20
  },
  form: {
    width: '100%',
    padding: 30
  },
  item: {
    marginVertical: 20
  },
  label: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: -20
  },
  input: {
    color: '#fff',
    fontSize: 22
  },
  button: {
    backgroundColor: '#044417',
    height: 70,
    marginHorizontal: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  },
  footer: {
    alignItems: 'center',
    marginTop: 30
  },
  touchableFooter: {
    backgroundColor: 'rgba(4, 68, 23, .5)',
    padding: 10,
    borderRadius: 20
  },
  footerText: {
    color: '#fff',
    fontSize: 22,
    paddingHorizontal: 10
  }
});