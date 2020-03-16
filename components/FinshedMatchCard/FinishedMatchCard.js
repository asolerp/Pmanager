import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Image } from 'react-native-elements'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import TextC from '../customContainers/TextC'

const Styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 5,
    shadowColor: '#aaaaaa',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  imgContiner: {
    flex: 1,
    padding: 5,
  },
  textContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreStyle: {
    fontSize: 40,
    fontFamily: 'digit',
  },
})

const FinishedMatchCard = ({ match }) => {
  return (
    <View style={Styles.mainContainer}>
      <View style={Styles.imgContiner}>
        <Image
          style={[{ width: '100%', height: hp('5%'), borderRadius: 5 }]}
          source={{
            uri: match && match.imageMatch,
          }}
        />
      </View>
      <View style={Styles.textContainer}>
        <TextC>{match.name}</TextC>
      </View>
      <View style={Styles.scoreContainer}>
        <Text style={Styles.scoreStyle}>2</Text>
        <Text style={Styles.scoreStyle}>:</Text>
        <Text style={Styles.scoreStyle}>0</Text>
      </View>
    </View>
  )
}

export default FinishedMatchCard
