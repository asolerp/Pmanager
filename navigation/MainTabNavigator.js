import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import Home from '../screens/HomeScreen'
import Profile from '../screens/ProfileScreen'
import ProfileForm from '../screens/ProfileFormScreen'
import FriendScreen from '../screens/FriendScreen'
import NewMatchScreen from '../screens/NewMatchScreen'
// import FriendListScreen from '../screens/FriendListScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

const HomeStack = createStackNavigator(
  {
    Home,
    NewMatch: NewMatchScreen,
    FriendProfile: FriendScreen,
  },
  config
)

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }
  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-football' : 'md-football'} />
    ),
  }
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

// const FriendListStack = createStackNavigator({
//   FriendList: FriendListScreen,
//   FriendProfile: FriendScreen,
// })

// FriendListStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true
//   if (navigation.state.index > 0) {
//     tabBarVisible = false
//   }

//   return {
//     tabBarVisible,
//     tabBarLabel: 'Friends',
//     tabBarIcon: ({ focused }) => (
//       <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'} />
//     ),
//   }
// }

// FriendListStack.path = ''

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    // FriendListStack,
    ProfileStack,
  },
  {
    tabBarOptions: {
      showLabel: true,
      labelStyle: {
        color: 'black',
      },
      style: {
        color: 'black',
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
