import React, { Component } from "react";
import { 
    View, 
    Text,
    StyleSheet,
    StatusBar
} from "react-native";
import { Constants } from 'expo';
export default class Case extends Component {
    render() {
        return (
            <View>
              <StatusBar hidden={true} />
                <Text> Case </Text>
            </View>
        )
    }

}
const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#C2185B",
    height: Constants.statusBarHeight,
  },
});