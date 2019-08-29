import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

  navegar = item => {
    
    //this.props.navigation.navigate('Ejercicio', {ejercicio: item});
  }

  render() {
    if (this.state.visible) {
      return (
        <FlatList
          data = {this.props.item.grupos_musculares}
          renderItem = {({ item }) => {
            return (
              <View style = {styles.viewGrupo}>
                <View style = {styles.grupoIcon}>
                  <MaterialCommunityIcons
                    name = 'bullseye-arrow'
                    style = {styles.icon}
                  />
                  <Text style = {styles.textGrupo}>{item.name}</Text>
                </View>
                <FlatList
                  style = {styles.listaGrupos}
                  data = {item.ejercicios}
                  renderItem = {({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress = {() => {
                          this.props.navigation.navigate('Ejercicio', {ejercicio: item});
                        }}
                        style = {styles.ejercicio}
                      >
                        <Text style = {styles.textEjercicio}>{item.name}</Text>
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
  viewGrupo: {
    flex: 1,
  },
  grupoIcon: {
    flexDirection: 'row',
    height: 35,
    marginLeft: 30
  },
  textGrupo: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    paddingHorizontal: 10
  },
  icon: {
    fontSize: 30
  },
  ejercicio: {
    minWidth: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 3
  },
  textEjercicio: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});