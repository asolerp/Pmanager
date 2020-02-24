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
    paddingHorizontal: 20,
    backgroundColor: '#072357',
  },
  leftSide: {
    flex: 2,
    alignItems: 'flex-start',
  },
  centerSide: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSide: {
    alignItems: 'flex-end',
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
  viewLeftSide = true,
  viewRightSide = true,
  rightSide,
  title,
  sizeTopContainer = 'small',
  backgroundColorChildren = 'transparent',
  topContainerColor = 'transparent',
  titleColor,
  topMargin = getStatusBarHeight(),
  iconName,
  iconColor,
}) {
  const navigation = useContext(NavigationContext)

  const parseSize = size => {
    const sizes = {
      small: {
        paddingVertical: 10,
      },
      big: {
        paddingTop: 10,
        paddingBottom: 80,
      },
    }
    return sizes[size]
  }

  return (
    <View style={[styles.container, { marginTop: topMargin }]}>
      <View
        style={[
          styles.titleContainer,
          parseSize(sizeTopContainer),
          { backgroundColor: topContainerColor },
        ]}
      >
        {viewLeftSide && (
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
        )}
        <View style={styles.centerSide}>
          <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
        </View>
        {viewRightSide && <View style={styles.rightSide}>{rightSide()}</View>}
      </View>
      <View style={{ flex: 1, backgroundColor: backgroundColorChildren }}>{children}</View>
    </View>
  )
}

export default PageBlank
