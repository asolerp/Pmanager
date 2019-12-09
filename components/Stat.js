import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

function Stat(props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.stat}>{props.stat}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    color: 'white',
  },
  stat: {
    fontSize: 25,
    color: 'white',
  },
})

export default Stat
