import React, { Component } from "react";
import { 
    View, 
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import { image, text, container } from '../style/Styles'

export default class BottonIcon extends Component {
    render(){
        let img_name = this.props.imageName;
        let img_active, img_unactive;
        if(img_name==='case'){
            img_active = require(`../img/case_active.png`)
            img_unactive = require(`../img/case_unactive.png`)
        }
        else if(img_name==='places'){
            img_active = require(`../img/places_active.png`)
            img_unactive = require(`../img/places_unactive.png`)
        }
        else if(img_name==='settings'){
            img_active = require(`../img/settings_active.png`)
            img_unactive = require(`../img/settings_unactive.png`)
        }
        else if(img_name==='room'){
            img_active = require(`../img/room_active.png`)
            img_unactive = require(`../img/room_unactive.png`)
        }
        else if(img_name==='log'){
            img_active = require(`../img/log_active.png`)
            img_unactive = require(`../img/log_unactive.png`)
        }
        else{
            img_active = require(`../img/hint_active.png`)
            img_unactive = require(`../img/hint_unactive.png`)
        }
        if(this.props.focused){
            return (
                <View style={container.botton_icon}>
                    <View style={container.botton_circle_icon}>
                        <Image
                            source={img_active}
                            style={image.botton_icon_active}
                        />
                    </View>
                    <Text style={text.botton_icon_active}> {this.props.label} </Text>
                </View>
            );
        }
        else{
            return (
                <View style={container.botton_icon}>
                    <View style={container.botton_circle_icon}>
                        <Image
                            source={img_unactive}
                            style={image.botton_icon_unactive}
                        />
                    </View>
                    <Text style={text.botton_icon_unactive}> {this.props.label} </Text>
                </View>
            );
        }
    }
}