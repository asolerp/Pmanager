import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

function PlayerDetail({
  title,
  subtitle,
  children,
  containerStyle,
  titleStyle,
  subtitleStyle,
  ...rest
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {children ? (
        <View>{children}</View>
      ) : (
        <Text style={[styles.subtitle, subtitleStyle]} {...rest}>
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
    textAlign: 'left',
  },
  subtitle: {
    color: 'black',
    fontFamily: 'montserrat-light',
    fontSize: 15,
  },
})

export default PlayerDetail
