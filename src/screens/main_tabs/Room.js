import React, { Component } from "react";
import { 
    View,
    Text,
    Alert,
    FlatList,
    ScrollView,
    RefreshControl,
} from "react-native";
import Button2 from '../../components/Button2'
import PlayerCard from '../../components/PlayerCard'
import { container, text } from '../../style/Styles'
import { getUserToken, onSignOut } from "../../helpers/AuthMethods";
import { API_URL } from '../../helpers/Requests'
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationEvents } from 'react-navigation';

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: undefined,
      room_id: undefined,
      spinner: false,
      refreshing: false,
      players: [],
    }
  }
  loadScreen = async () => {
    await getUserToken()
    .then(res => {
        this.setState({ token: res });
        this.update_profile();
        this.get_players();
    })
  }
  update_profile = async () =>{
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
  get_players = async () => {
    this.setState({ refreshing: true });
    const players_path = `${API_URL}/room/players/`;
    var self = this;
    axios.post(players_path ,{
      'token': this.state.token,
    })
    .then (function (response) {
      self.setState({ refreshing: false });
      console.log('response.data', response.data)
      console.log('response.status', response.status)
      if(response.status>= 200 && response.status<300){
        self.setState({ players: response.data });
      }
    })
    .catch(function (error) {
      self.setState({ refreshing: false });
      if(error.response===undefined){
        Alert.alert('Erro', 'Erro na conexão com o servidor')
      }
      else if(error.response.data.error!==undefined){
        Alert.alert('Erro', error.response.data.error)
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
          <NavigationEvents onDidFocus={ this.loadScreen } />
          <Spinner
                color="#ECE5CE"
                visible={this.state.spinner}
                textContent={'Carregando...'}
                textStyle={text.normal_1}
            /> 
          <View style={{ marginTop:30, alignItems:'center' }}>
            <Text style={[text.header, { color: '#774F38'}]}> Código da sala: {this.state.room_id} </Text>
            <View style={container.line_2}/>
            <Text style={text.normal_2}> Jogadores: </Text>
          </View>
          <ScrollView
            style={{height:300}}
            refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.get_players}
                />
              }
          >
            <FlatList
              data={this.state.players}
              renderItem={({item}) => <PlayerCard name={item.name} email={item.user.email}/> }
              keyExtractor={(item) => String(item.user.id)}
            />
          </ScrollView>
          <View>
            <View style={container.line_2}/>
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
        </View>
      )
  }
}