import React, { Component } from "react";
import { 
    View, 
    Text,
    TouchableOpacity,
} from "react-native";
import {container, text } from '../style/Styles'

export default class Button2 extends Component {
    render(){
        let _height=this.props.height !=undefined ?this.props.height:50;
        let _width=this.props.width != undefined ?this.props.width:150;
        let _fontSize=this.props.fontSize != undefined?this.props.fontSize:20;
        let _backgroudColor=this.props.backgroudColor != undefined ?this.props.backgroudColor:'#774F38';
        let _textColor = this.props.textColor != undefined ?this.props.textColor:'#ECE5CE';
        return (
            <TouchableOpacity style={[container.button_2, { height:_height, width:_width, backgroundColor:_backgroudColor }]} onPress={this.props.onPress}>
                <Text style={[text.button_2, {fontSize:_fontSize, color:_textColor}]}> { this.props.value } </Text>
            </TouchableOpacity>
        )
    }
}