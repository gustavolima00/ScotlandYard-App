import React, { Component } from "react";
import { 
    View,
    Text,
} from "react-native";
import Button2 from '../../components/Button2'
import { container } from '../../style/Styles'

export default class Settings extends Component {
  signOut = async () => {
    this.props.navigation.navigate('Home');
  }
  render() {
      return (
          <View style={container.backgroud_2}>
              <Button2 value="Sair" onPress={this.signOut}/>
          </View>
      )
  }
}