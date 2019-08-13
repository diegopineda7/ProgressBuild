import { createAppContainer, createStackNavigator } from "react-navigation";
import Home from "./screens/Home";
import GuiaEjercicios from "./screens/GuiaEjercicios";
import Ejercicio from "./screens/Ejercicio";

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
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
    }
  }
});

const App = createAppContainer(MainNavigator);
export default App;
