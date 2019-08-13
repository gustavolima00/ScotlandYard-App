import React, { Component } from "react";
import Input from '../components/Input'
import Button1 from '../components/Button1'
import {container, text, IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL} from '../style/Styles'
import { View, Animated, Keyboard, KeyboardAvoidingView, Image, Alert, Platform } from 'react-native';
import { API_URL } from '../helpers/Requests'
import { onSignIn } from "../helpers/AuthMethods";
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
        this.state = {
            email:'',
            name:'',
            email: '',
            password:'',
            token: undefined,
            spinner: false,
        }
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
                self.setState({token:response.data['token']})
                self.update_user()
                self.props.navigation.navigate('MainScreen');
            }
        })
        .catch(function (error) {
            self.setState({ spinner: false });
            console.log(error)
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
    update_user = async () =>{
        this.setState({ spinner: true });
        const update_path = `${API_URL}/player/update/`;
        var self = this;
        axios.post(update_path ,{
            'token': this.state.token,
            'name': this.state.name,
        })
        .then (function (response) {
          self.setState({ spinner: false });
          console.log('response.data', response.data)
          console.log('response.status', response.status)
        })
        .catch(function (error) {
          self.setState({ spinner: false });
          if(error.response===undefined)
            Alert.alert('Erro', 'Erro na conexão com o servidor')
        })
      }
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={[container.backgroud_1, { flex:1, justifyContent: 'space-between' }]}>
                <Spinner
                    color="#ECE5CE"
                    visible={this.state.spinner}
                    textContent={'Carregando...'}
                    textStyle={text.normal_1}
                />           
                <View>
                    <Input title={'Nome'} onChangeText={(name) => this.setState({name})}/>
                    <Input title={'Email'} onChangeText={(email) => this.setState({email})}/>
                    <Input title={'Senha'} secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
                </View>
                <View style={{flexDirection:'row', marginBottom:20}}> 
                    <Button1 value="Criar Conta" onPress={this.signin} />
                </View>
            </KeyboardAvoidingView>
        )
    }
}