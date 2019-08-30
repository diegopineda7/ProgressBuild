import React from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator, FlatList } from 'react-native';
import { mainColor } from "../styles/globalStyles";
import CategEjercicio from '../components/CategEjercicio';

export default class GuiaEjercicios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: undefined,
      ejercicios: [],
      isLoading: true
    };
  }

  static navigationOptions = {
    title: 'Guía de ejercicios'
  };

  async componentDidMount() {
    await this.setState({ client: this.props.navigation.getParam('client', '') });
    var ejercicios = await this.state.client.db('ProgressBuild').collection('Ejercicios');
    await ejercicios.find().asArray()
      .then(items => {
        this.setState({
          ejercicios: Object.values(items),
          isLoading: false
        });
      })
      .catch(err => console.error(`Failed to find documents: ${err}`))
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style = {styles.containerLoading}>
          <ActivityIndicator
            size = 'large'
            color = {mainColor}
          />
        </View>
      );
    }
    return (
      <ScrollView style = {styles.container}>
        <FlatList
          data = {this.state.ejercicios}
          renderItem = {({ item }) => {
            return (
              <CategEjercicio item = {item}
                navigation = {this.props.navigation}
              />
            );
          }}
          keyExtractor = {(item, index) => item._id.toString()}
        />
        <View style = {styles.espacio}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  espacio: {
    height: 50
  }
});