import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import ListadoGruposMusculares from '../components/ListadoGruposMusculares';
import { MaterialIcons } from '@expo/vector-icons'

export default class CategEjercicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreIcon: 'expand-more',
      visible: false
    };
    this.grupoMuscularElement = React.createRef();
  }

  cambiarVisibilidad = () => {
    this.grupoMuscularElement.current.cambiarVisibilidad();
    
    this.setState({
      visible: !this.state.visible,
      nombreIcon: this.state.visible ? 'expand-more' : 'expand-less'
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
          <Text style = {styles.text}>{this.props.item.name}</Text>
          <MaterialIcons
            name = {this.state.nombreIcon}
            style = {styles.icon}
          />
        </TouchableOpacity>
        <ListadoGruposMusculares
          ref = {this.grupoMuscularElement}
          item = {this.props.item}
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
    backgroundColor: 'rgba(167, 60, 7, .9)',
    marginVertical: 10,
    height: 50
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  icon: {
    position: 'absolute',
    fontSize: 60,
    color: '#fff',
    right: 5
  }
});