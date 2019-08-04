import React, { Component } from "react";
import { 
    View,
    Text,
    Alert,
} from "react-native";
import Button2 from '../../../components/Button2'
import {container, text} from '../../../style/Styles'
import {NavigationEvents} from 'react-navigation';
import { getUserToken } from "../../../helpers/AuthMethods";
import { API_URL } from '../../../helpers/Requests'
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay';

const unlock_text = "Desbloquear Pista"
const lock_text = "Bloquear Pista"
export default class PlaceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: undefined,
            message: '',
            button_text:unlock_text,
            place_code:undefined,
            place_name:undefined,
            spinner:true,
            unlocked:true,
            case:undefined,
        }
    }
    loadScreen = async () => {
        await getUserToken()
        .then(res => {
            this.setState({ token: res });
            var place_code = this.props.navigation.getParam('place_code', undefined);
            console.log('place_code', place_code)
            var place_name = this.props.navigation.getParam('place_name', undefined);
            console.log('place_name', place_name);
            this.setState({place_code});
            this.setState({place_name});
            this.get_case();
            this.update_user();
        })
    }
    update_text(){
        var message;
        if(!this.state.unlocked){
            message =  `A Pista do ${this.state.place_name} não foi desbloqueada.\nAperte o botão desbloquear pista\nAPENSA SE TIVER ENTRADO NO LOCAL`
            this.setState({ message:message, button_text:unlock_text });
        }
        else{
            message = this.state.case[`pista_${this.state.place_code}`];
            this.setState({ message:message, button_text:lock_text });
        }
    }
    get_case = async () =>{
        this.setState({ spinner: true });
        const get_case_path = `${API_URL}/room/get_case/`;
        var self = this;
        axios.post(get_case_path ,{
            'token': this.state.token,
        })
        .then (function (response) {
            self.setState({ spinner: false });
            console.log('response.data', response.data)
            console.log('response.status', response.status)
            if(response.status>= 200 && response.status<300){
                self.setState({case:response.data});
            }
        })
        .catch(function (error) {
            console.log('error', error)
            self.setState({ spinner: false });
            if(error.response===undefined){
                Alert.alert('Erro', 'Erro na conexão com o servidor')
            }
            else if(error.response.data.error!==undefined){
                Alert.alert('Erro', error.response.data.error)
            }
        })
    }
    update_user = async () => {
        this.setState({ spinner: true });
        const update_path = `${API_URL}/player/update/`;
        var self = this;
        axios.post(update_path ,{
            'token': this.state.token,
        })
        .then (function (response) {
            self.setState({ spinner: false });
            console.log('response.data', response.data)
            console.log('response.status', response.status)
            if(response.status>= 200 && response.status<300){
                var value = `pista_${self.state.place_code}`
                self.setState({unlocked:response.data[value]});
                self.update_text();
            }
        })
        .catch(function (error) {
            console.log('error', error)
            self.setState({ spinner: false });
            console.log(error)
            if(error.response===undefined)
                Alert.alert('Erro', 'Erro na conexão com o servidor')
        })
    }
    changeState = async () => {
        if(!this.state.unlocked){
            Alert.alert(
                'Tem certeza que deseja desbloquear a pista?', 
                'Só realize essa ação caso tenha entrado no local.',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Sim', onPress: this.requestChange }
                ],
            );
        }
        else{
            this.requestChange();
        }
    }
    requestChange = async () => {
        this.setState({ spinner: true });
        const update_path = `${API_URL}/player/update_hints/`;
        var self = this;
        var obj = {}
        obj['token'] = this.state.token
        obj[`pista_${self.state.place_code}`] = !this.state.unlocked;
        this.setState({unlocked:!this.state.unlocked});
        console.log(obj)
        axios.post(update_path , obj)
        .then (function (response) {
            self.setState({ spinner: false });
            console.log('response.data', response.data)
            console.log('response.status', response.status)
            if(response.status>= 200 && response.status<300){                
                self.update_text();
            }
        })
        .catch(function (error) {
            self.setState({ spinner: false });
            console.log(error)
            if(error.response===undefined)
                Alert.alert('Erro', 'Erro na conexão com o servidor')
        })
    }
    render() {
        return (
            <View style={[ container.backgroud_2, { justifyContent:'space-between' }]}>
                <NavigationEvents onDidFocus={ () => { this.setState({spinner:true}); this.loadScreen();} } />
                <Spinner
                    color="#ECE5CE"
                    visible={this.state.spinner}
                    textContent={'Carregando...'}
                    textStyle={text.normal_1}
                />
                <View style={{ justifyContent:'center', flex:1, padding:10}}>
                    <Text style={[text.normal_2, {textAlign:'center'}]}> {this.state.message} </Text>
                </View>
                <Button2 
                    value={this.state.button_text}
                    height={60}
                    width={300}
                    onPress={this.changeState}
                />
            </View>
        )
    }
}