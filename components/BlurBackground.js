import React from 'react'
import { ImageBackground, StyleSheet, View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  topBackgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundColor: {
    backgroundColor: 'rgba(63, 63, 63, .6)',
  },
  avatarWrapper: {
    flex: 2,
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
  },
  avatar: {
    marginTop: 30,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 12,
  },
  infoWrapper: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
})

function BlurBackground({ backgroundUrl, children, center }) {
  return (
    <ImageBackground
      source={{
        uri: backgroundUrl,
      }}
      blurRadius={6}
      style={styles.container}
    >
      <View style={[center && styles.topBackgroundImage, styles.backgroundColor]}>{children}</View>
    </ImageBackground>
  )
}

export default BlurBackground
