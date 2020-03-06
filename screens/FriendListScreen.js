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
import { SearchBar, CheckBox, ListItem } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'
import Section from '../components/form/SectionTitle'
import AvatarWithPicker from '../components/Avatar'
import PageBlank from '../components/PageBlank'
import PositionLabel from '../components/PositionLabel'
import StatsDetail from '../components/StatsDetail'
// Utils
import 'firebase/auth'
import 'firebase/firestore'
import { getLabelPostionByValue } from '../constants/Player'

const screenWidth = Math.round(Dimensions.get('window').width)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    marginRight: 10,
    marginVertical: 10,
    backgroundColor: 'white',
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
  positionLabelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
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
            const merged = searchedUsers.map(deflt => ({
              ...deflt,
              ...list.find(l => l.uid === deflt.uid),
            }))
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

  const updateStateListPlayer = (playerList, updatePlayerList, index) => {
    playerList[index].active = false
    updatePlayerList(playerList)
  }

  const findIndexByKey = (array, key, value) => {
    return array.findIndex(f => f[key] === value)
  }

  const removePlayerFromSelection = player => {
    const friends = sFriends ? [...sFriends] : undefined
    const friendsList = [...list]

    if (!friends) {
      updateStateListPlayer(friendsList, updateList, findIndexByKey(friendsList, 'uid', player.uid))
    } else {
      const i = findIndexByKey(friends, 'uid', player.uid)
      if (i !== -1) {
        updateStateListPlayer(friends, setSfriends, findIndexByKey(friends, 'uid', player.uid))
      } else {
        updateStateListPlayer(
          friendsList,
          updateList,
          findIndexByKey(friendsList, 'uid', player.uid)
        )
      }
    }
    updateList(list.filter(e => e.uid !== player.uid))
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.name}
        subtitle={
          <View style={styles.positionLabelContainer}>
            {item.principalPosition && (
              <PositionLabel position={getLabelPostionByValue(item.principalPosition)} />
            )}
          </View>
        }
        rightElement={
          <View
            style={{
              flex: 1,
              flexGrow: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <StatsDetail stats={item.stats} />
            <CheckBox
              checked={item.active}
              onPress={() => handlePress(item)}
              checkedColor="black"
            />
          </View>
        }
        leftAvatar={{ source: { uri: item.imgProfile } }}
        bottomDivider
      />
    )
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
          placeholder="Escribe el nombre del jugador..."
          containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
          inputContainerStyle={{ backgroundColor: 'white' }}
          onChangeText={updateSearch}
          value={searchText}
          lightTheme
          round
          cancelIcon
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
                  showEditButton={props.removableSelection}
                  onEditPress={() => props.removableSelection && removePlayerFromSelection(friend)}
                  editButton={{
                    name: 'cancel',
                    type: 'material',
                    color: 'white',
                  }}
                  underlayColor="white"
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
              <FlatList keyExtractor={keyExtractor} data={sFriends} renderItem={renderItem} />
            </SafeAreaView>
          </View>
        ) : (
          <View style={[styles.listContainer, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={styles.noUsersText}>Busca jugadores</Text>
          </View>
        )}
        <View style={styles.floatingButton}>
          <TouchableOpacity
            onPress={() =>
              props.handlePlayerSelection(
                list.map(player => {
                  return {
                    uid: player.uid,
                    expoToken: player.expoToken || '',
                    imgProfile: player.imgProfile,
                    principalPosition: player.principalPosition,
                    stats: player.stats,
                    name: player.name,
                    assistance: false,
                  }
                })
              )
            }
          >
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
