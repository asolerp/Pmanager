import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, FlatList, View, Text } from 'react-native'
import { SearchBar } from 'react-native-elements'
import * as firebase from 'firebase'
import BlurBackground from '../components/BlurBackground'
import { withFirebaseHOC } from '../config/Firebase'
import FriendItem from '../components/FriendItem'
import 'firebase/auth'
import 'firebase/firestore'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  searchBarContainer: {
    width: '100%',
    paddingTop: 40,
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
})

const FriendListScreen = props => {
  const [friends, setFriends] = useState()
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const friends = []
    const getFriends = async () => {
      await props.firebase.getUserFriends().then(querySnapshot => {
        querySnapshot.forEach(doc => friends.push(doc.data()))
      })
      setFriends(friends)
    }
    getFriends()
  }, [])

  const searchByName = async ({ search = '', limit = 50, lastNameOfLastPerson = '' } = {}) => {
    console.log('Search', search)
    const snapshot = await firebase
      .firestore()
      .collection('users')
      .where('keywords', 'array-contains', search.toLowerCase())
      .orderBy('name')
      .startAfter(lastNameOfLastPerson)
      .limit(limit)
      .get()

    snapshot.docs.map(doc => console.log(doc.data()))
  }

  const updateSearch = s => {
    searchByName({ search: s })
    setSearchText(s)
  }

  return (
    <SafeAreaView style={styles.container}>
      <BlurBackground
        blur={2}
        center
        backgroundUrl="https://i.pinimg.com/originals/35/5e/06/355e06c94e6bf92cbaf0c015edf7eea3.jpg"
      >
        {/* <FriendItem /> */}
        <View style={styles.searchBarContainer}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={updateSearch}
            value={searchText}
            lightTheme
          />
        </View>
        <View style={styles.listContainer}>
          {friends && (
            <FlatList
              data={friends}
              renderItem={({ item }) => <FriendItem user={item} />}
              keyExtractor={item => item.uid}
            />
          )}
        </View>
      </BlurBackground>
    </SafeAreaView>
  )
}

const FriendListScreenWithHOC = withFirebaseHOC(FriendListScreen)

FriendListScreenWithHOC.navigationOptions = {
  header: null,
}

export default FriendListScreenWithHOC
