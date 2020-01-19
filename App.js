import React, { useState, useEffect } from 'react'
import { YellowBox, Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import AppNavigator from './navigation/AppNavigator'
import { UserProvider } from './config/User/UserContextManagement'
import Firebase, { FirebaseProvider, withFirebaseHOC } from './config/Firebase'

const initialUserState = {
  user: {
    name: 'alberto :)',
  },
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'updateProfile':
      return {
        ...state,
        user: action.userProfile,
      }
    default:
      return state
  }
}

function App(props) {
  const [isAssetsLoadingComplete, setLoadingComplete] = useState(false)

  const loadResourcesAsync = async () => {
    await Promise.all([
      YellowBox.ignoreWarnings(['Setting a timer']),
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free to
        // remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'montserrat-light': require('./assets/fonts/Montserrat-ExtraLight.ttf'),
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

  useEffect(() => {
    loadResourcesAsync()
  }, [])

  if (!isAssetsLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    )
  }

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <UserProvider initialState={initialUserState} reducer={userReducer}>
        <FirebaseProvider value={Firebase}>
          <AppNavigator />
        </FirebaseProvider>
      </UserProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default withFirebaseHOC(App)
