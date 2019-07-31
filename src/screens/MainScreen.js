import React, { Component } from "react";
import { 
    View,
} from "react-native";
import Button1 from '../components/Button1'
import {container, text} from '../style/Styles'
import { onSignOut } from "../helpers/AuthMethods";

export default class MainScreen extends Component {
  signOut = async () => {
    onSignOut()
    this.props.navigation.navigate('InicialScreen')
  }
  render() {
      return (
          <View style={container.backgroud_1}>
              <Button1 value="Sair" onPress={this.signOut}/>
          </View>
      )
  }
}