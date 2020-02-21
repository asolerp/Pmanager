import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import Images from '../constants/Images'

// UI
import PageBlank from '../components/PageBlank'
import AvatarWithPicker from '../components/Avatar'

// API
import { withFirebaseHOC } from '../config/Firebase'

const styles = StyleSheet.create({
  fieldContainer: {
    width: '100%',
    position: 'relative',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    shadowColor: '#aaaaaa',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  avatar: {
    borderColor: 'white',
    borderWidth: 2,
    shadowColor: '#aaaaaa',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
})

const MatchScreen = props => {
  const [match, setMatch] = useState()
  const [defaultPosition, setDefaultPosition] = useState('3-2-1')
  const [firstLine, setFirstLine] = useState()
  const [secondLine, setSecondLine] = useState()
  const [thirdLine, setThirdLine] = useState()

  const generateRows = team => {
    Object.keys(team).map(line => (
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <AvatarWithPicker
              rounded
              containerStyle={styles.avatar}
              imageUrl={match && match.imageMatch}
              size="small"
              source={{
                uri: match && match.imageMatch,
              }}
            />
            <Text style={{ color: 'white', fontSize: 10 }}>Nombre</Text>
          </View>
        </View>
        {Object.keys(team[line]).map(position => (
          <View style={{ alignItems: 'center' }}>
            <AvatarWithPicker
              rounded
              containerStyle={styles.avatar}
              imageUrl={team[line][position].imgProfile}
              size="small"
              source={{
                uri: match && match.imageMatch,
              }}
            />
            <Text style={{ color: 'white', fontSize: 10 }}>
              {team[line][position].imgProfile.name}
            </Text>
          </View>
        ))}
      </View>
    ))
    // const container = []
    // for (let i = 0; i < players; i += 1) {
    //   container.push(
    //     <View style={{ alignItems: players > 1 ? 'space-around' : 'center' }}>
    //       <AvatarWithPicker
    //         rounded
    //         containerStyle={styles.avatar}
    //         imageUrl={m.imageMatch}
    //         size="small"
    //         source={{
    //           uri: m.imageMatch,
    //         }}
    //       />
    //       <Text style={{ color: 'white', fontSize: 10 }}>Nombre</Text>
    //     </View>
    //   )
    // }
    // setter(container)
  }

  useEffect(() => {
    const matchSelected = props.navigation.getParam('match')
    // generateRows(setFirstLine, Number(defaultPosition.split('-')[0]), matchSelected)
    // generateRows(setSecondLine, Number(defaultPosition.split('-')[1]), matchSelected)
    // generateRows(setThirdLine, Number(defaultPosition.split('-')[2]), matchSelected)
    setMatch(matchSelected)
  }, [])

  const Formacion = ({ match, reverse }) => {
    return (
      <View
        style={{
          width: '50%',
          height: '100%',
          flexDirection: reverse ? 'row-reverse' : 'row',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        {generateRows(match.teamA)}
        {generateRows(match.teamB)}
      </View>
    )
  }

  return (
    <PageBlank
      title={match && match.name}
      titleColor="white"
      topContainerColor="#072357"
      backgroundColorChildren="#f2f2f2"
      iconColor="black"
      leftSide={() => (
        <TouchableOpacity onPress={() => props.navigation.pop()}>
          <Icon name="angle-left" type="font-awesome" color="white" size={30} />
        </TouchableOpacity>
      )}
      rightSide={() => (
        <AvatarWithPicker
          rounded
          imageUrl={match && match.imageMatch}
          size="small"
          source={{
            uri: match && match.imageMatch,
          }}
        />
      )}
    >
      <View style={{ flex: 1, justifyContent: 'flex-start', paddingHorizontal: 10 }}>
        <View style={styles.fieldContainer}>
          <View
            style={{
              position: 'absolute',
              zIndex: 2,
              width: '100%',
              height: '100%',
              flexDirection: 'row',
              top: 5,
              left: 7,
            }}
          >
            {match && (
              <>
                <Formacion match={match} />
                <Formacion match={match} reverse />
              </>
            )}
          </View>
          <Image
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
            source={Images.matchField.file}
          />
        </View>
      </View>
    </PageBlank>
  )
}

const MatchScreenWithHOC = withFirebaseHOC(MatchScreen)

MatchScreenWithHOC.navigationOptions = {
  header: null,
}

export default MatchScreenWithHOC
