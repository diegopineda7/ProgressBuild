import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Alert } from 'react-native';
import { Card, CardItem, Button } from 'native-base';
import { mainColor, globalStyles } from '../styles/globalStyles';
import { MaterialIcons } from "@expo/vector-icons";

export default class Ejercicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      grupoMuscular: '',
      equipo: '',
      sugerencias: '',
      riesgos: ''
    };
  }

  componentWillMount() {
    this.setState({
      nombre: this.props.navigation.getParam('ejercicio', '').name
    })
  }

  static navigationOptions = {
    title: 'Información del ejercicio'
  };

  render() {
    return (
      <ScrollView>
        <View style = {styles.container}>
          <Text style = {styles.titulo}>{this.state.nombre}</Text>
          <View style = {styles.info}>
            {/* <Image
              style = {styles.image}
              source = {require('../assets/press_banca_plano.png')}
            /> */}
            <Card style = {styles.card}>
              <CardItem style = {styles.cardItemDato}>
                <Text style = {styles.itemDato}>Grupo(s) Muscular(es)</Text>
              </CardItem>
              <CardItem>
                <Text style = {styles.itemInfo}>{this.state.grupoMuscular}</Text>
              </CardItem>
            </Card>
            <Card style = {styles.card}>
              <CardItem style = {styles.cardItemDato}>
                <Text style = {styles.itemDato}>Equipo necesario</Text>
              </CardItem>
              <CardItem>
                <Text style = {styles.itemInfo}>{this.state.equipo}</Text>
              </CardItem>
            </Card>
            <Card style = {styles.card}>
              <CardItem style = {styles.cardItemDato}>
                <Text style = {styles.itemDato}>Sugerencias</Text>
              </CardItem>
              <CardItem>
                <Text style = {styles.itemInfo}>{this.state.sugerencias}</Text>
              </CardItem>
            </Card>
            <Card style = {styles.card}>
              <CardItem style = {styles.cardItemDato}>
                <Text style = {styles.itemDato}>Riesgos</Text>
              </CardItem>
              <CardItem>
                <Text style = {styles.itemInfo}>{this.state.riesgos}</Text>
              </CardItem>
            </Card>
          </View>
          <Button
            full rounded
            style = {styles.button}
            onPress = {() => {
              Alert.alert('Video', `Ejercicio ${this.state.nombre}`);
            }}
          >
            <MaterialIcons
              style = {styles.icon}
              name = 'play-circle-filled'
              size = {35}
              color = '#000'
            />
            <Text style = {globalStyles.buttonText}>Ver video</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 25
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  card: {
    width: '90%'
  },
  cardItemDato: {
    height: 40
  },
  cardItemInfo: {
  },
  itemDato: {
    fontSize: 20
  },
  itemInfo: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  image: {
    width: '95%',
    height: 200,
    marginTop: 20
  },
  button: {
    backgroundColor: mainColor,
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 30
  },
  icon: {
    paddingRight: 10
  },
});
