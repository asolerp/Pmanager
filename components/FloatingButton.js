import React, { useContext } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { NavigationContext } from 'react-navigation'

import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  addPlayerButton: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 50,
    right: 10,
    backgroundColor: 'black',
    borderRadius: 100,
    justifyContent: 'center',
    alignContent: 'center',
    shadowColor: '#aaaaaa',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    zIndex: 5,
  },
})

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
    <View style={[styles.addPlayerButton, containerStyle]}>
      <TouchableOpacity onPress={handleClick}>
        <Icon name={iconName} type={iconType} color={iconColor} size={iconSize} />
      </TouchableOpacity>
    </View>
  )
}

export default FloatingButton
