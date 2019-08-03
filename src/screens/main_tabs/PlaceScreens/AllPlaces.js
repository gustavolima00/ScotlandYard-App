import React, { Component } from "react";
import { 
    View,
    Text,
    ScrollView,
    FlatList,
} from "react-native";
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
    render() {
        
        return (
        <View style={[ container.backgroud_2, { justifyContent:'space-between' }]}>
            <View style={{marginTop:20, marginLeft:20, marginRight:20}}>
                <Text style={text.case_title}> Locais </Text>
                <View style={container.line_2}/>
            </View>
            <ScrollView>
                <FlatList 
                    data={ places }
                    renderItem={({item}) => 
                        <Button2 
                            value={ item.title } 
                            onPress={() => this.props.navigation.navigate('PlaceDetails', { place_code:item.code })}
                            width={300}
                        /> }
                    keyExtractor={(item) => item.code}
                />
            </ScrollView>
        </View>
        )
    }
}