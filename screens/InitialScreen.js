/* eslint react/prop-types: 0 */

import React, { useState, useEffect } from 'react'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { withFirebaseHOC } from '../config/Firebase'
import { useStateValue } from '../config/User/UserContextManagement'

function Initial(props) {
  const [isAssetsLoadingComplete, setLoadingComplete] = useState(false)
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    async function checkStatusAuth() {
      try {
        // previously
        loadLocalAsync()

        await props.firebase.checkUserAuth(async user => {
          if (user) {
            const userProfile = await props.firebase.getUserProfile(user.uid)
            dispatch({
              type: 'updateProfile',
              userProfile: userProfile.data(),
            })
            if (userProfile.data().firstLogin) {
              // if first logged in
              props.navigation.navigate('ProfileForm')
            } else {
              // if the user has previously logged in
              props.navigation.navigate('App')
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

  const loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        require('../assets/images/robot-dev.png'),
        require('../assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free to
        // remove this if you are not using it in your app
        'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        'montserrat-regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      }),
    ])
  }

  const handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  const handleFinishLoading = () => {
    setLoadingComplete(true)
  }

  if (!isAssetsLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    )
  }
}

export default withFirebaseHOC(Initial)
