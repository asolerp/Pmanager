import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import BlurBackground from '../components/BlurBackground'
import { withFirebaseHOC } from '../config/Firebase'
import FriendItem from '../components/FriendItem'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
})

const FriendListScreen = () => {
  return (
    <View style={styles.container}>
      <BlurBackground
        blur={2}
        center
        backgroundUrl="https://i.pinimg.com/originals/35/5e/06/355e06c94e6bf92cbaf0c015edf7eea3.jpg"
      >
        <FriendItem />
        <Text>Amigos</Text>
      </BlurBackground>
    </View>
  )
}

const FriendListScreenWithHOC = withFirebaseHOC(FriendListScreen)

FriendListScreenWithHOC.navigationOptions = {
  header: null,
}

export default FriendListScreenWithHOC
