import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import Home from '../screens/HomeScreen'
import Profile from '../screens/ProfileScreen'
import ProfileForm from '../screens/ProfileFormScreen'
import FriendListScreen from '../screens/FriendListScreen'

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
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-football' : 'md-football'} />
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

const FriendListStack = createStackNavigator({
  FriendList: FriendListScreen,
})

FriendListStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Friends',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'} />
    ),
  }
}

FriendListStack.path = ''

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    FriendListStack,
    ProfileStack,
  },
  {
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'rgba(0,0,0,0.6)',
      showLabel: false,
      style: {
        backgroundColor: 'rgba(20,20,20,0.7)',
      },
      activeTabStyle: {
        backgroundColor: 'yellow',
      },
    },
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
