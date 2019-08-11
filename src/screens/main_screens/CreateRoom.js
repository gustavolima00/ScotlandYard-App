import React, { Component } from "react";
import { 
    View,
    Alert,
    FlatList,
    ScrollView,
    RefreshControl,
} from "react-native";
import { NavigationEvents } from 'react-navigation';
import Input from '../../components/Input'
import TouchCard from '../../components/TouchCard'
import {container, text} from '../../style/Styles'
import Spinner from 'react-native-loading-spinner-overlay';
import { API_URL } from '../../helpers/Requests'
import axios from 'axios'
import { getUserToken } from '../../helpers/AuthMethods'

export default class CreateRoom extends Component {
    constructor(props){
        super(props);
        this.state ={
            token: undefined,
            spinner:true,
            cases:[],
            refreshing: false,
            search_text: ''
        }
    }
    loadScreen = async () => {
        await getUserToken()
        .then(res => {  
            this.setState({ token: res });
            this.getCases();
        })
    }
    getCases = async () => {
        const search_path = `${API_URL}/case/`;
        var self = this;
        axios.get(search_path)
        .then (function (response) {
            self.setState({spinner: false});
            console.log('response.data', response.data)
            console.log('response.status', response.status)
            self.setState({ cases: response.data });
        })
        .catch(function (error) {
            self.setState({spinner: false});
            console.log(error)
        })
    }
    searchCases = async () => {
        this.setState({refreshing: true});
        const search_path = `${API_URL}/case/?search=${this.state.search_text}`;
        var self = this;
        axios.get(search_path)
        .then (function (response) {
            self.setState({refreshing: false});
            console.log('response.data', response.data)
            console.log('response.status', response.status)
            self.setState({ cases: response.data });
        })
        .catch(function (error) {
            self.setState({refreshing: false});
            console.log(error)
        })
    }
    createRoom = async ( case_id ) => {
        this.setState({ spinner: true });
        const create_path = `${API_URL}/room/create/`;
        var self = this;
        axios.post(create_path ,{
            'token': this.state.token,
            'case_id': case_id,
        })
        .then (function (response) {
            self.setState({ spinner: false });
            console.log('response.data', response.data)
            console.log('response.status', response.status)
            if(response.status>= 200 && response.status<300){
                Alert.alert(`Código da sala: ${response.data.id}`, 'O código também pode ser encontrado na aba Sua sala')
                self.props.navigation.navigate('MainTabs')
            }
        })
        .catch(function (error) {
            self.setState({ spinner: false });
            console.log('error', error);
            if(error.response===undefined)
                Alert.alert('Erro', 'Erro na conexão com o servidor')
            else if(error.response.data.error!==undefined)
                Alert.alert('Erro', error.response.data.error)
        })
    }
    render() {
        return (
            <View style={[container.backgroud_2, { justifyContent:'flex-start', alignItems: 'center' }]}>
                <Spinner
                    color="#ECE5CE"
                    visible={this.state.spinner}
                    textContent={'Carregando...'}
                    textStyle={text.normal_1}
                />
                <NavigationEvents onDidFocus={ this.loadScreen } />
                <Input 
                    title= "Procurar caso"
                    placeholderColor="#774F38" 
                    onChangeText={(search_text) => { this.setState({search_text}); this.searchCases(); }}
                />
                <View style={container.line_2}/>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this.searchCases}
                        />
                      }
                >
                    <FlatList 
                        data={this.state.cases}
                        renderItem={({item}) => <TouchCard value={item.titulo} onPress={ () => { this.createRoom(item.id) }}/> }
                        keyExtractor={(item) => String(item.id)}
                    />
                </ScrollView>
            </View>
        )
    }
}