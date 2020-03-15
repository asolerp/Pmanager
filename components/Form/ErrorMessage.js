import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ErrorMessage = ({ errorValue }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
)
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
})

export default ErrorMessage
