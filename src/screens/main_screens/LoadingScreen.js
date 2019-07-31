import React, { Component } from "react";
import { 
    View, 
    ActivityIndicator,
} from "react-native";
import { getUserToken } from "../../helpers/AuthMethods";
import { container } from '../../style/Styles'
import { API_URL } from '../../helpers/Requests'
import axios from 'axios'

export default class LoadingScreen extends Component {
  constructor(props){
    super(props);
    this.state ={
      token: undefined,
      room_id: undefined,
    }
  }
  componentDidMount() {
    this.loadScreen();
  }
  loadScreen = async () => {
    await getUserToken()
    .then(res => {
        this.setState({ token: res });
        this.request_room_id();
    })
  }
  request_room_id = async () =>{
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
        if(self.state.sala_id===""){
          self.props.navigation.navigate('Home');
        }
        else{
          self.props.navigation.navigate('MainTabs');
        }
      }
    })
    .catch(function (error) {
      self.setState({ spinner: false });
      if(error.response===undefined){
        Alert.alert('Erro', 'Erro na conexão com o servidor')
        self.props.navigation.navigate('InicialScreen');
      }
    })
  }
  render() {
      return (
          <View style={container.backgroud_1}>
              <ActivityIndicator size="large" color="#ECE5CE"/>
          </View>
      )
  }
}
