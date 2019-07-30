import React, { Component } from "react";
import { 
    View, 
    Text,
    StyleSheet,
} from "react-native";

export default class Register extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text_out}> Register </Text>
            </View>
        )
    }

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECE5CE",
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text_out:{
    fontSize: 18,
    color: '#774F38'
  },
});
