import { useEffect, useState } from 'react'
import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const subscribePlayerMatches = collection => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    const user = firebase.auth().currentUser
    const unsubscribe = firebase
      .firestore()
      .collection(collection)
      .where('playersUID', 'array-contains', user.uid)
      .onSnapshot(querySnapshot => {
        const m = []
        querySnapshot.forEach(doc => {
          m.push(doc.data())
        })
        setData(m)
      })
    if (loading) {
      setLoading(false)
    }
    return () => unsubscribe()
  }, [loading])

  return {
    loading,
    data,
  }
}

export default subscribePlayerMatches
