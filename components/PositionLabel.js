import React from 'react'
import { StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  label: {
    color: 'white',
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
})
const PositionLabel = ({ position }) => {
  return <Text style={[styles.label, { backgroundColor: position.color }]}>{position.name}</Text>
}

export default PositionLabel
