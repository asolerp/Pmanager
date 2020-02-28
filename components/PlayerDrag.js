import React from 'react'

import { View } from 'react-native'
import { getLabelPostionByValue } from '../constants/Player'

// UI
import AvatarWithPicker from './Avatar'
import PositionLabel from './PositionLabel'
import TextC from './customContainers/TextC'

const PlayerDrag = ({ player }) => {
  return (
    <View
      style={{
        marginRight: 10,
        alignItems: 'center',
        marginBottom: 10,
        position: 'relative',
      }}
    >
      <AvatarWithPicker
        rounded
        imageUrl={player.imgProfile}
        size="small"
        source={{
          uri: player.imgProfile,
        }}
      />
      <PositionLabel
        style={{
          position: 'absolute',
          top: -10,
          left: '50%',
          zIndex: 2,
        }}
        position={getLabelPostionByValue(player.principalPosition)}
      />
      <View style={{ flexDirection: 'row' }}>
        <TextC>{player.name}</TextC>
      </View>
    </View>
  )
}

export default PlayerDrag
