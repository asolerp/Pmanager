import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    borderColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: '#f7f7f7',
  },
  title: {
    color: 'black',
    fontSize: 15,
    paddingTop: 10,
    paddingLeft: 15,
    paddingBottom: 10,
    fontFamily: 'montserrat-regular',
    fontWeight: '200',
    textAlign: 'left',
  },
})

function SectionTitle({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default SectionTitle
