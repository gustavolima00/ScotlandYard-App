import React, { Component } from "react";
import { 
    View,
    Text,
    Alert,
} from "react-native";
import Button2 from '../../components/Button2'
import Input from '../../components/Input'
import { container, text } from '../../style/Styles'
import { getUserToken, onSignOut } from "../../helpers/AuthMethods";
import { API_URL } from '../../helpers/Requests'
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      token: undefined,
      room_id: undefined,
      spinner: false,
    }
  }
  componentDidMount() {
    this.loadScreen();
  }
  loadScreen = async () => {
    await getUserToken()
    .then(res => {
        this.setState({ token: res });
        this.update_profile();
    })
  }
  update_profile = async () =>{
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
      if(response.status>= 200 && response.status<300){
        if(self.state.name!==undefined)
          Alert.alert('Sucesso', `Seu nome foi alterado para ${self.state.name}`)
        self.setState({ name: response.data.name });
        self.setState({ room_id: response.data.sala_id });
      }
    })
    .catch(function (error) {
      self.setState({ spinner: false });
      if(error.response===undefined){
        Alert.alert('Erro', 'Erro na conexão com o servidor')
      }
    })
  }
  exit_room = async () => {
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
        Alert.alert('Sucesso', 'Você saiu da sala')
        self.props.navigation.navigate('Home')
      }
    })
    .catch(function (error) {
      self.setState({ spinner: false });
      if(error.response===undefined){
        Alert.alert('Erro', 'Erro na conexão com o servidor')
      }
      else if(error.response.data.error!==undefined){
        Alert.alert('Erro', error.response.data.error)
      }
    })
  }
  log_out = async () => {
    onSignOut();
    Alert.alert('Sucesso', 'Logout realizado com sucesso')
    this.props.navigation.navigate('InicialScreen')
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
          <View style={{ marginTop:30, alignItems:'center' }}>
            <Text style={[text.normal_2, { textAlign:'center', fontWeight:'bold'}]}> Código da sala: {this.state.room_id} </Text>
            <Input 
              placeholder="Nome" 
              placeholderColor="#774F38"
              value={this.state.name}
              onChangeText={(name) => this.setState({name})}
            />
            <Button2 value="Alterar nome" fontSize={18} onPress={this.update_profile}/>
          </View>
          <View style={{ flexDirection:'row'}}>
            <Button2 
              value="Sair da sala"
              onPress={this.exit_room} 
              height={40} 
              width={170} 
              fontSize={18}
            />
            <Button2 
              value="Log out" 
              onPress={this.log_out}
              height={40} 
              width={170} 
              fontSize={18}
            />
          </View>
        </View>
      )
  }
}