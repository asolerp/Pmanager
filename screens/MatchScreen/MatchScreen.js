import React, { useState, useEffect } from 'react'
import { Animated, ScrollView, TouchableOpacity, View, Image, Modal } from 'react-native'
import { Icon } from 'react-native-elements'
import { createDndContext } from 'react-native-easy-dnd'
import Reactotron from 'reactotron-react-native'
import Images from '../../constants/Images'
import Styles from './Styles'

// UI
import PageBlank from '../../components/PageBlank'
import AvatarWithPicker from '../../components/Avatar/Avatar'
import { getLabelPostionByValue } from '../../constants/Player'
import PlayerDrag from '../../components/PlayerDrag'
import FormButton from '../../components/Form/FormButton'
import Section from '../../components/Form/SectionTitle'
import Card from '../../components/Card/Card'
import TextC from '../../components/customContainers/TextC'
import PlayerDetail from '../../components/PlayerDetail'

// API
import { withFirebaseHOC } from '../../config/Firebase'
import subscribeUserData from '../../hooks/subscribeUserData'

// PAGES
import FriendListScreen from '../FriendListScreen'
import FloatingButton from '../../components/FloatingButton/FloatingButton'

const cleanPosition = {
  imgProfile: 'https://cdn4.iconfinder.com/data/icons/game-10/22/player-profile-512.png',
  name: 'Pmanager',
}

