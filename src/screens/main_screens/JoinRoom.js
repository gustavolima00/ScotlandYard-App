import React, { Component } from "react";
import { 
    View,
    Alert,
} from "react-native";
import Input from '../../components/Input'
import Button2 from '../../components/Button2'
import {container, text} from '../../style/Styles'
import Spinner from 'react-native-loading-spinner-overlay';
import { API_URL } from '../../helpers/Requests'
import axios from 'axios'
import { getUserToken } from '../../helpers/AuthMethods'
import { NavigationActions } from 'react-navigation';

export default class JoinRoom extends Component {
    constructor(props){
        super(props);
        this.state ={
            room_id: undefined,
            token: undefined,
            spinner:false,
        }
    }
    loadScreen = async () => {
        await getUserToken()
        .then(res => {
            this.setState({ token: res });
        })
    }
    componentDidMount(){
        this.loadScreen();
    }
    joinRoom = async () => {
        this.setState({ spinner: true });
        const join_path = `${API_URL}/room/join/`;
        var self = this;
        axios.post(join_path ,{
            'token': this.state.token,
            'id': this.state.room_id,
        })
        .then (function (response) {
            self.setState({ spinner: false });
            console.log('response.data', response.data)
            console.log('response.status', response.status)
            if(response.status>= 200 && response.status<300){
                Alert.alert(`Código da sala: ${response.data.id}`, 'O código também pode ser encontrado na aba configurações')
                self.props.navigation.navigate('MainTabs')
            }
        })
        .catch(function (error) {
            self.setState({ spinner: false });
            console.log('response.data', error.response.data)
            if(error.response.data.error!==undefined)
                Alert.alert('Erro', error.response.data.error)
            

        })
    }
    render() {
        return (
            <View style={[container.backgroud_2, { justifyContent:'center', alignItems:'center' }]}>
                <Spinner
                    color="#ECE5CE"
                    visible={this.state.spinner}
                    textContent={'Carregando...'}
                    textStyle={text.normal_1}
                /> 
                <Input 
                    placeholder="Código" 
                    placeholderColor="#774F38" 
                    onChangeText={(room_id) => this.setState({room_id})}
                />
                <Button2 
                    value="Entrar na sala" 
                    onPress={this.joinRoom}
                />
            </View>
        )
    }
}