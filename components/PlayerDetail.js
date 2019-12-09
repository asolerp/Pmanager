import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

function PlayerDetail(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  constainer: {
    justifyContent: 'flex-start',
  },
  title: {
    color: 'black',
    fontSize: 20,
  },
  subtitle: {
    color: '#aaaaaa',
    fontSize: 15,
  },
})

export default PlayerDetail
