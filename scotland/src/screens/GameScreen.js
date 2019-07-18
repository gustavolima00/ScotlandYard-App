import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Hints from "./game_menus/Hints";
import Map from "./game_menus/Map";
import Case from "./game_menus/Case";

import { YellowBox , Image, StyleSheet, View, Text } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
import { ScreenOrientation } from 'expo';

const MainScreen = createBottomTabNavigator({
    Map: {
        screen: Map,
        navigationOptions: {
            tabBarLabel: 'Mapa',
            tabBarIcon: ({ focused }) => (
                focused ? 
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/VKqgvdo.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Jogo </Text>
                </View>
                  :
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/bGiwXQH.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Jogo </Text>
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
                        source={{uri:'https://i.imgur.com/zGYisSu.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Dicas </Text>
                </View>
                  :
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/TB3JxT7.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Dicas </Text>
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
                        source={{uri:'https://i.imgur.com/zGYisSu.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Dicas </Text>
                </View>
                  :
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/TB3JxT7.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Dicas </Text>
                </View>
            )
        }
    }
},{
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        style: {
            //backgroundColor: '#49515f',
        },
        tabStyle: {
            height: 50,
        },
    },
    animationEnabled: true,
});
export default MainScreen;

const styles = StyleSheet.create({
    icon: {
        width: 20, 
        height: 20,  
    },
    icon_text: {
        textAlign: 'center',
        fontSize: 10,
    },
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'blue'
    }
})