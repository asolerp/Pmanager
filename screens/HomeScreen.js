import React, { useEffect } from 'react'
import {
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
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
  newMatchButton: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 50,
    right: 10,
    backgroundColor: 'black',
    borderRadius: 100,
    justifyContent: 'center',
    alignContent: 'center',
    shadowColor: '#aaaaaa',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    zIndex: 5,
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
    console.log(JSON.stringify(user))
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
  return (
    <>
      <View style={styles.newMatchButton}>
        <TouchableOpacity onPress={() => props.navigation.navigate('NewMatch')}>
          <Icon name="futbol-o" type="font-awesome" color="white" size={30} />
        </TouchableOpacity>
      </View>
      <PageBlank
        title="PANAMA MANAGER"
        titleColor="white"
        sizeTopContainer="big"
        topContainerColor="#072357"
        backgroundColorChildren="#f2f2f2"
        iconColor="black"
        leftSide={() => <></>}
        // leftSide={() => (
        //   <TouchableOpacity onPress={() => props.navigation.navigate('NewMatch')}>
        //     <Icon name="futbol-o" type="font-awesome" color="white" size={30} />
        //   </TouchableOpacity>
        // )}
        rightSide={() => (
          <AvatarWithPicker
            rounded
            containerStyle={styles.avatar}
            imageUrl={user && user.imgProfile}
            size="medium"
            source={{
              uri: user && user.imgProfile,
            }}
          />
        )}
      >
        {loading && <ActivityIndicator size="small" color="black" />}
      </PageBlank>
      <View style={{ position: 'absolute', top: 20, width: '100%', zIndex: 2, height: '100%' }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ width: '100%' }}>
          <View style={{ paddingHorizontal: 10, height: '100%' }}>
            {matches &&
              matches.map((match, i) => (
                <TouchableHighlight
                  onPress={() => props.navigation.navigate('MatchPage', { match })}
                >
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
                </TouchableHighlight>
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
