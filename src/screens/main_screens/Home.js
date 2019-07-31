import React, { Component } from "react";
import { 
    View,
    Image,
    KeyboardAvoidingView,
} from "react-native";
import Button1 from '../../components/Button1'
import Input from '../../components/Input'
import {container, text } from '../../style/Styles'
import { onSignOut } from "../../helpers/AuthMethods";
import { getUserToken } from '../../helpers/AuthMethods'
import Spinner from 'react-native-loading-spinner-overlay';
import { API_URL } from '../../helpers/Requests'
import axios from 'axios'

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state ={
      name: undefined,
      token: undefined,
      spinner:false,
    }
  }
  loadScreen = async () => {
    await getUserToken()
    .then(res => {
        this.setState({ token: res });
        this.update_user();
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
      if(response.status>= 200 && response.status<300){
        self.setState({ name: response.data.name });
      }
    })
    .catch(function (error) {
      self.setState({ spinner: false });
      console.log('response.data', error.response.data)
      Alert.alert('Error')
    })
  }
  componentDidMount(){
    this.loadScreen();
  }
  signOut = async () => {
    onSignOut()
    this.props.navigation.navigate('InicialScreen')
  }
  create_room = async () =>{
    this.props.navigation.navigate('CreateRoom')
  }
  join_room = async () =>{
    this.props.navigation.navigate('JoinRoom')
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
            <Image 
              source={require('../../img/detective.png')}
              style={{ height:150, width:150 }}
            />
            <View style={{ alignItems:'flex-end' }}>
              <Input
                placeholder="Nome"
                value={this.state.name}
              />
              <Button1 value="Alterar Nome" height={45} width={150} fontSize={18} onPress={this.update_user}/>
            </View>
            <View style={{ flexDirection:'row', justifyContent:'space-around' }}>
              <Button1 value="Entrar em uma sala" height={50} fontSize={18} onPress={this.join_room}/>
              <Button1 value="Criar Sala" height={50} fontSize={18} onPress={this.create_room} />
            </View>
            <Button1 value="Sair" height={35} width={120} fontSize={18} onPress={this.signOut}/>
          </KeyboardAvoidingView>
      )
  }
}