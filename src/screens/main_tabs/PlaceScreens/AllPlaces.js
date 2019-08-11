import React, { Component } from "react";
import { 
    View,
    Text,
    ScrollView,
    FlatList,
} from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationEvents } from 'react-navigation';
import { API_URL } from '../../../helpers/Requests'
import axios from 'axios'
import { getUserToken } from "../../../helpers/AuthMethods";
import {container, text} from '../../../style/Styles'
import Button2 from '../../../components/Button2'

const places = [ 
    {title:'Banco', code:'banco'}, 
    {title:'Bar', code:'bar'}, 
    {title:'Casa de penhores', code:'penhores'}, 
    {title:'Charutaria', code:'charutaria'},
    {title:'Chaveiro', code:'chaveiro'},
    {title:'Docas', code:'docas'},
    {title:'Estação de carruagens', code:'carruagens'},

    {title:'Farmácia', code:'farmacia'},
    {title:'Hotel', code:'hotel'},
    {title:'Livraria', code:'livraria'},
    {title:'Museu', code:'museu'},
    {title:'Parque', code:'parque'},
    {title:'Scotland Yard', code:'syard'},
    {title:'Teatro', code:'teatro'},
    
];
export default class AllPlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
          token: undefined,
          player: undefined,
          spinner: true,
        }
    }
    loadScreen = async () => {
        this.setState({ spinner: true });
        await getUserToken()
        .then(res => {
            this.setState({ token: res });
            this.update_profile();
            this.setState({ spinner: false });
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
            self.setState({ player: response.data });
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
    render_button(item){
        let hint = this.state.player!==undefined?this.state.player[`pista_${item.code}`]:false;
        console.log(`hint_${item.code}`, hint);
        return <Button2 
                value={ item.title } 
                onPress={() => this.props.navigation.navigate('PlaceDetails', { place_code:item.code, place_name:item.title })}
                backgroudColor={hint?'#F7D06E':'#774F38'}
                textColor={hint?'#774F38':'#ECE5CE'}
                width={150}
                height={40}
                fontSize={15}
        />
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
            <View style={{marginTop:20, marginLeft:20, marginRight:20}}>
                <Text style={text.case_title}> Locais </Text>
                <View style={container.line_2}/>
            </View>
            <View style={{ flexDirection:'row', justifyContent:'center', marginLeft:20, marginRight:20}}>
                <FlatList 
                    data={ places.slice(0, 7) }
                    renderItem={({item}) => this.render_button(item)}
                    keyExtractor={(item) => item.code}
                />
                <FlatList 
                    data={ places.slice(7, 14) }
                    renderItem={({item}) => this.render_button(item)}
                    keyExtractor={(item) => item.code}
                />
            </View>
            <View>
                <View style={container.line_2}/>
                <Button2 
                        value="Entregar Solução"
                        width={300}
                        onPress={ () => this.props.navigation.navigate('SendSolution')}
                    />
            </View>
        </View>
        )
    }
}