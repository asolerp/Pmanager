import React, { useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import { NavigationContext } from 'react-navigation'

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  avatarWrapper: {
    flex: 1,
  },
  infoWrapper: {
    flex: 3,
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontFamily: 'montserrat-regular',
    fontSize: 25,
  },
  subtitle: {
    fontFamily: 'montserrat-light',
  },
  positionWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionLabel: {
    height: 75,
    width: 75,
    borderRadius: 100,
    backgroundColor: 'rgba(20,20,20,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionText: {
    color: 'white',
    fontFamily: 'montserrat-regular',
    fontSize: 30,
  },
})

const FriendItem = ({ user }) => {
  const { imgProfile, name, position, uid } = user
  const navigation = useContext(NavigationContext)

  return (
    <TouchableOpacity onPress={() => navigation.navigate('FriendProfile', { friendUID: uid })}>
      <View style={styles.itemWrapper}>
        <View style={styles.avatarWrapper}>
          <Avatar
            rounded
            size="large"
            source={{
              uri: imgProfile,
            }}
          />
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.positionWrapper}>
          <View style={styles.positionLabel}>
            <Text style={styles.positionText}>{position}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default FriendItem
