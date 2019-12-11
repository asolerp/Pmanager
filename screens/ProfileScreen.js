import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import RadarChart from '../components/RadarChart'
import { withFirebaseHOC } from '../config/Firebase'
import BlurBackgroundWithAvatar from '../components/BlurBackgroundWithAvatar'
import useUser from '../hooks/useUser'
import { POSITIONS, MAIN_FOOT, LABEL_CHART } from '../constants/Player'
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

function Profile(props) {
  useEffect(() => {
    console.log('hola')
  }, [])

  const { error, loading, user } = useUser(props.firebase.currentUser().uid)

  const getPositon = () => {
    return POSITIONS.find(position => position.value === user.data().position)
  }

  const getMainFoot = () => {
    return MAIN_FOOT.find(foot => foot.value === user.data().foot)
  }

  const formatDat(user) {
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        {user && (
          <>
            <BlurBackgroundWithAvatar
              backgroundUrl={user.data().imgProfile}
              avatarUrl={user.data().imgProfile}
              title={user.data().name}
              subtitle={getPositon().label}
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
                <Stat title="Dorsal" stat={user.data().dorsal} />
                <Stat title="Edad" stat={user.data().age} />
                <Stat title="Altura" stat={user.data().height} />
              </View>
            </BlurBackgroundWithAvatar>
          </>
        )}
      </View>
      <View style={styles.bottomWrapper}>
        {user && (
          <>
            <PlayerDetail title="Descripción" subtitle={user.data().description} />
            <RadarChart 
            labels={LABEL_CHART} 
            data={formatData(user.data())}
            />
            <Button
              onPress={() => props.navigation.navigate('ProfileForm')}
              title="Editar Perfil"
              type="outline"
            />
          </>
        )}
      </View>
    </View>
  )
}

const extendedComponent = withFirebaseHOC(Profile)

extendedComponent.navigationOptions = {
  header: null,
}
export default extendedComponent
