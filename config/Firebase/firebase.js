import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
import generateKeywords from '../../utils/keyGenerator'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const Firebase = {
  // auth
  loginWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  signupWithEmail: (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  },
  signOut: () => {
    return firebase.auth().signOut()
  },
  checkUserAuth: user => {
    return firebase.auth().onAuthStateChanged(user)
  },
  currentUser: () => {
    return firebase.auth().currentUser
  },

  // firestore
  createNewUser: userData => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set({ email: userData.email, ...userData.metadata, profileFilled: false })
  },

  registreToken: (userUID, token) => {
    return firebase
      .firestore()
      .collection('users')
      .doc(userUID)
      .update(token)
  },

  insertDB: (model, collection) => {
    return firebase
      .firestore()
      .collection(collection)
      .add(model)
  },

  updateDB: (model, collection, doc) => {
    return firebase
      .firestore()
      .collection(collection)
      .doc(doc)
      .update(model)
  },

  updateLogin: async userData => {
    const user = await firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .get()
    const { email, metadata } = userData
    const { lastSignInTime, creationTime } = metadata
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .update({
        email,
        lastSignInTime,
        creationTime,
        keywords: generateKeywords(user.data().name),
      })
  },

  updateUserProfile: userData => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set({ ...userData, keywords: generateKeywords(userData.name) })
  },

  updatePlayerParticipation2: (match, user, assistance) => {
    const update = {}
    update[`participation.${user.uid}`] = assistance

    return firebase
      .firestore()
      .collection('matches')
      .doc(match.uid)
      .update(update)
  },

  updatePlayerParticipation: (match, user, assistance) => {
    console.log(user)
    return firebase
      .firestore()
      .collection('matches')
      .doc(match.uid)
      .update({
        players: [],
      })
      .then(() => {
        console.log('Removed old element from Host -> locations array successfully')
        firebase
          .firestore()
          .collection('matches')
          .doc(match.uid)
          .update({
            players: firebase.firestore.FieldValue.arrayUnion({
              assistance,
              imgProfile: user.imgProfile,
              name: user.name,
              stats: user.stats,
              principalPositon: user.principalPosition,
              uid: user.uid,
            }),
          })
          .then(() => {
            console.log('Added new element to the Host -> locations array successfully')
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  },

  getUserProfile: id => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${id}`)
      .get()
  },

  getUserFriends: () => {
    const user = firebase.auth().currentUser

    return firebase
      .firestore()
      .collection('friendship')
      .doc(user.uid)
      .collection('friends')
      .get()
  },

  getPlayerMatches: userUID => {
    console.log(userUID, 'UserUID')
    return firebase
      .firestore()
      .collection('users')
      .doc(userUID)
      .collection('matches')
      .get()
      .then(querySnapshot => {
        const promises = []
        querySnapshot.forEach(doc => {
          promises.push(
            firebase
              .firestore()
              .collection('matches')
              .doc(doc.id)
              .get()
          )
        })
        return Promise.all(promises)
      })
      .catch(error => {
        console.log('Error getting documents: ', error)
      })
  },

  searchByName: ({ search = '', limit = 50, lastNameOfLastPerson = '' } = {}) => {
    return firebase
      .firestore()
      .collection('users')
      .where('keywords', 'array-contains', search.toLowerCase())
      .orderBy('name')
      .startAfter(lastNameOfLastPerson)
      .limit(limit)
      .get()
  },

  // storage
  uriToBlob: uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function() {
        // return the blob
        resolve(xhr.response)
      }

      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'))
      }
      // this helps us get a blob
      xhr.responseType = 'blob'

      xhr.open('GET', uri, true)
      xhr.send(null)
    })
  },

  uploadToFirebase: (blob, path, name) => {
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref()
      storageRef
        .child(`${path}/${name}.jpg`)
        .put(blob, {
          contentType: 'image/jpeg',
        })
        .then(snapshot => {
          blob.close()
          resolve(snapshot)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
}

export default Firebase
