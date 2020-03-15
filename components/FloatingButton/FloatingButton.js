import React, { useContext } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { NavigationContext } from 'react-navigation'

import { Icon } from 'react-native-elements'
import Styles from './Styles'

const FloatingButton = ({
  containerStyle,
  page,
  handleClick = () => navigation.navigate(page),
  iconColor,
  iconSize,
  iconName = 'futbol-o',
  iconType = 'font-awesome',
}) => {
  const navigation = useContext(NavigationContext)
  return (
    <View style={[Styles.addPlayerButton, containerStyle]}>
      <TouchableOpacity onPress={handleClick}>
        <Icon name={iconName} type={iconType} color={iconColor} size={iconSize} />
      </TouchableOpacity>
    </View>
  )
}

export default FloatingButton
