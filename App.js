import { createAppContainer, createStackNavigator } from 'react-navigation';
import Loading from './screens/Loading';
import Home from './screens/Home';
import MiCuenta from './screens/MiCuenta';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import GuiaEjercicios from './screens/GuiaEjercicios';
import Ejercicio from './screens/Ejercicio';
import RegistrarEntrenamiento from './screens/RegistrarEntrenamiento';
import * as firebase from 'firebase';
import { mainColor } from "./styles/globalStyles";

var firebaseConfig = {
  apiKey: 'AIzaSyDfhj7_Zni14BEPv3BdoAhBkvSxVw3uc5k',
  authDomain: 'progressbuild-d330f.firebaseapp.com',
  databaseURL: 'https://progressbuild-d330f.firebaseio.com',
  projectId: 'progressbuild-d330f',
  storageBucket: 'gs://progressbuild-d330f.appspot.com/',
  messagingSenderId: '423014082229',
  appId: '1:423014082229:web:fc4e56599ede8ffe'
};
firebase.initializeApp(firebaseConfig);

const MainNavigator = createStackNavigator({
  Loading: {screen: Loading},
  Home: {screen: Home},
  Micuenta: {screen: MiCuenta},
  Signup: {screen: SignUp},
  Signin: {screen: SignIn},
  Guia: {screen: GuiaEjercicios},
  Ejercicio: {screen: Ejercicio},
  Registrar: {screen: RegistrarEntrenamiento},
},
{
  defaultNavigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: mainColor
    },
    headerTitleStyle: {
      color: '#fff'
    },
  },
  initialRouteName: 'Loading'
});

const App = createAppContainer(MainNavigator);
export default App;
