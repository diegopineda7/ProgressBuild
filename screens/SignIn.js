import React from 'react';
import { Text, View, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import { Form, Item, Label, Input, Button } from 'native-base';
import * as firebase from 'firebase';
import { globalStyles } from "../styles/globalStyles";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  static navigationOptions = {
    header: null
  };

  signInUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
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
              style = {styles.image}
              source = {require('../assets/icon.png')}
            />
            <Text style={styles.logoText}>ProgressBuild</Text>
          </View>
          <Form style = {styles.form}>
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
              this.signInUser(this.state.email, this.state.password);
            }}
          >
            <Text style = {styles.buttonText}>Ingresar</Text>
          </Button>
          <View style = {styles.footer}>
            <TouchableOpacity
            style={styles.touchableFooter}
            onPress = {() => {
              this.props.navigation.navigate('Signup')
            }}
            >
              <Text style = {styles.footerText}>Quieres crear una cuenta?</Text>
            </TouchableOpacity>
            
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = globalStyles;