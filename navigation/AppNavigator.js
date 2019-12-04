import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthNavigatior from './AuthNavigator'
import MainTabNavigator from './MainTabNavigator'
import Initial from '../screens/InitialScreen'

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      Initial,
      Auth: AuthNavigatior,
      Main: MainTabNavigator,
    },
    {
      initialRouteName: 'Initial',
    }
  )
)
