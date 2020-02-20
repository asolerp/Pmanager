import React, { useState, useEffect } from 'react'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import { useStateValue } from '../config/User/UserContextManagement'
import { withFirebaseHOC } from '../config/Firebase'

function Initial(props) {
  const [{ user }, dispatch] = useStateValue()

  const registerForPushNotificationsAsync = async currentUser => {
    const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = existingStatus

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return
    }

    // Get the token that uniquely identifies this device
    const token = await Notifications.getExpoPushTokenAsync()

    // POST the token to our backend so we can use it to send pushes from there
    const updates = {}
    updates.expoToken = token
    await props.firebase.registreToken(currentUser.uid, updates)
    // call the push notification
  }

  useEffect(() => {
    async function checkStatusAuth() {
      try {
        // previously
        await props.firebase.checkUserAuth(async user => {
          if (user) {
            const userProfile = await props.firebase.getUserProfile(user.uid)
            dispatch({
              type: 'updateProfile',
              userProfile: {
                uid: userProfile.data().uid,
              },
            })
            registerForPushNotificationsAsync(user)
            if (userProfile.data().firstLogin) {
              // if first logged in
              props.navigation.navigate('ProfileForm')
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
