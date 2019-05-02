import { createBottomTabNavigator } from 'react-navigation'
import { Deleted } from 'dl/screens'
import MainStack from './main-stack'

export default createBottomTabNavigator(
  {
    Deleted,
    MainStack
  },
  {
    initialRouteName: 'MainStack'
  }
)
