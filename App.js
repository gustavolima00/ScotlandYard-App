import React from 'react';
import { AppContainer } from './src/Routes';
import {handleNavigationChange} from 'react-navigation'

export default  class App extends React.Component{
  render() {
    return  <AppContainer
              onNavigationStateChange={handleNavigationChange}
              uriPrefix="/app"
            />;
  }
}