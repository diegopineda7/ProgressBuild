import { createAppContainer, createStackNavigator } from 'react-navigation';
import Loading from './screens/Loading';
import Home from './screens/Home';
import MiCuenta from './screens/MiCuenta';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import GuiaEjercicios from './screens/GuiaEjercicios';
import Ejercicio from './screens/Ejercicio';
import RegistrarEntrenamiento from './screens/RegistrarEntrenamiento';
import { mainColor } from "./styles/globalStyles";
import { firebaseConfig } from './Database'

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
