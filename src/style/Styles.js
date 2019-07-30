import { StyleSheet } from "react-native";

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
});
export const text = StyleSheet.create({
    text_1_small:{
      fontSize: 12,
      color: '#ECE5CE'
    },
    text_1_normal:{
        fontSize: 18,
        color: '#ECE5CE'
    },
    text_1_big:{
        fontSize: 38,
        fontWeight: 'bold',
        color: '#ECE5CE'
    },

    text_2_small:{
        fontSize: 12,
        color: '#774F38'
    },
    text_2_normal:{
        fontSize: 18,
        color: '#774F38'
    },
    text_2_big:{
        fontSize: 38,
        fontWeight: 'bold',
        color: '#774F38'
    },
    text_button_1:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#774F38'
    }
    text_button_2:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#774F38'
    }
});