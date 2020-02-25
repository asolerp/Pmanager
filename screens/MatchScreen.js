import React, { useState, useEffect } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { createDndContext } from 'react-native-easy-dnd'
import Images from '../constants/Images'

// UI
import PageBlank from '../components/PageBlank'
import AvatarWithPicker from '../components/Avatar'
import { getLabelPostionByValue } from '../constants/Player'
import PositionLabel from '../components/PositionLabel'

// API
import { withFirebaseHOC } from '../config/Firebase'

const styles = StyleSheet.create({
  fieldContainer: {
    width: '100%',
    position: 'relative',
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

const cleanPosition = {
  imgProfile: 'https://cdn4.iconfinder.com/data/icons/game-10/22/player-profile-512.png',
  name: 'Pmanager',
}

const MatchScreen = props => {
  const [match, setMatch] = useState()
  const [playersContainer, setPlayersContainer] = useState()
  const { Provider, Droppable, Draggable } = createDndContext()

  const generateRows = (team, teamName) => {
    return (
      <>
        {Object.keys(team).map(line => (
          <View
            key={line}
            style={{
              flex: 1,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            {Object.keys(team[line]).map(position => (
              <>
                {team[line][position].filled ? (
                  <View style={{ justifyContent: 'center' }}>
                    <AvatarWithPicker
                      key={`${position}-droppable`}
                      rounded
                      editButton={{
                        name: 'cancel',
                        type: 'material',
                        color: 'black',
                        underlayColor: '#000',
                      }}
                      onEditPress={() => {
                        const updatedFormation = { ...match }
                        const players = [...playersContainer]
                        players.push(updatedFormation[teamName][line][position])
                        updatedFormation[teamName][line][position] = cleanPosition
                        setPlayersContainer(players)
                        setMatch(updatedFormation)
                      }}
                      containerStyle={[
                        styles.avatar,
                        {
                          borderColor: getLabelPostionByValue(
                            team[line][position].principalPosition
                          ).color,
                        },
                      ]}
                      showEditButton
                      setImage={props.setImage}
                      size="medium"
                      source={{
                        uri: team[line][position].imgProfile,
                      }}
                    />
                    <Text>{team[line][position].name}</Text>
                  </View>
                ) : (
                  <Droppable
                    key={`${position}-droppable`}
                    onEnter={() => {
                      console.log('Draggable entered')
                    }}
                    onLeave={() => {
                      console.log('Draggable left')
                    }}
                    onDrop={({ payload }) => {
                      console.log(payload)
                      const updatedFormation = { ...match }
                      const players = [...playersContainer]
                      updatedFormation[teamName][line][position] = { ...payload, filled: true }
                      setPlayersContainer(players.filter(p => p.uid !== payload.uid))
                      setMatch(updatedFormation)
                    }}
                  >
                    {({ viewProps }) => {
                      return (
                        <Animated.View {...viewProps}>
                          <View style={{ alignItems: 'center' }}>
                            <View
                              style={{
                                width: 40,
                                height: 40,
                                borderStyle: 'dashed',
                                borderColor: 'black',
                                borderWidth: 2,
                                borderRadius: 100,
                                backgroundColor: 'rgba(127, 127, 127, 0.4)',
                              }}
                            />
                            <Text>{position.substring(2)}</Text>
                          </View>
                        </Animated.View>
                      )
                    }}
                  </Droppable>
                )}
              </>
            ))}
          </View>
        ))}
      </>
    )
  }

  useEffect(() => {
    const matchSelected = props.navigation.getParam('match')
    setPlayersContainer(matchSelected.players)
    setMatch(matchSelected)
  }, [])

  const Formacion = ({ team, teamName, reverse }) => {
    return (
      <View
        style={{
          width: '50%',
          height: '100%',
          zIndex: 1,
          flexDirection: reverse ? 'row-reverse' : 'row',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        {generateRows(team, teamName)}
      </View>
    )
  }

  return (
    <Provider>
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
            <View>
              {match && (
                <>
                  <View style={{ flexDirection: 'row', height: 300 }}>
                    <Formacion team={match.teamA} teamName="teamA" />
                    <Formacion team={match.teamB} teamName="teamB" reverse />
                    <Image
                      style={{
                        position: 'absolute',
                        zIndex: 0,
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                      }}
                      source={Images.matchField.file}
                    />
                  </View>
                  <View>
                    <Text style={{ paddingVertical: 10, marginBottom: 10 }}>
                      Jugadores confirmados
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}
                  >
                    {playersContainer &&
                      playersContainer
                        .filter(p => match.participation[p.uid])
                        .map(player => (
                          <Draggable
                            key={`${player.uid}-draggable`}
                            onDragStart={() => {
                              console.log('Started draggging')
                            }}
                            onDragEnd={() => {
                              console.log('Ended draggging')
                            }}
                            payload={player}
                          >
                            {({ viewProps }) => {
                              return (
                                <Animated.View {...viewProps} style={[viewProps.style]}>
                                  <View
                                    style={{
                                      marginRight: 10,
                                      alignItems: 'center',
                                      marginBottom: 10,
                                      position: 'relative',
                                    }}
                                  >
                                    <AvatarWithPicker
                                      rounded
                                      imageUrl={player.imgProfile}
                                      size="medium"
                                      source={{
                                        uri: player.imgProfile,
                                      }}
                                    />
                                    <PositionLabel
                                      style={{
                                        position: 'absolute',
                                        top: -10,
                                        left: '50%',
                                        zIndex: 2,
                                      }}
                                      position={getLabelPostionByValue(player.principalPosition)}
                                    />
                                    <View style={{ flexDirection: 'row' }}>
                                      <Text>{player.name}</Text>
                                    </View>
                                  </View>
                                </Animated.View>
                              )
                            }}
                          </Draggable>
                        ))}
                  </View>
                  <View>
                    <Text style={{ paddingVertical: 10, marginBottom: 10 }}>
                      Jugadores sin confirmar
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}
                  >
                    {playersContainer &&
                      playersContainer
                        .filter(p => !match.participation[p.uid])
                        .map(player => (
                          <View
                            style={{
                              marginRight: 10,
                              alignItems: 'center',
                              marginBottom: 10,
                              position: 'relative',
                            }}
                          >
                            <AvatarWithPicker
                              rounded
                              imageUrl={player.imgProfile}
                              size="medium"
                              source={{
                                uri: player.imgProfile,
                              }}
                            />
                            <PositionLabel
                              style={{
                                position: 'absolute',
                                top: -10,
                                left: '50%',
                                zIndex: 2,
                              }}
                              position={getLabelPostionByValue(player.principalPosition)}
                            />
                            <View style={{ flexDirection: 'row' }}>
                              <Text>{player.name}</Text>
                            </View>
                          </View>
                        ))}
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </PageBlank>
    </Provider>
  )
}

const MatchScreenWithHOC = withFirebaseHOC(MatchScreen)

MatchScreenWithHOC.navigationOptions = {
  header: null,
}

export default MatchScreenWithHOC
