import React, { Component } from "react";
import { 
    View, 
    TextInput,
    Text,
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
            <View>
                <Text style={text.input_1}> { this.props.placeholder } </Text>
                <View style={container.input_1}>
                    <TextInput
                        style = {text.normal_2}
                        onChangeText={this.props.onChangeText}
                        value={this.props.value}
                        secureTextEntry={this.props.secureTextEntry}
                    />
                </View>
            </View>
        )
    }
}