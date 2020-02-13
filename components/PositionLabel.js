import React from 'react'
import { StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  label: {
    color: 'white',
    borderRadius: 5,
    marginRight: 10,
    fontSize: 10,
    fontFamily: 'montserrat-regular',
    paddingHorizontal: 3,
    paddingVertical: 3,
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
})
const PositionLabel = ({ position }) => {
  return <Text style={[styles.label, { backgroundColor: position.color }]}>{position.name}</Text>
}

export default PositionLabel
