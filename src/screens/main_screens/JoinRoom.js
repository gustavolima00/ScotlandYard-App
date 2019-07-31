import React, { Component } from "react";
import { 
    View,
    Text,
} from "react-native";
import {container, text} from '../../style/Styles'

export default class JoinRoom extends Component {
  render() {
      return (
          <View style={container.backgroud_1}>
              <Text style={text.normal_1}> JoinRoom </Text>
          </View>
      )
  }
}