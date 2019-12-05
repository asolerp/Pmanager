import { useState, useEffect } from 'react'
import firebase from 'firebase'

function useUser(id) {
  // initialize our default state
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  // when the id attribute changes (including mount)
  // subscribe to the recipe document and update
  // our state when it changes.
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(id)
      .onSnapshot(
        doc => {
          setLoading(false)
          setUser(doc)
        },
        err => {
          setError(err)
        }
      )
    // returning the unsubscribe function will ensure that
    // we unsubscribe from document changes when our id
    // changes to a different value.
    return () => unsubscribe()
  }, [id])

  return {
    error,
    loading,
    user,
  }
}

export default useUser
