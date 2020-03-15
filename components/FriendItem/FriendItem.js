import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Avatar, CheckBox } from 'react-native-elements'
import { NavigationContext } from 'react-navigation'
import PositionLabel from '../PositionLabel'

// Styles
import Styles from './Styles'

// Utils
import { getLabelPostionByValue } from '../../constants/Player'

const FriendItem = ({ user, addFriend, active, ...rest }) => {
  const { imgProfile, name, principalPosition, uid } = user
  const navigation = useContext(NavigationContext)

  return (
    <TouchableOpacity onPress={() => navigation.navigate('FriendProfile', { friendUID: uid })}>
      <View style={Styles.itemWrapper}>
        <View style={Styles.avatarWrapper}>
          <Avatar
            size="medium"
            source={{
              uri: imgProfile,
            }}
          />
        </View>
        <View style={Styles.infoWrapper}>
          <View style={{ flexDirection: 'row' }}>
            <PositionLabel
              position={
                principalPosition
                  ? getLabelPostionByValue(principalPosition)
                  : getLabelPostionByValue('NA')
              }
            />
            <Text style={Styles.title}>{name}</Text>
          </View>
        </View>
        <View style={Styles.positionWrapper}>
          <CheckBox checked={active} onPress={() => addFriend(user)} checkedColor="black" />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default FriendItem
