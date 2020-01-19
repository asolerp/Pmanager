import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'
import BlurBackgroundWithAvatar from '../components/BlurBackgroundWithAvatar'
import subscribeUserData from '../hooks/subscribeUserData'
import { POSITIONS, MAIN_FOOT } from '../constants/Player'
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
  const { loading, user } = subscribeUserData()

  const getPositon = () => {
    return POSITIONS.find(position => position.value === user.position)
  }

  const getMainFoot = () => {
    return MAIN_FOOT.find(foot => foot.value === user.foot)
  }

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        {user && (
          <>
            <BlurBackgroundWithAvatar
              backgroundUrl={user.imgProfile}
              avatarUrl={user.imgProfile}
              title={user.name}
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
                <Stat title="Dorsal" stat={user.dorsal} />
                <Stat title="Edad" stat={user.age} />
                <Stat title="Altura" stat={user.height} />
              </View>
            </BlurBackgroundWithAvatar>
          </>
        )}
      </View>
      <View style={styles.bottomWrapper}>
        {user && (
          <>
            <PlayerDetail title="Descripción" subtitle={user.description} />
            <PlayerDetail title="Descripción" subtitle={user.description} />
            <Button
              onPress={() => props.navigation.navigate('ProfileForm')}
              title="Editar Perfil"
              type="outline"
            />
          </>
        )}
      </View>
      {/* <View style={styles.bottomWrapper}>
        </View> */}
    </View>
  )
}

const extendedComponent = withFirebaseHOC(Profile)

extendedComponent.navigationOptions = {
  header: null,
}
export default extendedComponent
