import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

function PlayerDetail({ title, subtitle, children, rest }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children ? (
        <View>{children}</View>
      ) : (
        <Text style={styles.subtitle} {...rest}>
          {subtitle}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  title: {
    color: 'black',
    fontFamily: 'montserrat-regular',
    fontSize: 20,
  },
  subtitle: {
    color: 'black',
    fontFamily: 'montserrat-light',
    fontSize: 15,
  },
})

export default PlayerDetail
