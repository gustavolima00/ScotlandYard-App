import React, { Component } from "react";
import { 
    View, 
    Text,
    StyleSheet,
    StatusBar
} from "react-native";
import { getCode } from "../../helpers/AuthMethods";
import axios from 'axios';

const API_URL = 'http://5d30fff445e2b00014d93944.mockapi.io/api/v1'

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      map:[[1, 2, 3], [1, 2, 3]],
      game_code:'',
    };
  }
  componentWillMount() {
      getCode()
        .then(res =>{ 
            this.setState({ game_code: res })
            this.get_map()
        })
        .catch(err => alert(err));
  }
  get_map = async () => {
    const get_get_map = `${API_URL}/token-obtain/`;
    var self = this;
    axios.post(get_get_map ,{
        'game_code': this.state.game_code,
    })
    .then (function (response) {
        console.log('response.data', response.data);
        console.log('response.status', response.status);
        if(response.status>= 200 && response.status<300){
          self.setState({ 
            map: response.data.map,
          })
        }
    })
    .catch(function (error) {
        console.log(error);
    })
  }
    render() {
        return (
            <View style={styles.container}>
              <StatusBar hidden={true} />
              {this.state.map.map((line, key) => {
                return (
                  <View style={styles.line}  key={key}>
                    {line.map((content, key) => {
                      if(content=="x")
                        return <View style={styles.place}  key={key}/>
                      else
                        return <View style={styles.road}  key={key}/>
                    })}
                  </View>
                );
              })}
            </View>
        )
    }

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECE5CE",
    flex: 1, 
    flexDirection: 'column',
  },
  place:{
    flex: 1, 
    backgroundColor: '#ECE5CE',
  },
  road:{
    flex: 1, 
    backgroundColor: '#774F38',
  },
  line:{
    flex: 1, 
    flexDirection: 'row',
  },
  text_out:{
    fontSize: 18,
    color: '#774F38'
  },
});
