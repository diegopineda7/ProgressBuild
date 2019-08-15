import { createAppContainer, createStackNavigator } from 'react-navigation';
import Loading from './screens/Loading';
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import GuiaEjercicios from './screens/GuiaEjercicios';
import Ejercicio from './screens/Ejercicio';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyDfhj7_Zni14BEPv3BdoAhBkvSxVw3uc5k',
  authDomain: 'progressbuild-d330f.firebaseapp.com',
  databaseURL: 'https://progressbuild-d330f.firebaseio.com',
  projectId: 'progressbuild-d330f',
  storageBucket: '',
  messagingSenderId: '423014082229',
  appId: '1:423014082229:web:fc4e56599ede8ffe'
};
firebase.initializeApp(firebaseConfig);

const MainNavigator = createStackNavigator({
  Loading: {screen: Loading},
  Home: {screen: Home},
  Signup: {screen: SignUp},
  Signin: {screen: SignIn},
  Guia: {screen: GuiaEjercicios},
  Ejercicio: {screen: Ejercicio}
},
{
  defaultNavigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#A73C07'
    },
    headerTitleStyle: {
      color: '#fff'
    },
  },
  initialRouteName: 'Loading'
});

const App = createAppContainer(MainNavigator);
export default App;
