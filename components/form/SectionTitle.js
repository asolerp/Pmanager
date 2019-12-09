import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

function SectionTitle({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  title: {
    color: 'black',
    fontSize: 25,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'montserrat-regular',
    fontWeight: 'bold',
  },
})

export default SectionTitle
