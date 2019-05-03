import React from 'react'
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator } from 'react-navigation'
import { colors, routes } from 'dl/constants'
import { Archived, Deleted } from 'dl/screens'
import MainStack from './main-stack'

const tabBarIcon = (name, iconColor = '') => ({ focused, tintColor }) => {
  let finalTintColor = tintColor

  if (iconColor && focused) {
    finalTintColor = iconColor
  }

  return (
    <Icon
      color={finalTintColor}
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
        tabBarIcon: tabBarIcon('delete', colors.TOMATO)
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
