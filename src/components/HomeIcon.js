import React, { Component } from "react";
import { 
    View, 
    Text,
    Image,
} from "react-native";
import {container, text } from '../style/Styles'

export default class HomeIcon extends Component {
    constructor(props) {
        super(props);
            this.state = {
        };
    }
    render(){
        return (
            <View style={container.big_icon_1}>
                <View style={container.big_icon_circle}>
                    <Image
                        style={{width: 100, height: 100}}
                        source={require('../img/detective.png')}
                    />
                </View>
                <Text style={text.big_1}> Scotland Yard </Text>
            </View>
        )
    }
}