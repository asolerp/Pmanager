import { createStackNavigator } from 'react-navigation'
import Login from '../screens/LoginScreen'
import Signup from '../screens/SignupScreen'

const AuthNavigatior = createStackNavigator(
  {
    Login,
    Signup,
  },
  {
    initialRouteName: 'Login',
  }
)

export default AuthNavigatior
