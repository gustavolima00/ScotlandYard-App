import React, { Component } from "react";
import { 
    View,
    Text,
} from "react-native";
import {container, text} from '../../../style/Styles'

export default class PlaceDetails extends Component {
  render() {
      return (
          <View style={container.backgroud_2}>
              <Text style={text.normal_2}> Place Details </Text>
          </View>
      )
  }
}