import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, FlatList, View, ActivityIndicator } from 'react-native'
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
    flex: 1,
    justifyContent: 'flex-start',
  },
  searchBarContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 40,
  },
  loadingContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  listContainer: {
    flex: 10,
    width: '100%',
    // paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
})

const FriendListScreen = props => {
  // const [friends, setFriends] = useState()
  const [sFriends, setSfriends] = useState()
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // const friends = []
    // const getFriends = async () => {
    //   await props.firebase.getUserFriends().then(querySnapshot => {
    //     querySnapshot.forEach(doc => friends.push(doc.data()))
    //   })
    //   setFriends(friends)
    // }
    // getFriends()
  }, [])

  const updateSearch = async s => {
    setLoading(true)
    setSearchText(s)
    const searchedUsers = []
    if (s.length > 0) {
      try {
        await props.firebase
          .searchByName({ search: s })
          .then(querySnapshot => querySnapshot.forEach(doc => searchedUsers.push(doc.data())))
        setSfriends(searchedUsers)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    } else {
      setSfriends(undefined)
    }
    setLoading(false)
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
            showLoading={loading}
          />
        </View>
        {sFriends && (
          <View style={styles.listContainer}>
            <FlatList
              data={sFriends}
              renderItem={({ item }) => <FriendItem user={item} />}
              keyExtractor={item => item.uid}
            />
          </View>
        )}
      </BlurBackground>
    </SafeAreaView>
  )
}

const FriendListScreenWithHOC = withFirebaseHOC(FriendListScreen)

FriendListScreenWithHOC.navigationOptions = {
  header: null,
}

export default FriendListScreenWithHOC
