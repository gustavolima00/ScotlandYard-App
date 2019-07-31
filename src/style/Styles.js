import { StyleSheet } from "react-native";
import Constants from 'expo-constants'

export const IMAGE_HEIGHT = 250
export const IMAGE_HEIGHT_SMALL = 100

export const container = StyleSheet.create({
    backgroud_1:{
      backgroundColor: "#774F38",
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    backgroud_2:{
        backgroundColor: "#ECE5CE",
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    status_bar:{
        backgroundColor: "#774F38",
        height: Constants.statusBarHeight,
    },
    input_1: {
        backgroundColor: "#FFFFFF",
        height: 50,
        width: 300,
        borderRadius: 10,
        padding: 5,
        justifyContent: 'center',
    },
    button_1:{
        backgroundColor: "#ECE5CE",
        height: 50,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 5,
    },
    button_2:{
        backgroundColor: "#774F38",
        height: 50,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 5,
    },
    touch_card:{
        backgroundColor: "#E08E79",
        height: 60,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 5,
    },
    big_icon_1:{
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    big_icon_circle:{
        backgroundColor: "#ECE5CE",
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 150,
        height: 150,
        borderRadius: 150/2.0,
    },
    line_1:{
        marginBottom:15, 
        borderBottomColor: '#ECE5CE', 
        borderBottomWidth: 1,
        width:'90%',
        alignSelf:'center',
        height:15,
    },
    line_2:{
        marginBottom:15, 
        borderBottomColor: '#774F38', 
        borderBottomWidth: 1,
        width:'90%',
        alignSelf:'center',
        height:15,
    }
});
export const text = StyleSheet.create({
    small_1:{
      fontSize: 12,
      color: '#ECE5CE'
    },
    normal_1:{
        fontSize: 18,
        color: '#ECE5CE'
    },
    big_1:{
        fontSize: 38,
        fontWeight: 'bold',
        color: '#ECE5CE'
    },

    small_2:{
        fontSize: 12,
        color: '#774F38'
    },
    normal_2:{
        fontSize: 18,
        color: '#774F38'
    },
    big_2:{
        fontSize: 38,
        fontWeight: 'bold',
        color: '#774F38'
    },
    button_1:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center',
        color: '#774F38'
    },
    button_2:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center',
        color: '#ECE5CE'
    },
    touch_card:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center',
        color: '#ECE5CE'
    },
    input_1:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ECE5CE'
    }
});