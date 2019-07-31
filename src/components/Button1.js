import React, { Component } from "react";
import { 
    View, 
    Text,
    TouchableOpacity,
} from "react-native";
import {container, text } from '../style/Styles'

export default class Input extends Component {
    constructor(props) {
        super(props);
            this.state = {
        };
    }
    render(){
        return (
            <TouchableOpacity style={container.button_1} onPress={this.props.onPress}>
                <Text style={text.button_1}> { this.props.value } </Text>
            </TouchableOpacity>
        )
    }
}