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
    borderColor: '#CC1034',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: '#CC1034',
  },
  title: {
    color: 'white',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'montserrat-regular',
    textAlign: 'center',
  },
})

export default SectionTitle
