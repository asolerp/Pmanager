import React, { useState as useStateOverride, useEffect } from 'react'
import {
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { createDndContext } from 'react-native-easy-dnd'
import _ from 'lodash'
import Images from '../constants/Images'
import useStateWrapper from '../ReactotronConfig'

// UI
import PageBlank from '../components/PageBlank'
import AvatarWithPicker from '../components/Avatar'
import { getLabelPostionByValue } from '../constants/Player'
import PlayerDrag from '../components/PlayerDrag'
import FormButton from '../components/form/FormButton'
import Section from '../components/form/SectionTitle'
import Card from '../components/Card'
import TextC from '../components/customContainers/TextC'
import PlayerDetail from '../components/PlayerDetail'

// API
import { withFirebaseHOC } from '../config/Firebase'
import subscribeUserData from '../hooks/subscribeUserData'

// PAGES
import FriendListScreen from './FriendListScreen'
import FloatingButton from '../components/FloatingButton'

const useState = useStateWrapper(useStateOverride)

const styles = StyleSheet.create({
  scoreContainer: {
    position: 'absolute',
    left: 193 - 25 - 2.5,
    top: -10,
    zIndex: 10,
    flexDirection: 'row',
  },
  score: {
    width: 25,
    height: 50,
    borderRadius: 3,
    marginRight: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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

  const [activeModal, setActiveModal] = useState(false)
  const [match, setMatch] = useState()
  const [admin, setAdmin] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [playersContainer, setPlayersContainer] = useState()
  const [container, setContainer] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [admins, setAdmins] = useState([])
  const [selector, setSelector] = useState()

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
    if (match) {
      setAdmins(match.admins)
      setSelectedPlayers(match.players)
    }
  }, [match])

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
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={activeModal}
        onRequestClose={() => {
          setActiveModal(false)
        }}
      >
        <FriendListScreen
          listSelectedPlayers={container}
          removableSelection={false}
          handlePlayerSelection={players => {
            selector(players)
            setActiveModal(false)
          }}
        />
      </Modal>
      <FloatingButton
        page="NewMatch"
        containerStyle={{ backgroundColor: '#072357' }}
        iconColor="white"
        iconName="user-circle-o"
        iconType="font-awesome"
        handleClick={() => {
          setActiveModal(true)
          setSelector(() => setSelectedPlayers)
          setContainer(selectedPlayers)
        }}
      />
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
          {match && (
            <ScrollView>
              <View style={{ flex: 1, justifyContent: 'flex-start', paddingHorizontal: 10 }}>
                <Card>
                  <View>
                    {match && (
                      <>
                        <View style={{ flexDirection: 'row', height: 300 }}>
                          {/* <View style={styles.scoreContainer}>
                        <View style={styles.score}>
                          <TextC>0</TextC>
                        </View>
                        <View style={styles.score}>
                          <TextC>0</TextC>
                        </View>
                      </View> */}
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
                        <View style={{ flexDirection: 'row' }}>
                          {playersContainer.filter(p => match.participation[p.uid]).length > 0 && (
                            <View style={{ flex: 1 }}>
                              <View>
                                <Section
                                  textStyle={{ fontSize: 12 }}
                                  title="Jugadores confirmados"
                                />
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
                                          <Draggable
                                            key={`${player.uid}-draggable`}
                                            payload={player}
                                          >
                                            {({ viewProps }) => {
                                              return (
                                                <Animated.View
                                                  {...viewProps}
                                                  style={[viewProps.style]}
                                                >
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
                            <View style={{ flex: 1 }}>
                              <View>
                                <Section
                                  textStyle={{ fontSize: 12 }}
                                  title="Jugadores sin confirmar"
                                />
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
                        </View>
                      </>
                    )}
                  </View>
                </Card>
                <Card>
                  <Section textStyle={{ fontSize: 12 }} title="Información del partido" />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}
                  >
                    <PlayerDetail
                      title="Descripción"
                      subtitle={match.description}
                      containerStyle={{ marginRight: 20 }}
                      titleStyle={{ fontSize: 12 }}
                      subtitleStyle={{ fontSize: 12 }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}
                  >
                    <PlayerDetail
                      title="Fecha"
                      subtitle={match.date}
                      containerStyle={{ marginRight: 20 }}
                      titleStyle={{ fontSize: 12 }}
                      subtitleStyle={{ fontSize: 12 }}
                    />
                    <PlayerDetail
                      title="Hora"
                      subtitle={match.time}
                      titleStyle={{ fontSize: 12 }}
                      subtitleStyle={{ fontSize: 12 }}
                    />
                  </View>
                </Card>
                <Card>
                  <Section
                    textStyle={{ fontSize: 12 }}
                    title="Administradores"
                    rightElement={
                      <TouchableOpacity
                        onPress={() => {
                          setActiveModal(true)
                          setSelector(() => setAdmins)
                          setContainer(admins)
                        }}
                      >
                        <TextC>Añadir</TextC>
                      </TouchableOpacity>
                    }
                  />
                  <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                    {match.admins.map(ad => (
                      <AvatarWithPicker
                        key={`${ad.uid}-admin`}
                        rounded
                        setImage={props.setImage}
                        size="small"
                        source={{
                          uri: ad.imgProfile,
                        }}
                      />
                    ))}
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
            </ScrollView>
          )}
        </PageBlank>
      </Provider>
    </>
  )
}

const MatchScreenWithHOC = withFirebaseHOC(MatchScreen)

MatchScreenWithHOC.navigationOptions = {
  header: null,
}

export default MatchScreenWithHOC
