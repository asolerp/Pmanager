// import React from 'react';

// createNewUser: userData => {
//   return firebase
//     .firestore()
//     .collection('users')
//     .doc(`${userData.uid}`)
//     .set({ email: userData.email, ...userData.metadata, profileFilled: false })
// },

import { useEffect, useState } from 'react'
import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const subscribeUserData = (model, collection) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [data, setData] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(collection)
      .add(model)
      .then(docRef => {
        setData(docRef)
      })
      .catch(error => {
        setError(error)
        console.error('Error adding document: ', error)
      })
    setLoading(false)
    return () => unsubscribe()
  }, [loading])

  return {
    loading,
    data,
    error,
  }
}

export default subscribeUserData
