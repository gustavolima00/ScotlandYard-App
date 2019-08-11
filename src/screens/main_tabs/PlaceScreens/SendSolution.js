import React, { Component } from "react";
import { 
    View,
    Text,
    Alert,
    Linking,
} from "react-native";
import Button2 from '../../../components/Button2'
import Input from '../../../components/Input'
import {container, text} from '../../../style/Styles'
import {NavigationEvents} from 'react-navigation';
import { getUserToken } from "../../../helpers/AuthMethods";
import { API_URL } from '../../../helpers/Requests'
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay';

export default class SendSolution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: undefined,
            solution: '',
            real_solution:'',
            spinner:false,
        }
    }
    loadScreen = async () => {
        this.setState({spinner:true});
        await getUserToken()
        .then(res => {
            this.setState({ token: res });
            this.setState({spinner:false});
        })
    }
    send_solution = async () =>{
        this.setState({ spinner: true });
        const send_solution_path = `${API_URL}/room/send_solution/`;
        var self = this;
        axios.post(send_solution_path ,{
            'token': this.state.token,
        })
        .then (function (response) {
          self.setState({ spinner: false });
          console.log('response.data', response.data)
          console.log('response.status', response.status)
          if(response.status>= 200 && response.status<300){
            Alert.alert('Você enviou sua solução', 
                `Real solução do caso: \n ${response.data.solution}`)
            self.props.navigation.navigate('Home')
          }
        })
        .catch(function (error) {
          console.log('error', error)
          self.setState({ spinner: false });
          if(error.response===undefined){
            Alert.alert('Erro', 'Erro na conexão com o servidor')
          }
        })
    }
    reveal = async () =>{
        Alert.alert(
            'Enviar solução do caso?', 
            'Caso envie a solução do caso você deixará a sala.\nSe tiver errado o seu palpite deverá sair do jogo, caso contrário será o vencedor',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sim', onPress: this.send_solution }
            ],
        );
    }
    render() {
        return (
            <View style={[ container.backgroud_2, { justifyContent:'space-between' }]}>
                <NavigationEvents onDidFocus={ () => { this.loadScreen();} } />
                <Spinner
                    color="#ECE5CE"
                    visible={this.state.spinner}
                    textContent={'Carregando...'}
                    textStyle={text.normal_1}
                />
                <View style={{ margin:10, flex:1, justifyContent: 'center'}}>
                    <Text style={[text.normal_2, {textAlign:'center'}]}>  A solução deve ser escrita respondendo as perguntas do caso. Todas as perguntas devem ser respondidas. Para mais informações acesso o link </Text>
                    <Text onPress={ () => Linking.openURL('https://gustavolima00.github.io/ScotlandYard/rules.html#termino-do-jogo') } style={[text.normal_2, {textAlign:'center', color:'#E08E79'}]}>  link </Text>
                </View>
                <Input
                    height={200}
                    multiline = {true}
                    onChangeText={(solution) => this.setState({solution})}
                />
                <Button2 
                    value="Entregar Solução"
                    height={60}
                    width={300}
                    onPress={this.reveal}
                />
            </View>
        )
    }
}