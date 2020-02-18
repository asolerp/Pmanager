import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import AvatarWithPicker from './Avatar'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxHeight: 180,

    borderColor: '#aaaaaa',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  topSection: {
    flex: 3,
    flexDirection: 'row',
  },
  bottomSection: {
    flex: 1,
    borderTopColor: '#aaaaaa',
    borderTopWidth: 1,
  },
  imageContainer: {
    flex: 1,
    padding: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  infoContainer: {
    flex: 2,
    padding: 10,
  },
})

const MatchCard = ({ match }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.imageContainer}>
          <AvatarWithPicker
            containerStyle={styles.image}
            imageUrl={match && match.iamgeMatch}
            size="small"
            source={{
              uri: match && match.imageMatch,
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text>{match.name}</Text>
            <Text>{match.description}</Text>
            <Text>{match.place}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>{match.date}</Text>
            <Text>{match.time}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View />
        <View />
        <View />
      </View>
    </View>
  )
}

export default MatchCard
