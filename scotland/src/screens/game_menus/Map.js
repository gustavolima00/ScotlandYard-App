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
                      if(content.length>3)
                        return <View style={styles.door}  key={key}/>
                      else if(content=="#01")
                        return <View style={styles.color_1}  key={key}/>
                      else if(content=="#02")
                        return <View style={styles.color_2}  key={key}/>
                      else if(content=="#03")
                        return <View style={styles.color_3}  key={key}/>
                      else if(content=="#04")
                        return <View style={styles.color_4}  key={key}/>
                      else if(content=="#05")
                        return <View style={styles.color_5}  key={key}/>
                      else if(content=="#06")
                        return <View style={styles.color_6}  key={key}/>
                      else if(content=="#07")
                        return <View style={styles.color_7}  key={key}/>
                      else if(content=="#08")
                        return <View style={styles.color_8}  key={key}/>
                      else if(content=="#09")
                        return <View style={styles.color_9}  key={key}/>
                      else if(content=="#10")
                        return <View style={styles.color_10}  key={key}/>
                      else if(content=="#11")
                        return <View style={styles.color_11}  key={key}/>
                      else if(content=="#12")
                        return <View style={styles.color_12}  key={key}/>                       
                      else if(content=="#13")
                        return <View style={styles.color_13}  key={key}/>
                      else if(content=="#14")
                        return <View style={styles.color_14}  key={key}/>
                      else if(content=="#15")
                        return <View style={styles.color_15}  key={key}/>
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
  door:{
    flex: 1, 
    backgroundColor: '#ECE5CE',
  },
  color_1:{
    flex: 1, 
    backgroundColor: '#1E8CA8',
  },
  color_2:{
    flex: 1, 
    backgroundColor: '#CC1C85',
  },
  color_3:{
    flex: 1, 
    backgroundColor: '#8EBA30',
  },
  color_4:{
    flex: 1, 
    backgroundColor: '#7F41E2',
  },
  color_5:{
    flex: 1, 
    backgroundColor: '#A8FFC0',
  },
  color_6:{
    flex: 1, 
    backgroundColor: '#D32CC2',
  },
  color_7:{
    flex: 1, 
    backgroundColor: '#41EA6B',
  },
  color_8:{
    flex: 1, 
    backgroundColor: '#2CB733',
  },
  color_9:{
    flex: 1, 
    backgroundColor: '#65F2AE',
  },
  color_10:{
    flex: 1, 
    backgroundColor: '#7FF20C',
  },
  color_11:{
    flex: 1, 
    backgroundColor: '#B72D1B',
  },
  color_12:{
    flex: 1, 
    backgroundColor: '#FFFC77',
  },
  color_13:{
    flex: 1, 
    backgroundColor: '#D36543',
  },
  color_14:{
    flex: 1, 
    backgroundColor: '#E5F98B',
  },
  color_15:{
    flex: 1, 
    backgroundColor: '#29639E',
  },
  road:{
    flex: 1, 
    backgroundColor: '#C5E0DC',
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
