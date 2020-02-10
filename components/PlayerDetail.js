import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

function PlayerDetail({ title, subtitle, rest }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle} {...rest}>
        {subtitle}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  constainer: {
    justifyContent: 'flex-start',
    marginBottom: 15,
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
