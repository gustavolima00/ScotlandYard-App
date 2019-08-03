import React, { Component } from "react";
import { 
    View,
    Text,
    ScrollView,
    RefreshControl,
    FlatList,
} from "react-native";
import {container, text} from '../../style/Styles'
import {NavigationEvents} from 'react-navigation';
import { getUserToken } from "../../helpers/AuthMethods";
import { API_URL } from '../../helpers/Requests'
import PlayerCard from '../../components/PlayerCard'
import axios from 'axios'

export default class Log extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: undefined,
            log:[ { time:"15:50", action:"Fulano abriu a pista do Banco" }, { time:"15:42", action:"Pedro entrou na sala" } ],
            refreshing:true,
        }
    }
    loadScreen = async () => {
        await getUserToken()
        .then(res => {
            this.setState({ token: res });
            this.get_log();
        })
    }
    get_log = async () =>{
        this.setState({ refreshing: true });
        const get_log_path = `${API_URL}/room/get_case/`;
        var self = this;
        axios.post(get_log_path ,{
            'token': this.state.token,
        })
        .then (function (response) {
            self.setState({ refreshing: false });
            console.log('response.data', response.data)
            console.log('response.status', response.status)
            if(response.status>= 200 && response.status<300){
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
    render() {
        return (
            <View style={[ container.backgroud_2, { justifyContent:'space-between' }]}>
                <NavigationEvents onDidFocus={ this.loadScreen } />
                <View style={{marginTop:20, marginLeft:20, marginRight:20}}>
                    <Text style={text.case_title}> Log da sala </Text>
                    <View style={container.line_2}/>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this.loadScreen}
                        />
                      }
                >
                    <FlatList 
                        data={this.state.log}
                        renderItem={({item}) => <PlayerCard name={item.time} email={item.action} /> }
                        keyExtractor={(item) => item.time}
                    />
                </ScrollView>
            </View>
        )
    }
}