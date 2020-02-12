import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import _ from 'lodash'
import { withFirebaseHOC } from '../config/Firebase'
import FriendItem from '../components/FriendItem'
import Section from '../components/form/SectionTitle'
import AvatarWithPicker from '../components/Avatar'
import PageBlank from '../components/PageBlank'
import BlurBackground from '../components/BlurBackground'

// Utils
import 'firebase/auth'
import 'firebase/firestore'

const screenWidth = Math.round(Dimensions.get('window').width)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  searchBarContainer: {
    width: '100%',
    paddingTop: 40,
  },
  listContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    // paddingTop: 15,
  },
  floatingButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    bottom: 20,
    left: screenWidth / 2 - 50,
  },
  noUsersText: {
    color: 'black',
    fontFamily: 'montserrat-regular',
    fontSize: 20,
    textAlign: 'center',
  },
})

const FriendListScreen = props => {
  // const [friends, setFriends] = useState()
  const [sFriends, setSfriends] = useState()
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)

  const [list, updateList] = useState(props.listSelectedPlayers || [])
  const [selectedFriend, setSelectedFrind] = useState(null)

  const handlePress = item => {
    setSelectedFrind(item)
  }

  useEffect(() => {
    if (selectedFriend) {
      const index = list.findIndex(a => a.uid === selectedFriend.uid)
      if (index !== -1) {
        updateList(list.filter(e => e.uid !== selectedFriend.uid))
        const friends = [...sFriends]
        const i = friends.findIndex(f => f.uid === selectedFriend.uid)
        friends[i].active = false
        setSfriends(friends)
        setSelectedFrind(null)
      } else {
        updateList([...list, selectedFriend])
        const friends = [...sFriends]
        const i = friends.findIndex(f => f.uid === selectedFriend.uid)
        friends[i].active = true
        setSfriends(friends)
        setSelectedFrind(null)
      }
    }
  }, [selectedFriend])

  const updateSearch = async s => {
    setLoading(true)
    setSearchText(s)
    const searchedUsers = []
    if (s.length > 0) {
      try {
        await props.firebase
          .searchByName({ search: s })
          .then(querySnapshot => {
            querySnapshot.forEach(doc => searchedUsers.push(doc.data()))
          })
          .then(() => {
            console.log('SearchList', searchedUsers)
            console.log('List', list)
            const merged = searchedUsers.map(deflt => ({
              ...deflt,
              ...list.find(l => l.uid === deflt.uid),
            }))
            console.log('Merged', merged)
            setSfriends(merged)
          })
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
    <View style={styles.container}>
      <PageBlank
        title="Seleccionar jugadores"
        titleColor="black"
        iconColor="black"
        leftSide={() => <></>}
        rightSide={() => <></>}
        topMargin={0}
      >
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={searchText}
          lightTheme
          showLoading={loading}
        />
        {list.length > 0 && (
          <View>
            <Section title="Jugadores seleccionados" />
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingVertical: 5,
                flexWrap: 'wrap',
                backgroundColor: 'white',
              }}
            >
              {list.map(friend => (
                <AvatarWithPicker
                  key={friend.uid}
                  rounded
                  containerStyle={styles.avatar}
                  imageUrl={friend.imgProfile}
                  size="medium"
                  source={{
                    uri: friend.imgProfile,
                  }}
                />
              ))}
            </View>
          </View>
        )}
        <Section title="Listado" customStyle={{ marginBottom: 5 }} />
        {sFriends ? (
          <View style={styles.listContainer}>
            <SafeAreaView style={{ marginBottom: 10 }}>
              <FlatList
                data={sFriends}
                renderItem={({ item }) => (
                  <FriendItem
                    user={item}
                    addFriend={friend => handlePress(friend)}
                    active={item.active}
                  />
                )}
                keyExtractor={item => item.uid}
              />
            </SafeAreaView>
          </View>
        ) : (
          <View style={[styles.listContainer, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={styles.noUsersText}>Busca jugadores</Text>
          </View>
        )}
        <View style={styles.floatingButton}>
          <TouchableOpacity onPress={() => props.handlePlayerSelection(list)}>
            <Text style={{ width: '100%' }}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </PageBlank>
    </View>
  )
}

const FriendListScreenWithHOC = withFirebaseHOC(FriendListScreen)

FriendListScreenWithHOC.navigationOptions = {
  header: null,
}

export default FriendListScreenWithHOC