const MatchScreen = props => {
  const { user } = subscribeUserData()

  const [activeModal, setActiveModal] = useState(false)
  const [match, setMatch] = useState()
  const [admin, setAdmin] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [playersContainer, setPlayersContainer] = useState()
  const [container, setContainer] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [admins, setAdmins] = useState([])
  const [selector, setSelector] = useState()
  const [mode, setMode] = useState('')

  const { Provider, Droppable, Draggable } = createDndContext()

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const filteredParticipation = Object.keys(match.participation)
      .filter(key => match.playersUID.includes(key))
      .reduce((obj, key) => {
        obj[key] = match.participation[key]
        return obj
      }, {})

    const merged = []

    for (let i = 0; i < selectedPlayers.length; i++) {
      merged.push({
        ...selectedPlayers[i],
        ...match.players.find(itmInner => itmInner.uid === selectedPlayers[i].uid),
      })
    }

    try {
      await props.firebase.updateDB(
        {
          ...match,
          admins: admins.map(a => ({ uid: a.uid, imgProfile: a.imgProfile })),
          players: merged,
          teamA: match.teamA,
          teamB: match.teamB,
          participation: filteredParticipation,
          playersUID: [...merged.map(sp => sp.uid)],
        },
        'matches',
        match.uid
      )
      // props.navigation.pop()
    } catch (err) {
      Reactotron.log(err)
    }
    setIsSubmitting(false)
  }

  const cleanField = (team, teamName, line, position) => {
    const player = match.players.find(mp => mp.uid === team[line][position].uid)
    if (player) {
      return true
    }
    match[teamName][line][position] = {
      imgProfile: 'https://cdn4.iconfinder.com/data/icons/game-10/22/player-profile-512.png',
      name: 'Pmanager',
      order: 1,
    }
    return false
  }

  const generateBanquillo = (team, teamName) => {
    return (
      <>
        {Object.keys(team[4]).map(position => (
          <React.Fragment key={`${position}_banquillo_${team}`}>
            {team['4'][position].filled ? (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => {
                    if (admin) {
                      const updatedFormation = { ...match }
                      const players = [...playersContainer]
                      players.push(updatedFormation[teamName]['4'][position])
                      updatedFormation.players.forEach(p => {
                        if (p.uid === team['4'][position].uid) {
                          p.dragged = false
                          delete p.line
                          delete p.position
                          delete p.team
                        }
                      })
                      updatedFormation[teamName]['4'][position] = cleanPosition
                      setPlayersContainer(players)
                      setMatch(updatedFormation)
                      handleSubmit()
                    }
                  }}
                >
                  <AvatarWithPicker
                    key={`${position}_remove_banquillo_${team}`}
                    rounded
                    containerStyle={[
                      Styles.avatar,
                      {
                        borderColor: getLabelPostionByValue(team['4'][position].principalPosition)
                          .color,
                      },
                    ]}
                    setImage={props.setImage}
                    size="small"
                    source={{
                      uri: team['4'][position].imgProfile,
                    }}
                  />
                </TouchableOpacity>
                <TextC textAlignVertical="center" style={Styles.avatarText}>
                  {team['4'][position].name}
                </TextC>
              </View>
            ) : (
              <Droppable
                key={`${position}_droppable_banquillo_${team}`}
                onDrop={({ payload }) => {
                  const updatedFormation = { ...match }
                  const players = [...playersContainer]
                  updatedFormation[teamName]['4'][position] = { ...payload, filled: true }
                  updatedFormation.players.forEach(p => {
                    if (p.uid === payload.uid) {
                      p.dragged = true
                      p.line = '4'
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
                    <Animated.View key={`${position.substring(2)}_456`} {...viewProps}>
                      <View style={{ alignItems: 'center' }}>
                        <View style={Styles.emptyPlayer} />
                        <TextC>{position.substring(2)}</TextC>
                      </View>
                    </Animated.View>
                  )
                }}
              </Droppable>
            )}
          </React.Fragment>
        ))}
      </>
    )
  }

  const generateRows = (team, teamName) => {
    return (
      <>
        {Object.keys(team).map(line => {
          if (line < 4) {
            return (
              <View
                key={`${line}_123`}
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                {Object.keys(team[line]).map(position => (
                  <React.Fragment key={`${position}_123`}>
                    {cleanField(team, teamName, line, position) && team[line][position].filled ? (
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                          onPress={() => {
                            if (admin) {
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
                            }
                          }}
                        >
                          <AvatarWithPicker
                            key={`${position}_droppable_123`}
                            rounded
                            containerStyle={[
                              Styles.avatar,
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
                        <TextC textAlignVertical="center" style={Styles.avatarText}>
                          {team[line][position].name}
                        </TextC>
                      </View>
                    ) : (
                      <Droppable
                        key={`${position}_droppable`}
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
                            <Animated.View key={`${position.substring(2)}_654`} {...viewProps}>
                              <View style={{ alignItems: 'center' }}>
                                <View style={Styles.emptyPlayer} />
                                <TextC>{position.substring(2)}</TextC>
                              </View>
                            </Animated.View>
                          )
                        }}
                      </Droppable>
                    )}
                  </React.Fragment>
                ))}
              </View>
            )
          }
        })}
      </>
    )
  }

  const resetActive = () => {
    const playersCopy = [...match.players]
    playersCopy.forEach(p => {
      p.active = false
    })
    setMatch({ ...match, players: playersCopy })
  }

  useEffect(() => {
    if (match) {
      setAdmins(match.admins)
      setSelectedPlayers(match.players)
    }
  }, [match])

  useEffect(() => {
    const matchSelected = props.navigation.getParam('match')
    setMatch(matchSelected)
  }, [])

  useEffect(() => {
    setPlayersContainer(selectedPlayers.filter(p => !p.dragged))
  }, [selectedPlayers])

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
          mode={mode}
          playersList={match && (mode === 'admin' || mode === 'players') ? match.players : []}
          removableSelection={false}
          handlePlayerSelection={players => {
            selector(players)
            setActiveModal(false)
          }}
        />
      </Modal>
      {admin && (
        <FloatingButton
          page="NewMatch"
          containerStyle={{ backgroundColor: '#072357' }}
          iconColor="white"
          iconName="user-circle-o"
          iconType="font-awesome"
          handleClick={() => {
            setActiveModal(true)
            setMode('players')
            setSelector(() => setSelectedPlayers)
            setContainer(selectedPlayers)
          }}
        />
      )}
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
                          <Formacion key="teamA_123" team={match.teamA} teamName="teamA" />
                          <Formacion key="teamB_321" team={match.teamB} teamName="teamB" reverse />
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
                          <View style={{ flex: 1 }}>
                            <View>
                              <Section textStyle={{ fontSize: 12 }} title="Banquillo Equipo 1" />
                              <View>
                                <View
                                  style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    flexDirection: 'row',
                                  }}
                                >
                                  {generateBanquillo(match.teamA, 'teamA')}
                                </View>
                              </View>
                            </View>
                          </View>
                          <View style={{ flex: 1 }}>
                            <View>
                              <Section textStyle={{ fontSize: 12 }} title="Banquillo Equipo 2" />
                              <View>
                                <View
                                  style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    flexDirection: 'row',
                                  }}
                                >
                                  {generateBanquillo(match.teamB, 'teamB')}
                                </View>
                              </View>
                            </View>
                          </View>
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
                                      <React.Fragment key={`${player.uid}_draggable`}>
                                        {admin ? (
                                          <Draggable payload={player}>
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
                                          <PlayerDrag
                                            key={`${player.uid}_no_draggable`}
                                            player={player}
                                          />
                                        )}
                                      </React.Fragment>
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
                                    .map(player => (
                                      <PlayerDrag
                                        key={`${player.uid}_no_participate`}
                                        player={player}
                                      />
                                    ))}
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
                      admin && (
                        <TouchableOpacity
                          onPress={() => {
                            resetActive()
                            setSelector(() => setAdmins)
                            setContainer(admins)
                            setMode('admin')
                            setActiveModal(true)
                          }}
                        >
                          <TextC>Añadir</TextC>
                        </TouchableOpacity>
                      )
                    }
                  />
                  <View
                    style={{ paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row' }}
                  >
                    {admins.map(ad => (
                      <AvatarWithPicker
                        key={`${ad.uid}_admin`}
                        containerStyle={{ marginRight: 10 }}
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
                {admin && (
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
                )}
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
