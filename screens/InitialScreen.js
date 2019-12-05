import React, { useState, useEffect } from 'react'
import { useStateValue } from '../config/User/UserContextManagement'
import { withFirebaseHOC } from '../config/Firebase'

function Initial(props) {
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    async function checkStatusAuth() {
      console.log(props)
      try {
        // previously
        await props.firebase.checkUserAuth(async user => {
          console.log(user)
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
