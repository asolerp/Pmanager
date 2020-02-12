import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: 20,
    fontFamily: 'montserrat-regular',
    fontWeight: '200',
    textAlign: 'left',
  },
})

function SectionTitle({ title, customStyle, rightElement }) {
  return (
    <View style={[styles.container, customStyle]}>
      <Text style={styles.title}>{title}</Text>
      {rightElement}
    </View>
  )
}

export default SectionTitle
