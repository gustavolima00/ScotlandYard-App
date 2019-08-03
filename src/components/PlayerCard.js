import React, { Component } from "react";
import { 
    View, 
    Text,
} from "react-native";
import {container, text } from '../style/Styles'

export default class PlayerCard extends Component {
    render(){
        let _height=this.props.height !=undefined ?this.props.height:70;
        let _width=this.props.width != undefined ?this.props.width:350;
        return (
            <View style={[container.touch_card, { height:_height, width:_width, alignItems:'flex-start', backgroundColor:'#E08E79' }]} onPress={this.props.onPress}>
                <Text style={[text.touch_card, {fontSize:16, paddingLeft:15}]}> { this.props.name } </Text>
                <Text style={[text.touch_card, {fontSize:14, paddingLeft:15, fontWeight:'normal'}]}> { this.props.email } </Text>
            </View>
        )
    }
}