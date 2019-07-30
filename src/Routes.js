import { createStackNavigator, createAppContainer} from 'react-navigation';
import Login from './screens/Login';
import Register from './screens/Register';
import MainScreen from './screens/MainScreen';

const AppNavigator = createStackNavigator({
    Login:{
        screen:Login,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
    Register:{
        screen:Register,
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
});
export const AppContainer = createAppContainer(AppNavigator);

