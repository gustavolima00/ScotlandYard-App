import { AsyncStorage } from 'react-native';

export const GAME_CODE = "@tokenKey:key";

export const storeCode = async (code) => {
    try{
        await AsyncStorage.setItem(GAME_CODE, code);
        console.log('Saved on Storage.')
    }
        catch(exception) {
        console.log('Fail to Save on Storage.')
    }
}

export const discarteCode = async () => {
    try {
        await AsyncStorage.removeItem(GAME_CODE);
        console.log('Storage Removed.')
        return true;
    }
    catch(exception) {
        console.log('Fail to Remove Storage.')
        return false;
    }
}

export const getCode = async () => {
    try{
        const code = await AsyncStorage.getItem(GAME_CODE);
        console.log('GAME_CODE', code)
        return (code !== null) ? code : null;
    }
    catch(exception){
        console.log('Fail to get code.')
        return null;
    }
};