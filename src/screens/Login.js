import React, { Component } from "react";
import { 
    View, 
    Text,
} from "react-native";
import {container, text } from '../style/Styles'

export default class Login extends Component {
    render() {
        return (
            <View style={container.backgroud_2}>
                <Text style={text.text_2_big}> Login </Text>
            </View>
        )
    }

}