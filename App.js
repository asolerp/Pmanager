import React, { useEffect } from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import Firebase, { FirebaseProvider, withFirebaseHOC } from './config/Firebase'
import { UserProvider } from './config/User/UserContextManagement'
import AppNavigator from './navigation/AppNavigator'

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
  useEffect(() => {
    async function checkStatusAuth() {
      try {
        // previously
        await props.firebase.checkUserAuth(async user => {
          if (user) {
            const userProfile = await props.firebase.getUserProfile(user.uid)
            if (userProfile.data().firstLogin) {
              // if first logged in
              props.navigation.navigate('Home')
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
