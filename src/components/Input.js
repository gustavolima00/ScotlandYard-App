import React, { Component } from "react";
import { 
    View, 
    TextInput,
    Text,
} from "react-native";
import {container, text } from '../style/Styles'

export default class Input extends Component {
    render(){
        let placeholderColor=this.props.placeholderColor !=undefined ?this.props.placeholderColor:'#ECE5CE';
        let _height=this.props.height !=undefined ?this.props.height:50;
        let _width=this.props.width != undefined ?this.props.width:300;
        
        return (
            <View>
                <Text style={[text.input_1, {color:placeholderColor}]}> { this.props.title } </Text>
                <View style={[container.input_1, {height:_height, width:_width}]}>
                    <TextInput
                        {...this.props}
                        style = {text.normal_2}
                    />
                </View>
            </View>
        )
    }
}