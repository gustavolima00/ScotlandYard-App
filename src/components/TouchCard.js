import React, { Component } from "react";
import { 
    View, 
    Text,
    TouchableOpacity,
} from "react-native";
import {container, text } from '../style/Styles'

export default class TouchCard extends Component {
    render(){
        let _height=this.props.height !=undefined ?this.props.height:70;
        let _width=this.props.width != undefined ?this.props.width:350;
        let _fontSize=this.props.fontSize != undefined?this.props.fontSize:18;
        return (
            <TouchableOpacity style={[container.touch_card, { height:_height, width:_width }]} onPress={this.props.onPress}>
                <Text style={[text.touch_card, {fontSize:_fontSize}]}> { this.props.value } </Text>
            </TouchableOpacity>
        )
    }
}