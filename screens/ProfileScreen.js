import React from 'react'
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
    flex: 2,
    width: '100%',
    padding: 10,
  },
})

function Profile(props) {
  const { loading, user } = subscribeUserData()

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
              backgroundUrl={user.imgProfile}
              editableUser
              avatarUrl={user.imgProfile}
              title={user.name}
              subtitle={getPositon().label}
              size="xlarge"
            />
          </>
        )}
      </View>
      <View style={styles.bottomWrapper}>
        <ScrollView>
          {user && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                  marginTop: 0,
                  background: 'red',
                }}
              >
                <Stat title="Dorsal" stat={user.dorsal} />
                <Stat title="Edad" stat={user.age} />
                <Stat title="Altura" stat={user.height} />
              </View>
              <PlayerDetail title="Descripción" subtitle={user.description} />
              <PlayerDetail title="Nacionalidad" subtitle={getCountryLabel()} />
              <PlayerDetail title="Pie" subtitle={getMainFoot()} />
              <RadarChart labels={LABEL_CHART} data={formatData(user)} />
            </>
          )}
        </ScrollView>
      </View>
    </View>
  )
}

const extendedComponent = withFirebaseHOC(Profile)

extendedComponent.navigationOptions = {
  header: null,
}
export default extendedComponent
