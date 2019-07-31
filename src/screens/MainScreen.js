
import Home from './main_screens/Home'
import CreateRoom from './main_screens/CreateRoom'
import JoinRoom from './main_screens/JoinRoom'
import LoadingScreen from './main_screens/LoadingScreen'
import { createStackNavigator, createAppContainer} from 'react-navigation';

const MainScreen = createStackNavigator({
  LoadingScreen:{
    screen:LoadingScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  Home:{
    screen:Home,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  CreateRoom:{
      screen:CreateRoom,
  },
  JoinRoom:{
      screen:JoinRoom,
  },
});
export default MainScreen;