
import Home from './main_screens/Home'
import CreateRoom from './main_screens/CreateRoom'
import JoinRoom from './main_screens/JoinRoom'
import LoadingScreen from './main_screens/LoadingScreen'
import { createStackNavigator } from 'react-navigation';
import { Dimensions } from 'react-native'

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
      navigationOptions: ({ navigation }) => ({
        title:'Criar sala',
        headerStyle: {
          backgroundColor:'#774F38',
        },
        headerTitleStyle: {
          color: '#ECE5CE',
          fontSize: 22,
          textAlign: 'center',
          width: Dimensions.get('window').width - 130
        },
        headerLayoutPreset: 'center',
        headerTintColor:'#ECE5CE',
      }),
  },
  JoinRoom:{
      screen:JoinRoom,
      navigationOptions: ({ navigation }) => ({
        title:'Entrar em sala',
        headerStyle: {
          backgroundColor:'#774F38',
        },
        headerTitleStyle: {
          color: '#ECE5CE',
          fontSize: 22,
          textAlign: 'center',
          width: Dimensions.get('window').width - 130
        },
        headerLayoutPreset: 'center',
        headerTintColor:'#ECE5CE',
      }),
  },
});
export default MainScreen;