import React, { useState, useEffect } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { createDndContext } from 'react-native-easy-dnd'
import _ from 'lodash'
import Images from '../constants/Images'

// UI
import PageBlank from '../components/PageBlank'
import AvatarWithPicker from '../components/Avatar'
import { getLabelPostionByValue } from '../constants/Player'
import PlayerDrag from '../components/PlayerDrag'
import FormButton from '../components/form/FormButton'
import Section from '../components/form/SectionTitle'
import Card from '../components/Card'
import TextC from '../components/customContainers/TextC'

// API
import { withFirebaseHOC } from '../config/Firebase'
import subscribeUserData from '../hooks/subscribeUserData'

const styles = StyleSheet.create({
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
  avatarText: {
    color: 'white',
    width: '100%',
    backgroundColor: 'black',
    fontSize: 12,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginTop: 5,
    borderRadius: 5,
    height: 20,
  },
  emptyPlayer: {
    width: 40,
    height: 40,
    borderStyle: 'dashed',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 100,
    backgroundColor: 'rgba(127, 127, 127, 0.4)',
    zIndex: 0,
  },
})

const cleanPosition = {
  imgProfile: 'https://cdn4.iconfinder.com/data/icons/game-10/22/player-profile-512.png',
  name: 'Pmanager',
}

const MatchScreen = props => {
  const { user } = subscribeUserData()

  const [match, setMatch] = useState()
  const [admin, setAdmin] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [playersContainer, setPlayersContainer] = useState()

  const { Provider, Droppable, Draggable } = createDndContext()

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await props.firebase.updateDB(match, 'matches', match.uid)
      // props.navigation.pop()
    } catch (err) {
      console.log(err)
    }
    setIsSubmitting(false)
  }

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
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        const updatedFormation = { ...match }
                        const players = [...playersContainer]
                        players.push(updatedFormation[teamName][line][position])
                        updatedFormation.players.forEach(p => {
                          if (p.uid === team[line][position].uid) {
                            p.dragged = false
                            delete p.line
                            delete p.position
                            delete p.team
                          }
                        })
                        updatedFormation[teamName][line][position] = cleanPosition
                        setPlayersContainer(players)
                        setMatch(updatedFormation)
                        handleSubmit()
                      }}
                    >
                      <AvatarWithPicker
                        key={`${position}-droppable`}
                        rounded
                        containerStyle={[
                          styles.avatar,
                          {
                            borderColor: getLabelPostionByValue(
                              team[line][position].principalPosition
                            ).color,
                          },
                        ]}
                        setImage={props.setImage}
                        size="small"
                        source={{
                          uri: team[line][position].imgProfile,
                        }}
                      />
                    </TouchableOpacity>
                    <TextC textAlignVertical="center" style={styles.avatarText}>
                      {team[line][position].name}
                    </TextC>
                  </View>
                ) : (
                  <Droppable
                    key={`${position}-droppable`}
                    onDrop={({ payload }) => {
                      const updatedFormation = { ...match }
                      const players = [...playersContainer]
                      updatedFormation[teamName][line][position] = { ...payload, filled: true }
                      updatedFormation.players.forEach(p => {
                        if (p.uid === payload.uid) {
                          p.dragged = true
                          p.line = line
                          p.position = position
                          p.team = teamName
                        }
                      })
                      setPlayersContainer(players.filter(p => p.uid !== payload.uid))
                      setMatch(updatedFormation)
                      handleSubmit()
                    }}
                  >
                    {({ viewProps }) => {
                      return (
                        <Animated.View {...viewProps}>
                          <View style={{ alignItems: 'center' }}>
                            <View style={styles.emptyPlayer} />
                            <TextC>{position.substring(2)}</TextC>
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
    setPlayersContainer(matchSelected.players.filter(p => !p.dragged))
    setMatch(matchSelected)
  }, [])

  useEffect(() => {
    if (user && match) {
      if (match.admins.find(p => p.uid === user.uid)) {
        setAdmin(true)
      }
    }
  }, [user])

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
          <Card>
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
                  {playersContainer.filter(p => match.participation[p.uid]).length > 0 && (
                    <View>
                      <View>
                        <Section title="Jugadores confirmados" />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                          marginTop: 20,
                        }}
                      >
                        {playersContainer &&
                          playersContainer
                            .filter(p => match.participation[p.uid])
                            .map(player => (
                              <>
                                {admin ? (
                                  <Draggable key={`${player.uid}-draggable`} payload={player}>
                                    {({ viewProps }) => {
                                      return (
                                        <Animated.View {...viewProps} style={[viewProps.style]}>
                                          <PlayerDrag player={player} />
                                        </Animated.View>
                                      )
                                    }}
                                  </Draggable>
                                ) : (
                                  <PlayerDrag player={player} />
                                )}
                              </>
                            ))}
                      </View>
                    </View>
                  )}
                  {playersContainer.filter(p => !match.participation[p.uid]).length > 0 && (
                    <View>
                      <View>
                        <Section title="Jugadores sin confirmar" />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                          marginTop: 20,
                        }}
                      >
                        {playersContainer &&
                          playersContainer
                            .filter(p => !match.participation[p.uid])
                            .map(player => <PlayerDrag player={player} />)}
                      </View>
                    </View>
                  )}
                </>
              )}
            </View>
          </Card>
          <FormButton
            onPress={handleSubmit}
            style={{
              backgroundColor: 'transparent',
            }}
            title="Guardar"
            buttonColor="black"
            // disabled={!isValid}
            loading={isSubmitting}
          />
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
