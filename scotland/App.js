import React from 'react';
import GameScreen from './src/screens/GameScreen';
import InicialScreen from './src/screens/InicialScreen';

import { createStackNavigator, createAppContainer } from 'react-navigation';

const RootStack =  createStackNavigator({ 
  InicialScreen:{ 
    screen:InicialScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,        
    }), 
  },
  GameScreen:{ 
    screen:GameScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,        
    }), 
  }
});
const App = createAppContainer(RootStack);
export default App;

