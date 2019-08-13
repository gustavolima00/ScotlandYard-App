import { createStackNavigator, createAppContainer} from 'react-navigation';
import InicialScreen from './screens/InicialScreen';
import MainScreen from './screens/MainScreen';
import LoadingScreen from './screens/LoadingScreen';
import MainTabs from './screens/MainTabs';
import SignUp from './screens/SignUp';
import { Dimensions } from 'react-native'

const AppNavigator = createStackNavigator({
    LoadingScreen:{
        screen:LoadingScreen,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
    InicialScreen:{
        screen:InicialScreen,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
    MainScreen:{
        screen:MainScreen,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
    MainTabs:{
        screen:MainTabs,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
    SignUp:{
        screen:SignUp,
        navigationOptions: ({ navigation }) => ({
            title:'Criar conta',
            headerStyle: {
              backgroundColor:'#ECE5CE',
            },
            headerTitleStyle: {
              color: '#774F38',
              fontSize: 22,
              textAlign: 'center',
              width: Dimensions.get('window').width - 130
            },
            headerLayoutPreset: 'center',
            headerTintColor:'#774F38',
        }),
    },
});
export const AppContainer = createAppContainer(AppNavigator);

