import React, { useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Avatar, CheckBox } from 'react-native-elements'
import { NavigationContext } from 'react-navigation'
import PositionLabel from './PositionLabel'

// Utils
import { getLabelPostionByValue } from '../constants/Player'

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#aaaaaa',
    backgroundColor: 'rgba(81, 95, 137, .7)',
    marginBottom: 5,
  },
  avatarWrapper: {
    flex: 1,
  },
  infoWrapper: {
    flex: 3,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'montserrat-regular',
    fontSize: 25,
    color: 'white',
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
    color: 'black',
    fontFamily: 'montserrat-regular',
    fontSize: 15,
  },
})

const FriendItem = ({ user, addFriend, active, ...rest }) => {
  const { imgProfile, name, principalPosition, uid } = user
  const navigation = useContext(NavigationContext)

  return (
    <TouchableOpacity onPress={() => navigation.navigate('FriendProfile', { friendUID: uid })}>
      <View style={styles.itemWrapper}>
        <View style={styles.avatarWrapper}>
          <Avatar
            size="medium"
            source={{
              uri: imgProfile,
            }}
          />
        </View>
        <View style={styles.infoWrapper}>
          <View style={{ flexDirection: 'row' }}>
            <PositionLabel
              position={
                principalPosition
                  ? getLabelPostionByValue(principalPosition)
                  : getLabelPostionByValue('NA')
              }
            />
            <Text style={styles.title}>{name}</Text>
          </View>
        </View>
        <View style={styles.positionWrapper}>
          <CheckBox checked={active} onPress={() => addFriend(user)} checkedColor="black" />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default FriendItem
