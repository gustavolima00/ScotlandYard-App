
import React from 'react';
import Places from './main_tabs/Places'
import Case from './main_tabs/Case'
import Hints from './main_tabs/Hints'
import Room from './main_tabs/Room'
import { createBottomTabNavigator } from 'react-navigation';
import BottonIcon from '../components/BottonIcon'

const MainTabs = createBottomTabNavigator({
  Places: {
    screen: Places,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <BottonIcon focused={focused} label="Locais" imageName='places'/>
    }
  },
  Case: {
    screen: Case,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <BottonIcon focused={focused} label="Caso" imageName='case'/>
    }
  },
  Hints: {
    screen: Hints,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <BottonIcon focused={focused} label="Suas pistas" imageName="hint"/>
    }
  },
  Room: {
    screen: Room,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <BottonIcon focused={focused} label="Sua Sala" imageName="room"/>
    }
  },
},
{
  tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor:'#774F38',
        alignItems:'center',
        height: 80,  
      },
  },
  animationEnabled: true,
})
export default MainTabs;