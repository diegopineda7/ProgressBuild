import React from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableWithoutFeedback, Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Form, Item, Label, Input, Button } from 'native-base';
import SearchableDropdown from 'react-native-searchable-dropdown';

export default class RegistrarEntrenamiento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ejercicio: '',
      series: '',
      repeticiones: '',
      carga: '',
      items: []
    };
  }

  static navigationOptions = {
    title: 'Registrar entrenamiento'
  };

  async componentDidMount() {
    await this.setState({ client: this.props.navigation.getParam('client', '') });
    var ejercicios = await this.state.client.db('ProgressBuild').collection('Ejercicios');
    await ejercicios.find().asArray()
      .then(items => {
        var ejercicios = [];
        items.map(function(item) {
          const idItem = item.id;
          item.grupos_musculares.map(function(grupo) {
            const idGrupo = grupo.id;
            grupo.ejercicios.map(function(ejercicio) {
              const idEjercicio = ejercicio.id;
              const objEjercicio = {
                id: '' + idItem + idGrupo + idEjercicio,
                name: ejercicio.name
              };
              ejercicios.push(objEjercicio);
            })
          })
        })
        this.setState({
          items: ejercicios,
          isLoading: false
        });
      })
      .catch(err => console.error(`Failed to find documents: ${err}`))
  }

  guadarRegistro = () => {
    if (
      this.state.ejercicio !== '' &&
      this.state.series !== '' &&
      this.state.repeticiones !== '' &&
      this.state.carga !== ''
    ) {
      Alert.alert('Listo!', 'Entrenamiento guardado exitosamente');
    } else {
      Alert.alert('Campos incompletos', 'Tienes campos sin llenar, por favor llena todos los campos');
    }
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
      <TouchableWithoutFeedback
        onPress = {() => {Keyboard.dismiss()}}
      >
        <KeyboardAvoidingView
          behavior = 'padding'
        >
          <ImageBackground
            style = {styles.imageFondo}
            imageStyle = {styles.imageFondo}
            source = {require('../assets/registro.jpg')}
          >
            <Form style = {styles.form}>
              <Item style = {styles.item}>
                <Label style = {styles.label}>Ejercicio</Label>
                <SearchableDropdown
                  onItemSelect = {item => {
                    this.setState({ejercicio: item.name});
                  }}
                  containerStyle = {{ padding: 5, width: 250 }}
                  itemStyle = {{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    width: 220
                  }}
                  itemTextStyle = {{ color: '#000', fontSize: 20 }}
                  itemsContainerStyle = {{ maxHeight: 400 }}
                  items = {this.state.items}
                  textInputProps = {{
                    style: [
                      styles.input,
                      styles.inputEjercicio
                    ],
                    multiline: true,
                  }}
                  listProps = {{
                    nestedScrollEnabled: true,
                  }}
                />
              </Item>
              <Item style = {styles.item}>
                <Label style = {styles.label}>Series</Label>
                <Input
                  style = {styles.input}
                  autoCorrect = {false}
                  autoCapitalize = 'none'
                  keyboardType = 'number-pad'
                  onChangeText = {series => {
                    this.setState({series});
                  }}
                />
              </Item>
              <Item style = {styles.item}>
                <Label style = {styles.label}>Repeticiones por serie</Label>
                <Input
                  style = {styles.input}
                  autoCorrect = {false}
                  autoCapitalize = 'none'
                  keyboardType = 'number-pad'
                  onChangeText = {repeticiones => {
                    this.setState({repeticiones});
                  }}
                />
              </Item>
              <Item style = {styles.item}>
                <Label style = {styles.label}>Carga (kg)</Label>
                <Input
                  style = {styles.input}
                  autoCorrect = {false}
                  autoCapitalize = 'none'
                  keyboardType = 'number-pad'
                  onChangeText = {carga => {
                    this.setState({carga});
                  }}
                />
              </Item>
            </Form>
            <Button full rounded
              style = {styles.button}
              onPress = {() => {
                this.guadarRegistro();
              }}
            >
              <Text style = {styles.buttonText}>Guardar</Text>
            </Button>
          </ImageBackground>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageFondo: {
    width: '100%',
    height: '100%',
    alignContent: 'center',
  },
   form: {
    width: '100%',
    padding: 30
  },
  item: {
    marginVertical: 15,
    backgroundColor: 'rgba(0, 0, 0, .6)'
  },
  label: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: -20
  },
  input: {
    color: '#fff',
    fontSize: 22
  },
  inputEjercicio: {
    padding: 5,
    height: 60
  },
  button: {
    backgroundColor: '#fff',
    height: 70,
    marginHorizontal: 10
  },
  buttonText: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold'
  }
});