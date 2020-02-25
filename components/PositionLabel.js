import React from 'react'
import { StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  label: {
    color: 'white',
    width: 30,
    borderRadius: 5,
    fontSize: 10,
    fontFamily: 'montserrat-regular',
    paddingHorizontal: 3,
    paddingVertical: 3,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
})
const PositionLabel = ({ position, style }) => {
  return (
    <Text style={[styles.label, { backgroundColor: position.color }, style]}>{position.name}</Text>
  )
}

export default PositionLabel
