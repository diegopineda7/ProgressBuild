import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, CardItem } from 'native-base';
import* as firebase from 'firebase';
import { mainColor } from "../styles/globalStyles";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: ''
    };
  }
  static navigationOptions = {
    title: 'ProgressBuild'
  };
  
  componentDidMount() {
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
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.navigation.state.params.name,
      email: nextProps.navigation.state.params.email,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button full rounded
          style={styles.buttonUser}
          onPress = {() => {
            this.props.navigation.navigate('Micuenta');
          }}
        >
          <Text style={styles.textButtonUser}>Mi Cuenta</Text>
        </Button>
        <View style = {styles.infoUser}>
          <Card>
            <CardItem>
              <Text>{this.state.name}</Text>
            </CardItem>
            </Card>
            <Card>
            <CardItem>
              <Text>{this.state.email}</Text>
            </CardItem>
          </Card>
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
  buttonUser: {
    backgroundColor: mainColor,
    position: "absolute",
    top: 10,
    right: 10,
  },
  textButtonUser: {
    fontSize: 17,
    padding: 20,
    color: '#fff'
  }
});