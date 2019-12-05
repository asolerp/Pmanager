import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import Home from '../screens/HomeScreen'
import Profile from '../screens/ProfileScreen'
import ProfileForm from '../screens/ProfileFormScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

const HomeStack = createStackNavigator(
  {
    Home,
  },
  config
)

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
}

HomeStack.path = ''

const ProfileStack = createStackNavigator(
  {
    Profile,
    ProfileForm,
  },
  config
)

ProfileStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Profile',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
    ),
  }
}

ProfileStack.path = ''

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    ProfileStack,
  }
  // {
  //   defaultNavigationOptions: ({ navigation }) => {
  //     return {
  //       tabBarVisible: false,
  //     }
  //   },
  // }
)

tabNavigator.path = ''

export default tabNavigator
