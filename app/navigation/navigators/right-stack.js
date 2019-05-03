import { createStackNavigator } from 'react-navigation'
import { colors, dimensions, routes } from 'dl/constants'
import { Archived } from 'dl/screens'

export default createStackNavigator(
  {
    Archived
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
      title: 'Archived'
    },
    initialRouteName: routes.ARCHIVED
  }
)
