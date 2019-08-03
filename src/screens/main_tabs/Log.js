import React, { Component } from "react";
import { 
    View,
    Text,
    ScrollView,
    RefreshControl,
    FlatList,
    Alert,
} from "react-native";
import {container, text} from '../../style/Styles'
import {NavigationEvents} from 'react-navigation';
import { getUserToken } from "../../helpers/AuthMethods";
import { API_URL } from '../../helpers/Requests'
import PlayerCard from '../../components/PlayerCard'
import axios from 'axios'

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }
  
export default class Log extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: undefined,
            log:[],
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
        const get_log_path = `${API_URL}/room/get_log/`;
        var self = this;
        axios.post(get_log_path ,{
            'token': this.state.token,
        })
        .then (function (response) {
            self.setState({ refreshing: false });
            console.log('response.data', response.data)
            console.log('response.status', response.status)
            if(response.status>= 200 && response.status<300){
                var date_test = new Date(response.data[0].time);
                console.log(date_test.getHours());
                self.setState({log:response.data});
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
    get_date(date_string){
        var date = new Date(date_string);
        var ans =  `${date.getHours().pad()}:${date.getMinutes().pad()}`
        return ans
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
                        renderItem={({item}) => <PlayerCard name={item.text} email={this.get_date(item.time)} /> }
                        keyExtractor={(item) => item.time}
                    />
                </ScrollView>
            </View>
        )
    }
}