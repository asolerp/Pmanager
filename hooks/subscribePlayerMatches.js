import { useEffect, useState } from 'react'
import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const subscribePlayerMatches = () => {
  const [loading, setLoading] = useState(true)
  const [matches, setMathces] = useState(null)

  useEffect(() => {
    const user = firebase.auth().currentUser
    const unsubscribe = firebase
      .firestore()
      .collection('matches')
      .where('playersUID', 'array-contains', user.uid)
      .onSnapshot(querySnapshot => {
        const m = []
        querySnapshot.forEach(doc => {
          m.push(doc.data())
        })
        setMathces(m)
      })
    if (loading) {
      setLoading(false)
    }
    return () => unsubscribe()
  }, [loading])

  return {
    loading,
    matches,
  }
}

export default subscribePlayerMatches
