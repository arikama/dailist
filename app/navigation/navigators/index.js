import React from 'react'
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator } from 'react-navigation'
import { colors, routes } from 'dl/constants'
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
    [routes.ARCHIVED]: {
      navigationOptions: {
        tabBarIcon: tabBarIcon('archive')
      },
      screen: Archived
    },
    [routes.DELETED]: {
      navigationOptions: {
        tabBarIcon: tabBarIcon('delete')
      },
      screen: Deleted
    },
    [routes.MAIN_STACK]: {
      navigationOptions: {
        tabBarIcon: tabBarIcon('spa')
      },
      screen: MainStack
    }
  },
  {
    initialRouteName: routes.MAIN_STACK,
    order: [routes.DELETED, routes.MAIN_STACK, routes.ARCHIVED],
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
