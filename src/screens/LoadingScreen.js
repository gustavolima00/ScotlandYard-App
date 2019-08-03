import React, { Component } from "react";
import { 
    View, 
    ActivityIndicator,
} from "react-native";
import { isSignedIn } from "../helpers/AuthMethods";
import { container } from '../style/Styles'
import {NavigationEvents} from 'react-navigation';

export default class LoadingScreen extends Component {
  loadScreen = async () => {
    await isSignedIn()
    .then((res) => {
      if(res)
        this.props.navigation.navigate('MainScreen');
      else
        this.props.navigation.navigate('InicialScreen');
    })
    .catch(err => {console.log(err)});
  }
  render() {
      return (
          <View style={container.backgroud_1}>
            <NavigationEvents onDidFocus={ this.loadScreen } />
            <ActivityIndicator size="large" color="#ECE5CE"/>
          </View>
      )
  }
}
