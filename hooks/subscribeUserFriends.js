import { useEffect, useState } from 'react'
import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const subscribeUserFriends = () => {
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState(null)

  useEffect(() => {
    const user = firebase.auth().currentUser
    const unsubscribe = firebase
      .firestore()
      .collection('friendship')
      .doc(user.uid)
      .onSnapshot(doc => {
        // Add users into an array
        const userData = doc.data()
        // Update state with the users array
        setResponse(userData)

        // As this can trigger multiple times, only update loading after the first update
        if (loading) {
          setLoading(false)
        }
      })
    return () => unsubscribe()
  }, [loading])

  return {
    loading,
    response,
  }
}

export default subscribeUserFriends
