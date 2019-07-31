import React, { Component } from "react";
import { 
    View, 
    StatusBar,
} from "react-native";
import HomeIcon from '../components/HomeIcon'
import Input from '../components/Input'
import Button1 from '../components/Button1'
import {container, text } from '../style/Styles'

export default class InicialScreen extends Component {
    login (){
        a = 1+1;
        return a;
    }
    render() {
        return (
            <View>
                <View style={container.backgroud_1}>           
                    <View>
                        <HomeIcon/>
                    </View>
                    <View>
                        <Input placeholder={'Email: '}/>
                        <Input placeholder={'Senha: '} secureTextEntry={true}/>
                    </View>
                    <View> 
                        <Button1 value="Entrar" onPress={this.login}/>
                        <Button1 value="Criar Conta"/>
                    </View>
                </View>
            </View>
        )
    }
}