import React, { useEffect } from 'react'
import { ScrollView, ActivityIndicator, TouchableHighlight, StyleSheet, View } from 'react-native'
import axios from 'axios'
import { withFirebaseHOC } from '../config/Firebase'
import subscribeUserData from '../hooks/subscribeUserData'
import subscribePlayerMatches from '../hooks/subscribePlayerMatches'
import PageBlank from '../components/PageBlank'
import AvatarWithPicker from '../components/Avatar/Avatar'
import MatchCard from '../components/MatchCard/MatchCard'
import NOTIFICATIONS_TYPE from '../constants/Notifications'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import Section from '../components/Form/SectionTitle'
import FinishedMatchCard from '../components/FinshedMatchCard/FinishedMatchCard'

const moment = require('moment')

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
    props.navigation.setParams({ titulo: 'Alberto Soler', tabBar: false })
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
      <FloatingButton
        page="NewMatch"
        containerStyle={{ backgroundColor: '#072357' }}
        iconColor="white"
        iconName="futbol-o"
        iconType="font-awesome"
      />
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
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ width: '100%', height: '100%' }}>
          <View style={{ paddingHorizontal: 10, height: '100%' }}>
            {matches &&
              matches
                .sort((a, b) => (moment(a.date) > moment(b.date) ? 1 : -1))
                .filter(m => moment(m.date) > moment(new Date()))
                .map((match, i) => (
                  <TouchableHighlight
                    key={i}
                    onPress={() => props.navigation.navigate('MatchPage', { match })}
                  >
                    <MatchCard
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
            {matches && matches.filter(m => moment(m.date) < moment(new Date())).length > 0 && (
              <Section
                textStyle={{ fontSize: 12, textAlign: 'center', color: 'white' }}
                customStyle={{
                  backgroundColor: '#CC1034',
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 5,
                }}
                title="Finalizados"
              />
            )}
            {matches &&
              matches
                .sort((a, b) => (moment(a.date) > moment(b.date) ? 1 : -1))
                .filter(m => moment(m.date) < moment(new Date()))
                .map((match, i) => (
                  <TouchableHighlight
                    key={i}
                    onPress={() => props.navigation.navigate('MatchPage', { match })}
                  >
                    <FinishedMatchCard match={match} />
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
