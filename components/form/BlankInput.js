import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'montserrat-regular',
    marginBottom: 10,
  },
})

const BlankInput = ({ color = 'black', label, style, children, ...rest }) => (
  <View style={[styles.inputWrapper, style]}>
    {label && <Text style={[styles.label, { color }]}>{label}</Text>}
    {children}
  </View>
)

export default BlankInput
