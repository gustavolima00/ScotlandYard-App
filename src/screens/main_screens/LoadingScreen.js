import React, { Component } from "react";
import { 
    View, 
    ActivityIndicator,
} from "react-native";
import { isSignedIn } from "../../helpers/AuthMethods";
import { container } from '../../style/Styles'


export default class LoadingScreen extends Component {
  componentDidMount() {
    isSignedIn()
    .then((res) => {
      if(res)
        this.props.navigation.navigate('Home');
      else
        this.props.navigation.navigate('InicialScreen');
    })
    .catch(err => alert("Erro"));
  }
  render() {
      return (
          <View style={container.backgroud_1}>
              <ActivityIndicator size="large" color="#ECE5CE"/>
          </View>
      )
  }
}
