import React, { Component } from "react";
import Input from '../components/Input'
import Button1 from '../components/Button1'
import {container, text, IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL} from '../style/Styles'
import { View, Animated, Keyboard, KeyboardAvoidingView, Image, Text } from 'react-native';

export default class InicialScreen extends Component {
    constructor(props) {
        super(props);
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    }
    componentDidMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide); 
    }
    componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
    }
    keyboardDidShow = (event) => {
        Animated.timing(this.imageHeight, {
            duration: 300,
            toValue: IMAGE_HEIGHT_SMALL,
        }).start();
    };
    
    keyboardDidHide = (event) => {
        Animated.timing(this.imageHeight, {
            duration: 300,
            toValue: IMAGE_HEIGHT,
        }).start();
    };
    
    render() {
        return (
            <KeyboardAvoidingView style={container.backgroud_1}>           
                        <Animated.Image
                            style={{width: this.imageHeight, height:this.imageHeight}}
                            source={require('../img/detective.png')}
                        />
                <View>
                    <Input placeholder={'Email: '}/>
                    <Input placeholder={'Senha: '} secureTextEntry={true}/>
                </View>
                <View> 
                    <Button1 value="Entrar"/>
                    <Button1 value="Criar Conta"/>
                </View>
            </KeyboardAvoidingView>
        )
    }
}