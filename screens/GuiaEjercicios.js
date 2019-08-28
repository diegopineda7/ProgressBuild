import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
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
        <View style = {styles.container}>
          <ActivityIndicator
            size = 'large'
            color = {mainColor}
          />
        </View>
      );
    }
    return (
      <View style = {styles.container}>
        <FlatList
          data = {this.state.ejercicios}
          renderItem = {({ item }) => {
            return (
              <CategEjercicio item = {item} />
            );
          }}
          keyExtractor = {(item, index) => item._id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});