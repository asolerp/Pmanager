import React, { useEffect } from 'react'
import {
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Button, Icon } from 'react-native-elements'
import axios from 'axios'
import { useStateValue } from '../config/User/UserContextManagement'
import { withFirebaseHOC } from '../config/Firebase'
import subscribeUserData from '../hooks/subscribeUserData'
import subscribePlayerMatches from '../hooks/subscribePlayerMatches'
import StatsDetail from '../components/StatsDetail'
import PositionLabel from '../components/PositionLabel'
import { getLabelPostionByValue } from '../constants/Player'
import PageBlank from '../components/PageBlank'
import AvatarWithPicker from '../components/Avatar'
import MatchCard from '../components/MatchCard'
import NOTIFICATIONS_TYPE from '../constants/Notifications'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  positionLabelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 30,
    fontFamily: 'montserrat-light',
    color: 'black',
  },
})

function Home(props) {
  const { loading, user } = subscribeUserData()
  const { matches } = subscribePlayerMatches()
  // const [{ session }, dispatch] = useStateValue()

  useEffect(() => {}, [])

  useEffect(() => {
    const getPlayerMatches = async userUID => {
      const arrayOfMatches = await props.firebase.getPlayerMatches(userUID)
      arrayOfMatches.forEach(match => console.log('Partido', match.data()))
    }
    props.navigation.setParams({ titulo: 'Alberto Soler', tabBar: false })
    // if (user) {
    //   getPlayerMatches(user.uid)
    // }
  }, [user])

  const sendNotification = async (u, matchUID) => {
    await axios({
      method: 'post',
      url: 'https://us-central1-panamafc-81bc0.cloudfunctions.net/sendPushNotification',
      data: {
        from: u.name,
        senderUID: u.uid,
        matchUID,
        notification: NOTIFICATIONS_TYPE.PARTICIPATION_UPDATE,
      },
    })
  }

  const handleSignout = async () => {
    try {
      await props.firebase.signOut()
      props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <PageBlank
        title="PANAMA MANAGER"
        titleColor="white"
        sizeTopContainer="big"
        topContainerColor="#072357"
        backgroundColorChildren="#f2f2f2"
        iconColor="black"
        leftSide={() => (
          <TouchableOpacity onPress={() => props.navigation.navigate('NewMatch')}>
            <Icon name="futbol-o" type="font-awesome" color="white" size={30} />
          </TouchableOpacity>
        )}
        rightSide={() => (
          <AvatarWithPicker
            rounded
            containerStyle={styles.avatar}
            imageUrl={user && user.imgProfile}
            size="small"
            source={{
              uri: user && user.imgProfile,
            }}
          />
        )}
      >
        {loading && <ActivityIndicator size="small" color="black" />}
        <View>
          <Button
            title="Nuevo partido"
            titleStyle={{
              color: 'black',
            }}
            type="clear"
          />
          <Button
            title="Signout"
            onPress={handleSignout}
            titleStyle={{
              color: 'black',
            }}
            type="clear"
          />
        </View>
      </PageBlank>
      <View style={{ position: 'absolute', top: 0, width: '100%', zIndex: 2, height: '100%' }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ width: '100%' }}>
          <View style={{ paddingHorizontal: 10, height: '100%' }}>
            {matches &&
              matches.map((match, i) => (
                <MatchCard
                  key={match.uid}
                  element={i}
                  match={match}
                  userUID={user.uid}
                  assist={() => {
                    props.firebase.updatePlayerParticipation(match, user, true)
                    sendNotification(user, match.uid)
                  }}
                  noassist={() => {
                    props.firebase.updatePlayerParticipation(match, user, false)
                    sendNotification(user, match.uid)
                  }}
                />
                // <View style={{ width: '100%' }}>
                //   <Text style={{ textAlign: 'center', fontSize: 20, color: 'black', marginBottom: 15 }}>
                //     {match.name}
                //   </Text>
                //   <View>
                //     {match.players &&
                //       match.players.map(player => (
                //         <ListItem
                //           title={player.name}
                //           titleStyle={{ fontSize: 15 }}
                //           subtitle={
                //             <View style={styles.positionLabelContainer}>
                //               <PositionLabel
                //                 position={getLabelPostionByValue(player.principalPosition)}
                //               />
                //             </View>
                //           }
                //           rightElement={
                //             <View
                //               style={{
                //                 flex: 1,
                //                 flexGrow: 4,
                //                 flexDirection: 'row',
                //                 justifyContent: 'space-between',
                //                 alignContent: 'center',
                //                 alignItems: 'center',
                //               }}
                //             >
                //               <StatsDetail stats={player.stats} />
                //               <CheckBox
                //                 checked={match.participation[player.uid]}
                //                 // onPress={() => handlePress(item)}
                //                 checkedColor="black"
                //               />
                //             </View>
                //           }
                //           leftAvatar={{ source: { uri: player.imgProfile } }}
                //           bottomDivider
                //         />
                //       ))}
                //   </View>
                //   <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                //     <TouchableOpacity
                //       onPress={() => props.firebase.updatePlayerParticipation2(match, user, true)}
                //     >
                //       <Text style={{ color: 'black', fontSize: 20 }}>Asistir</Text>
                //     </TouchableOpacity>
                //     <TouchableOpacity
                //       onPress={() => props.firebase.updatePlayerParticipation2(match, user, false)}
                //     >
                //       <Text style={{ color: 'black', fontSize: 20 }}>No Asistir</Text>
                //     </TouchableOpacity>
                //   </View>
                // </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </>
  )
}

const HomeWithHOC = withFirebaseHOC(Home)

HomeWithHOC.navigationOptions = ({ navigation }) => {
  if (navigation.getParam('showHeader')) {
    return {
      title: navigation.getParam('titulo'),
      headerStyle: {
        backgroundColor: '#f4511e',
      },
    }
  }
  return {
    header: null,
    tabBarVisible: false,
  }
}

export default HomeWithHOC
