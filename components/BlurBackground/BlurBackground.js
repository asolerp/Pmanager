import React from 'react'
import { ImageBackground, View, Text } from 'react-native'
import Styles from './Styles'

function BlurBackground({
  backColor = 'rgba(63, 63, 63, .6)',
  backgroundUrlOnline,
  backgroundSource,
  children,
  center,
  title,
  blur,
}) {
  return (
    <ImageBackground
      source={
        backgroundSource || {
          uri: backgroundUrlOnline,
        }
      }
      blurRadius={blur || 6}
      style={Styles.container}
    >
      <View style={{ backgroundColor: backColor }}>
        {title && (
          <View>
            <Text style={Styles.title}>{title}</Text>
          </View>
        )}
        <View style={[center && Styles.topBackgroundImage]}>{children}</View>
      </View>
    </ImageBackground>
  )
}

export default BlurBackground
