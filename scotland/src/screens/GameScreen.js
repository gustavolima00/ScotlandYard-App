import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Hints from "./game_menus/Hints";
import Map from "./game_menus/Map";
import Case from "./game_menus/Case";
import Options from "./game_menus/Options";

import { YellowBox , Image, StyleSheet, View, Text } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

const GameScreem = createBottomTabNavigator({
    Map: {
        screen: Map,
        navigationOptions: {
            tabBarLabel: 'Mapa',
            tabBarIcon: ({ focused }) => (
                focused ? 
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/VN7xFcZ.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Mapa </Text>
                </View>
                  :
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/Cdx8Oap.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Mapa </Text>
                </View>
            )
        }
    },
    Hints: {
        screen: Hints,
        navigationOptions: {
            tabBarLabel: 'Pistas',
            tabBarIcon: ({ focused }) => (
                focused ? 
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/IfYIvVn.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Pistas </Text>
                </View>
                  :
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/Xfsn9sg.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Pistas </Text>
                </View>
            )
        }
    },
    Case: {
        screen: Case,
        navigationOptions: {
            tabBarLabel: 'Caso',
            tabBarIcon: ({ focused }) => (
                focused ? 
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/WcmmhEa.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Caso </Text>
                </View>
                  :
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/etIoXJJ.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Caso </Text>
                </View>
            )
        }
    },
    Options: {
        screen: Options,
        navigationOptions: {
            tabBarLabel: 'Configurações',
            tabBarIcon: ({ focused }) => (
                focused ? 
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/cHkZe0E.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Configurações </Text>
                </View>
                  :
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/F8yvimH.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Configurações </Text>
                </View>
            )
        }
    }
},{
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        style: {
            backgroundColor: '#E08E79',
        },
        tabStyle: {
            height: 50,
        },
    },
    animationEnabled: true,
});
export default GameScreem;

const styles = StyleSheet.create({
    icon: {
        width: 20, 
        height: 20,  
    },
    icon_text: {
        textAlign: 'center',
        fontSize: 10,
        color:'#ECE5CE',
    },
    container:{
        width: 70, 
        height: 40,  
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#E5E5E5',
        borderRadius:5,
    }
})