import React from 'react'
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator } from 'react-navigation'
import { colors } from 'dl/constants'
import { Archived, Deleted } from 'dl/screens'
import MainStack from './main-stack'

const tabBarIcon = (name) => ({ tintColor }) => {
  return (
    <Icon
      color={tintColor}
      name={name}
      type='material'
    />
  )
}

export default createBottomTabNavigator(
  {
    Archived: {
      navigationOptions: {
        tabBarIcon: tabBarIcon('archive')
      },
      screen: Archived
    },
    Deleted: {
      navigationOptions: {
        tabBarIcon: tabBarIcon('delete')
      },
      screen: Deleted
    },
    MainStack: {
      navigationOptions: {
        tabBarIcon: tabBarIcon('spa')
      },
      screen: MainStack
    }
  },
  {
    initialRouteName: 'MainStack',
    order: ['Deleted', 'MainStack', 'Archived'],
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
