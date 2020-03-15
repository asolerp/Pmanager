import { useEffect, useState } from 'react'
import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const subscribeUserData = ({ collection, document }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(collection)
      .doc(document)
      .onSnapshot(doc => {
        // Add users into an array
        const docData = doc.data()
        // Update state with the users array
        setData(docData)

        // As this can trigger multiple times, only update loading after the first update
        if (loading) {
          setLoading(false)
        }
      })
    return () => unsubscribe()
  }, [loading])

  return {
    loading,
    data,
  }
}

export default subscribeUserData
