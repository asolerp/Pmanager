import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { getLabelPostionByValue } from '../constants/Player'

// ELEMENTS
import PositionLabel from './PositionLabel'
import Avatar from './Avatar'

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#aaaaaa',
  },
  avatarWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoWrapper: {
    flex: 3,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'montserrat-regular',
    fontSize: 15,
    color: 'black',
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

const PlayerRow = ({ player }) => {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.avatarWrapper}>
        <Avatar
          rounded
          imageUrl={player.imgProfile}
          size="medium"
          source={{
            uri: player.imgProfile,
          }}
        />
      </View>
      <View style={styles.infoWrapper}>
        <View style={{ flexDirection: 'row' }}>
          <PositionLabel
            position={
              player.principalPosition
                ? getLabelPostionByValue(player.principalPosition)
                : getLabelPostionByValue('NA')
            }
          />
          <Text style={styles.title}>{player.name}</Text>
        </View>
      </View>
    </View>
  )
}

export default PlayerRow
