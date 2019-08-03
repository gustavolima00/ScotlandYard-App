import { createStackNavigator } from 'react-navigation';
import AllPlaces from './PlaceScreens/AllPlaces'
import PlaceDetails from './PlaceScreens/PlaceDetails'
import { Dimensions } from 'react-native'

const Places = createStackNavigator({ 
    AllPlaces: {
        screen: AllPlaces,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
    PlaceDetails: {
        screen: PlaceDetails,
        navigationOptions: ({ navigation }) => ({
            title:`Pista - ${navigation.getParam('place_name', '')}`,
            headerStyle: {
              backgroundColor:'#774F38',
            },
            headerTitleStyle: {
              color: '#ECE5CE',
              fontSize: 22,
              textAlign: 'center',
              width: Dimensions.get('window').width - 130
            },
            headerLayoutPreset: 'center',
            headerTintColor:'#ECE5CE',
        }),
    },
})
export default Places;