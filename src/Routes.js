import { createStackNavigator, createAppContainer} from 'react-navigation';
import InicialScreen from './screens/InicialScreen';
import MainScreen from './screens/MainScreen';

const AppNavigator = createStackNavigator({
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
});
export const AppContainer = createAppContainer(AppNavigator);

