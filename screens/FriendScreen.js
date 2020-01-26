import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import RadarChart from '../components/RadarChart'
import { withFirebaseHOC } from '../config/Firebase'
import BlurBackgroundWithAvatar from '../components/BlurBackgroundWithAvatar'
import subscribeUserData from '../hooks/subscribeUserData'
import { POSITIONS, MAIN_FOOT, LABEL_CHART } from '../constants/Player'
import COUNTRIES from '../constants/Countries'
import Stat from '../components/Stat'
import PlayerDetail from '../components/PlayerDetail'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topWrapper: {
    flex: 1,
    width: '100%',
  },
  bottomWrapper: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
})

function FriendScreen(props) {
  const [user, setUser] = useState()

  useEffect(() => {
    const friendUID = props.navigation.getParam('friendUID')
    const getFriendProfile = async uid => {
      await props.firebase.getUserProfile(uid).then(doc => {
        props.navigation.setParams({
          title: doc.data().name,
        })
        setUser(doc.data())
      })
    }
    getFriendProfile(friendUID)
  }, [])

  const getPositon = () => {
    return POSITIONS.find(position => position.value === user.position)
  }

  const getMainFoot = () => {
    return MAIN_FOOT.find(foot => foot.value === user.foot).label
  }

  const getCountryLabel = () => {
    return COUNTRIES.find(country => country.value === user.country).label
  }

  const formatData = user => {
    const data = [
      { x: 'Disparo', y: user.stats.shoot * 10 },
      { x: 'Velocidad', y: user.stats.speed * 10 },
      { x: 'Regate', y: user.stats.dribbling * 10 },
      { x: 'Pase', y: user.stats.pass * 10 },
      { x: 'Fuerza', y: user.stats.strength * 10 },
      { x: 'Resistencia', y: user.stats.resistance * 10 },
    ]

    return data
  }

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        {user && (
          <>
            <BlurBackgroundWithAvatar
              user={user}
              backgroundUrl={
                user.imgProfile ||
                'https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg'
              }
              avatarUrl={
                user.imgProfile ||
                'https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg'
              }
              title={user.name || ''}
              subtitle={user.position ? getPositon().label : ''}
              size="xlarge"
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                  marginTop: 0,
                  background: 'red',
                }}
              >
                <Stat title="Dorsal" stat={user.dorsal || ''} />
                <Stat title="Edad" stat={user.age || ''} />
                <Stat title="Altura" stat={user.height || ''} />
              </View>
            </BlurBackgroundWithAvatar>
          </>
        )}
      </View>
      <View style={styles.bottomWrapper}>
        <ScrollView>
          {user && (
            <>
              <PlayerDetail title="Descripción" subtitle={user.description || ''} />
              <PlayerDetail title="Nacionalidad" subtitle={user.country ? getCountryLabel() : ''} />
              <PlayerDetail title="Pie" subtitle={user.foot ? getMainFoot() : ''} />
              {user.stats && <RadarChart labels={LABEL_CHART} data={formatData(user)} />}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  )
}

const extendedComponent = withFirebaseHOC(FriendScreen)

extendedComponent.navigationOptions = props => {
  return {
    title: props.navigation.getParam('title'),
    headerTitleStyle: {
      color: 'black',
      fontSize: 20,
    },
  }
}

export default extendedComponent
