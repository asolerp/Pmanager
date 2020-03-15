import React from 'react'
import { View } from 'react-native'
import Styles from './Styles'

const Card = ({ children }) => {
  return <View style={Styles.container}>{children}</View>
}

export default Card
