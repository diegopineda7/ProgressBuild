import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import ListadoGruposMusculares from '../screens/ListadoGruposMusculares';
import { FontAwesome } from '@expo/vector-icons'
import { mainColorRGB } from "../styles/globalStyles";

export default class CategEjercicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreIcon: 'angle-down',
      visible: false
    };
    this.grupoMuscularElement = React.createRef();
  }

  cambiarVisibilidad = () => {
    this.grupoMuscularElement.current.cambiarVisibilidad();
    
    this.setState({
      visible: !this.state.visible,
      nombreIcon: this.state.visible ? 'angle-down' : 'angle-up'
    });
  }

  render() {
    return (
      <View>
        <TouchableOpacity style = {styles.tipo_ejercicio}
          onPress = {() => {
            this.cambiarVisibilidad();
          }}
        >
          <Text style = {styles.textTipo}>{this.props.item.name}</Text>
          <FontAwesome
            name = {this.state.nombreIcon}
            style = {styles.icon}
          />
        </TouchableOpacity>
        <ListadoGruposMusculares
          ref = {this.grupoMuscularElement}
          item = {this.props.item}
          navigation = {this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tipo_ejercicio: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '100%',
    backgroundColor: 'rgba(' + mainColorRGB + ', .9)',
    marginTop: 10,
    height: 50
  },
  textTipo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff'
  },
  icon: {
    position: 'absolute',
    fontSize: 40,
    color: '#fff',
    right: 15
  }
});