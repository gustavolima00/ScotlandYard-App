import React, { Component } from "react";
import { 
    View, 
    Text,
    TouchableOpacity,
} from "react-native";
import {container, text } from '../style/Styles'

export default class Input extends Component {
    render(){
        let _height=this.props.height !=undefined ?this.props.height:50;
        let _width=this.props.width != undefined ?this.props.width:150;
        let _fontSize=this.props.fontSize != undefined?this.props.fontSize:20;
        return (
            <TouchableOpacity style={[container.button_1, { height:_height, width:_width }]} onPress={this.props.onPress}>
                <Text style={[text.button_1, {fontSize:_fontSize}]}> { this.props.value } </Text>
            </TouchableOpacity>
        )
    }
}