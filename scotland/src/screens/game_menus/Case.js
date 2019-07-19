import React, { Component } from "react";
import { 
    View, 
    Text,
    StyleSheet,
    StatusBar,
    ScrollView
} from "react-native";
import { getCode } from "../../helpers/AuthMethods";
import axios from 'axios';

const API_URL = 'http://5d30fff445e2b00014d93944.mockapi.io/api/v1'
export default class Case extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        title: '',
        text: '',
        questions:[],
        game_code:'',
    };
  }
  componentWillMount() {
      getCode()
        .then(res =>{ 
            this.setState({ game_code: res })
            this.get_case()
        })
        .catch(err => alert(err));
  }
  get_case = async () => {
    const get_case_path = `${API_URL}/get_case/`;
    var self = this;
    axios.post(get_case_path ,{
        'game_code': this.state.game_code,
    })
    .then (function (response) {
        console.log('response.data', response.data);
        console.log('response.status', response.status);
        if(response.status>= 200 && response.status<300){
          self.setState({ 
            title: response.data.title,
            text: response.data.text,
            questions: response.data.questions,
          })
        }
    })
    .catch(function (error) {
        console.log(error);
    })
  }
  render() {
      return (
          <ScrollView style={styles.container}>
            <StatusBar hidden={true} />
              <Text style={styles.title}> {this.state.title} </Text>
              <Text style={styles.body}> {this.state.text} </Text>
              <Text style={styles.title}> Holmes quer saber: </Text>
              {this.state.questions.map((prop, key) => {
                return (
                  <Text style={styles.body}  key={key}>{prop}</Text>
                );
              })}
          </ScrollView>
      )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECE5CE",
    flexDirection: 'column',
    padding: 20,
  },
  title:{
    textAlign:'center',
    fontSize: 24,
    padding:20,
    fontWeight: 'bold',
    color: '#774F38'
  },
  body:{
    textAlign:'justify',
    fontSize: 18,
    color: '#774F38',
  },
});
