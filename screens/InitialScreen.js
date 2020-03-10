import React, { useEffect, useContext } from 'react'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

import { withFirebaseHOC } from '../config/Firebase'

// Global Store
import { store } from '../store/store'

function Initial(props) {
  const globalState = useContext(store)
  const { dispatch } = globalState

  const registerForPushNotificationsAsync = async userUID => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)

    if (status !== 'granted') {
      console.log('No notification permissions!')
      return
    }
    // Get the token that identifies this device
    const token = await Notifications.getExpoPushTokenAsync()

    const update = {}
    update.expoToken = token

    props.firebase.updatePushToken(userUID, update)
  }

  useEffect(() => {
    async function checkStatusAuth() {
      try {
        // previously
        await props.firebase.checkUserAuth(async user => {
          if (user) {
            const userProfile = await props.firebase.getUserProfile(user.uid)
            dispatch({
              type: 'set_user',
              value: userProfile.data(),
            })
            registerForPushNotificationsAsync(user.uid)
            if (userProfile.data().profileFilled === false) {
              // if first logged in
              props.navigation.navigate('ProfileForm', { user: userProfile.data() })
            } else {
              // if the user has previously logged in
              props.navigation.navigate('Home')
            }
          } else {
            // if the user has previously signed out from the app
            props.navigation.navigate('Auth')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    checkStatusAuth()
  }, [])

  return <></>
}

export default withFirebaseHOC(Initial)
