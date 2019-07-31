import React, { Component } from "react";
import Input from '../components/Input'
import Button1 from '../components/Button1'
import {container, text, IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL} from '../style/Styles'
import { View, Animated, Keyboard, KeyboardAvoidingView, Image, Alert } from 'react-native';
import { API_URL } from '../helpers/Requests'
import { onSignIn } from "../helpers/AuthMethods";
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay';

export default class InicialScreen extends Component {
    constructor(props) {
        super(props);
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
        this.state = {
            email:'',
            password:'',
            spinner: false,
        }
    }
    componentDidMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide); 
    }
    componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
        this.setState({ spinner: false });
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
    login = async () => {
        this.setState({ spinner: true });
        const login_path = `${API_URL}/auth/token_obtain/`;
        var self = this;
        axios.post(login_path ,{
            'username': this.state.email,
            'password': this.state.password,
        })
        .then (function (response) {
            self.setState({ spinner: false });
            console.log('response.data', response.data)
            console.log('response.status', response.status)
            if(response.status>= 200 && response.status<300){
                onSignIn(response.data.token);
                self.props.navigation.navigate('MainScreen');
            }
        })
        .catch(function (error) {
            self.setState({ spinner: false });
            if(error.response===undefined)
                Alert.alert('Erro', 'Erro na conexão com o servidor')
            else if(error.response.data.username!==undefined) 
                Alert.alert('Erro no campo de Email', error.response.data.username[0])
            else if(error.response.data.password!==undefined) 
                Alert.alert('Erro no campo da Senha', error.response.data.password[0])
            else if(error.response.data.non_field_errors !== undefined)
                Alert.alert('Erro', error.response.data.non_field_errors[0])
        })
    }
    signin = async () => {
        this.setState({ spinner: true });
        const login_path = `${API_URL}/auth/registration/`;
        var self = this;
        axios.post(login_path ,{
            'username': this.state.email,
            'email': this.state.email,
            'password1': this.state.password,
            'password2': this.state.password,
        })
        .then (function (response) {
            self.setState({ spinner: false });
            console.log('response.data', response.data)
            console.log('response.status', response.status)
            if(response.status>= 200 && response.status<300){
                onSignIn(response.data.token);
                self.props.navigation.navigate('MainScreen');
            }
        })
        .catch(function (error) {
            self.setState({ spinner: false });
            if(error.response===undefined)
                Alert.alert('Erro', 'Erro na conexão com o servidor')
            else if(error.response.data.password1!=undefined) 
                Alert.alert('Erro no campo da Senha', error.response.data.password1[0])
            else if(error.response.data.email!=undefined) 
                Alert.alert('Erro no campo de Email', error.response.data.email[0])
            else if(error.response.data.non_field_errors != undefined)
                Alert.alert('Erro', error.response.data.non_field_errors[0])
        })
    }
    render() {
        return (
            <KeyboardAvoidingView style={container.backgroud_1}>
                <Spinner
                    color="#ECE5CE"
                    visible={this.state.spinner}
                    textContent={'Carregando...'}
                    textStyle={text.normal_1}
                />           
                <Animated.Image
                    style={{width: this.imageHeight, height:this.imageHeight}}
                    source={require('../img/detective.png')}
                />
                <View>
                    <Input placeholder={'Email'} onChangeText={(email) => this.setState({email})}/>
                    <Input placeholder={'Senha'} secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
                </View>
                <View style={{flexDirection:'row'}}> 
                    <Button1 value="Criar Conta" onPress={this.signin} />
                    <Button1 value="Entrar" onPress={this.login} />
                </View>
            </KeyboardAvoidingView>
        )
    }
}