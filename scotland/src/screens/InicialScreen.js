import React, { Component } from "react";
import { 
    View, 
    Text,
    StyleSheet,
    StatusBar,
    Image,
    TextInput,
    TouchableHighlight,
} from "react-native";
import axios from 'axios';
import { storeCode, getCode } from "../helpers/AuthMethods";

const API_URL = 'http://5d30fff445e2b00014d93944.mockapi.io/api/v1'
export default class InicialScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            game_code: '',
        };
      }
    componentWillMount() {
        getCode()
            .then(res =>{ 
                this.setState({ game_code: res })
            })
            .catch(err => alert(err));
    }
    create_game = async () => {
        const create_game_path = `${API_URL}/create_game/`;
        var self = this;
        axios.post(create_game_path ,{
            'username': this.state.name,
        })
        .then (function (response) {
            console.log('response.data', response.data);
            console.log('response.status', response.status);
            if(response.status>= 200 && response.status<300){
                storeCode(response.data.game_code);
                console.log(response.data.game_code)
                self.props.navigation.navigate('GameScreen');
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    join_game = async () => {
        const join_game_path = `${API_URL}/join_game/`;
        var self = this;
        axios.post(join_game_path ,{
            'username': this.state.name,
            'game_code': this.state.game_code,
        })
        .then (function (response) {
            console.log('response.data', response.data);
            console.log('response.status', response.status);
            if(response.status>= 200 && response.status<300){
                storeCode(response.data.game_code);
                console.log(response.data.game_code)
                self.props.navigation.navigate('GameScreen');
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    render() {
        return (
            <View style={styles.container}>
              <StatusBar hidden={true}/>
                <View style={styles.image_container}>
                    <Image
                        style={styles.image}
                        source={{uri: 'https://i.imgur.com/VK9t6re.png'}}
                    />
                <Text style={styles.title }> Scotland Yard </Text>
                </View>
                    <View style={styles.input_container}>
                        <Text style={styles.text_out}> Nome: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(name) => this.setState({name})}
                            value={this.state.name}
                        />
                        <Text style={styles.text_out}> Código do jogo: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(name) => this.setState({name})}
                            value={this.state.game_code}
                        />

                    </View>
                    <View style={styles.buttons_container}>
                        <TouchableHighlight 
                            onPress={this.create_game} 
                            underlayColor="#E5E5E5"
                            style={styles.button}
                        >
                            <View style={styles.button}>
                                <Text style={styles.text_button}> Criar um jogo </Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight 
                            onPress={this.join_game} 
                            underlayColor="#E5E5E5"
                            style={styles.button}
                        >
                            <View style={styles.button} >
                                <Text style={styles.text_button}> Entrar em um jogo  </Text>
                            </View>
                        </TouchableHighlight>
                    </View>  
            </View>
        )
    }

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E08E79",
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  image_container: {
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
  },
  form_container: {
    justifyContent: 'space-around',
    width: '90%',
    alignItems: 'center',
  },
  input_container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  buttons_container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input : {
    padding:10,
    width: 450, 
    height: 40,
    backgroundColor: "#E5E5E5",
    borderRadius:15,
  },
  button : {
    width: 180, 
    height: 50,
    backgroundColor: "#774F38",
    borderRadius:18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 70, 
    height: 80,
  },
  title:{
    fontWeight: 'bold',
    fontSize: 24,
    color: '#ECE5CE'
  },
  text_out:{
    fontWeight: 'bold',
    fontSize: 18,
    color: '#774F38'
  },
  text_button:{
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ECE5CE',
    textAlign: 'center'
  }
});



