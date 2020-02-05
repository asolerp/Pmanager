// UI
import React, { useContext } from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// Utils
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { NavigationContext } from 'react-navigation'

function PageBlank({ children, leftSide, rightSide, title, titleColor, iconName, iconColor }) {
  const navigation = useContext(NavigationContext)

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.leftSide}>
          {leftSide || (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Ionicons
                style={styles.icon}
                name={iconName || 'ios-arrow-back'}
                size={40}
                color={iconColor}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.centerSide}>
          <Text color={titleColor} style={styles.title}>
            {title}
          </Text>
        </View>
        <View style={styles.rightSide}>{rightSide}</View>
      </View>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: getStatusBarHeight(),
  },
  titleContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  leftSide: {
    flex: 2,
  },
  centerSide: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSide: {
    flex: 2,
  },
  title: {
    fontSize: 20,
    fontFamily: 'montserrat-regular',
    fontWeight: 'bold',
  },
  icon: {
    justifyContent: 'flex-start',
  },
})

export default PageBlank
