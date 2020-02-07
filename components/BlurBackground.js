import React from 'react'
import { ImageBackground, StyleSheet, View, Text } from 'react-native'

import { getStatusBarHeight } from 'react-native-status-bar-height'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  topBackgroundImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  backColor: {
    backgroundColor: 'red',
    height: '100%',
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'montserrat-regular',
    marginTop: getStatusBarHeight() * 1.5,
    marginLeft: 10,
  },
})

function BlurBackground({
  blur,
  backgroundUrlOnline,
  backgroundSource,
  children,
  center,
  title,
  backColor = 'rgba(63, 63, 63, .6)',
}) {
  return (
    <ImageBackground
      source={
        backgroundSource || {
          uri: backgroundUrlOnline,
        }
      }
      blurRadius={blur || 6}
      style={styles.container}
    >
      <View style={{ backgroundColor: backColor }}>
        {title && (
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
        <View style={[center && styles.topBackgroundImage]}>{children}</View>
      </View>
    </ImageBackground>
  )
}

export default BlurBackground
