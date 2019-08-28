import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

export default class ListadoGruposMusculares extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.ejerciciosElement = React.createRef();
  }

  cambiarVisibilidad = () => {
    this.setState({visible: !this.state.visible});
  }

  render() {
    if (this.state.visible) {
      return (
        <FlatList
          data = {this.props.item.grupos_musculares}
          renderItem = {({ item }) => {
            return (
              <View>
                <Text style = {styles.grupo_muscular}>{item.name}</Text>
                <FlatList
                  data = {item.ejercicios}
                  renderItem = {({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress = {() => {
                          // Navegar a screen de Ejercicio
                        }}
                      >
                        <Text style = {styles.ejercicio}>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor = {(item, index) => index.toString()}
                />
              </View>
            );
          }}
          keyExtractor = {(item, index) => item.name}
        />
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  grupo_muscular: {
    paddingLeft: 20
  },
  ejercicio: {
    paddingLeft: 40
  }
});