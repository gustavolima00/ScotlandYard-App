import React, { Component } from "react";
import { 
    View,
    Text,
    ScrollView,
    Alert
} from "react-native";
import Button2 from '../../components/Button2'
import {container, text} from '../../style/Styles'
import {NavigationEvents} from 'react-navigation';
import { getUserToken } from "../../helpers/AuthMethods";
import { API_URL } from '../../helpers/Requests'
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay';

export default class Case extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: undefined,
            titulo:'',
            descricao:'',
            spinner:true,
            case:{titulo:'', descricao:'', solucao:''},
        }
    }
    loadScreen = async () => {
        await getUserToken()
        .then(res => {
            this.setState({ token: res });
            this.get_case();
        })
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
    showSolution = async () => {
        console.log('trigger')
        this.setState({ spinner: true });
        const exit_path = `${API_URL}/room/exit/`;
        var self = this;
        axios.post(exit_path ,{
          'token': this.state.token,
        })
        .then (function (response) {
          self.setState({ spinner: false });
          console.log('response.data', response.data)
          console.log('response.status', response.status)
          if(response.status>= 200 && response.status<300){
            Alert.alert('Solução do caso:', self.state.case.solucao);
            self.props.navigation.navigate('Home')
            
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
    reveal = async () =>{
        Alert.alert(
            'Revelar Solução do caso?', 
            'Caso revele a solução do caso você deixará a sala, se tiver errado o seu palpite deverá sair do jogo',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sim', onPress: this.showSolution }
            ],
        );
    }
    render() {
        return (
        <View style={[ container.backgroud_2, { justifyContent:'space-between' }]}>
            <Spinner
                color="#ECE5CE"
                visible={this.state.spinner}
                textContent={'Carregando...'}
                textStyle={text.normal_1}
            /> 
            <NavigationEvents onDidFocus={ this.loadScreen } />
            <View style={{marginTop:20, marginLeft:20, marginRight:20}}>
                <Text style={text.case_title}> {this.state.case.titulo} </Text>
                <View style={container.line_2}/>
            </View>
            <ScrollView style={{marginBottom:20, marginLeft:20, marginRight:20}}>
                <View style={{ alignItems:'center'}}>
                    <Text style={text.case_text}> {this.state.case.descricao} </Text>
                    <Button2
                        value="Revelar solução do caso" 
                        onPress={this.reveal}
                        height={50} 
                        width={250}
                        fontSize={18}
                    />
                </View>
            </ScrollView>
        </View>
        )
    }
}