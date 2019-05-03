import { createStackNavigator } from 'react-navigation'
import { colors, dimensions, routes } from 'dl/constants'
import { Deleted } from 'dl/screens'

export default createStackNavigator(
  {
    Deleted
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
      title: 'Removed'
    },
    initialRouteName: routes.DELETED
  }
)
