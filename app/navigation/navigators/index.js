import React from 'react'
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator } from 'react-navigation'
import { colors } from 'dl/constants'
import { Deleted } from 'dl/screens'
import MainStack from './main-stack'

export default createBottomTabNavigator(
  {
    Deleted: {
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return (
            <Icon
              color={tintColor}
              name='delete'
              type='material'
            />
          )
        }
      },
      screen: Deleted
    },
    MainStack: {
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return (
            <Icon
              color={tintColor}
              name='spa'
              type='material'
            />
          )
        }
      },
      screen: MainStack
    }
  },
  {
    initialRouteName: 'MainStack',
    tabBarOptions: {
      activeTintColor: colors.MEDIUM_SEA_GREEN,
      inactiveTintColor: colors.GREY,
      showLabel: false,
      style: {
        borderTopWidth: 0
      }
    }
  }
)
