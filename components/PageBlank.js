// UI
import React, { useContext } from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// Utils
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { NavigationContext } from 'react-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
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
    fontWeight: '200',
  },
  icon: {
    justifyContent: 'flex-start',
  },
})

function PageBlank({
  children,
  leftSide,
  rightSide,
  title,
  titleColor,
  topMargin = getStatusBarHeight(),
  iconName,
  iconColor,
}) {
  const navigation = useContext(NavigationContext)

  return (
    <View style={[styles.container, { marginTop: topMargin }]}>
      <View style={styles.titleContainer}>
        <View style={styles.leftSide}>
          {leftSide ? (
            leftSide()
          ) : (
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
          <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
        </View>
        <View style={styles.rightSide}>{rightSide()}</View>
      </View>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  )
}

export default PageBlank
