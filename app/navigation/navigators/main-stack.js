import { createStackNavigator } from 'react-navigation'
import { colors, dimensions, routes } from 'dl/constants'
import { Add, Home } from 'dl/screens'

export default createStackNavigator(
  {
    Add,
    Home
  },
  {
    defaultNavigationOptions: {
      headerLeft: null,
      headerStyle: {
        elevation: 0
      },
      headerTitleStyle: {
        color: colors.GREY,
        marginHorizontal: dimensions.MARGIN
      },
      title: 'Dailist'
    },
    initialRouteName: routes.HOME
  }
)
