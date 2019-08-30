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

  render() {
    if (this.state.visible) {
      return (
        <FlatList
          data = {this.props.item.grupos_musculares}
          renderItem = {({ item }) => {
            const grupo = item.name;
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
                  data = {item.ejercicios}
                  renderItem = {({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress = {() => {
                          this.props.navigation.navigate('Ejercicio', {
                            ejercicio: item,
                            grupo
                          });
                        }}
                        style = {styles.ejercicio}
                      >
                        <Text style = {styles.textEjercicio}>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor = {(item, index) => index.toString()}
                  numColumns = {2}
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
    marginTop: 10
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
    minWidth: '46%',
    maxWidth: '46%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9194F5',
    marginLeft: 10,
    borderRadius: 10
  },
  textEjercicio: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});