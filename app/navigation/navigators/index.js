import React from 'react'
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator } from 'react-navigation'
import { colors, routes } from 'dl/constants'
import LeftStack from './left-stack'
import MainStack from './main-stack'
import RightStack from './right-stack'

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
    [routes.LEFT_STACK]: {
      navigationOptions: {
        tabBarIcon: tabBarIcon('delete', colors.TOMATO)
      },
      screen: LeftStack
    },
    [routes.MAIN_STACK]: {
      navigationOptions: {
        tabBarIcon: tabBarIcon('spa')
      },
      screen: MainStack
    },
    [routes.RIGHT_STACK]: {
      navigationOptions: {
        tabBarIcon: tabBarIcon('archive')
      },
      screen: RightStack
    }
  },
  {
    initialRouteName: routes.MAIN_STACK,
    order: [routes.LEFT_STACK, routes.MAIN_STACK, routes.RIGHT_STACK],
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
