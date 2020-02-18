import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { Icon, Image } from 'react-native-elements'
import TextC from './customContainers/TextC'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxHeight: 180,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
  },
  assistStyle: {
    shadowColor: 'rgba(21, 219, 35, .8)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderColor: '#15db23',
    borderWidth: 2,
  },
  noassistStyle: {
    shadowColor: '#CC1034',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderColor: '#CC1034',
    borderWidth: 2,
  },
  topSection: {
    flex: 5,
    flexDirection: 'row',
  },
  bottomSection: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-around',
  },
  bottomItem: {
    width: 90,
    borderColor: '#f2f2f2',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
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
    justifyContent: 'space-between',
    padding: 10,
  },
  topInfo: {
    flex: 1,
  },
  title: {
    fontSize: 15,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
})

const BottomItem = ({ texto, color }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <TextC style={{ textAlign: 'center', color, fontWeight: 'bold' }}>{texto}</TextC>
    </View>
  )
}

const MatchCard = ({ match, userUID, assist, noassist }) => {
  return (
    <View
      style={[
        styles.container,
        match.participation[userUID] ? styles.assistStyle : styles.noassistStyle,
      ]}
    >
      <View style={styles.topSection}>
        <View style={styles.imageContainer}>
          <Image
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
            source={{
              uri: match && match.imageMatch,
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.topInfo}>
            <TextC style={styles.title}>{match.name}</TextC>
            <TextC>{match.description}</TextC>
            <TextC>{match.place}</TextC>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.dateTimeContainer, { marginRight: 10 }]}>
              <Icon
                iconStyle={{ marginRight: 5 }}
                name="calendar"
                type="font-awesome"
                color="black"
                size={15}
              />
              <TextC>{match.date}</TextC>
            </View>
            <View style={styles.dateTimeContainer}>
              <Icon
                iconStyle={{ marginRight: 5 }}
                name="clock-o"
                type="font-awesome"
                color="black"
                size={15}
              />
              <TextC>{match.time}</TextC>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={[styles.bottomItem, { backgroundColor: 'rgba(21, 219, 35, .8)' }]}>
          <BottomItem texto={5} color="white" />
        </View>
        <View style={[styles.bottomItem, { justifyContent: 'center', alignItems: 'center' }]}>
          <TouchableOpacity onPress={() => assist()}>
            <TextC style={{ color: 'black', fontSize: 10 }}>Asistir</TextC>
          </TouchableOpacity>
        </View>
        <View style={[styles.bottomItem, { justifyContent: 'center', alignItems: 'center' }]}>
          <TouchableOpacity onPress={() => noassist()}>
            <TextC style={{ color: 'black', fontSize: 10 }}>No asistir</TextC>
          </TouchableOpacity>
        </View>
        <View style={[styles.bottomItem, { backgroundColor: '#CC1034' }]}>
          <BottomItem texto={10} color="white" />
        </View>
      </View>
    </View>
  )
}

export default MatchCard
