import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { withFirebaseHOC } from '../config/Firebase'
import BlurBackgroundWithAvatar from '../components/BlurBackground/BlurBackgroundWithAvatar'
import { POSITIONS, MAIN_FOOT } from '../constants/Player'
import COUNTRIES from '../constants/Countries'
import Stat from '../components/Stat'
import PlayerDetail from '../components/PlayerDetail'
import PageBlank from '../components/PageBlank'
import TShirt from '../components/Form/TShirt'
import ChipSelector from '../components/Form/ChipSelector'
import Section from '../components/Form/SectionTitle'

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

  return (
    <PageBlank title={user && user.name} titleColor="black" iconColor="black">
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
        <Section title="Datos personales" />
        <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
          <View style={{ flex: 1 }}>
            <PlayerDetail title="Descripción" subtitle={user.description || ''} />
            <PlayerDetail title="Nacionalidad" subtitle={user.country ? getCountryLabel() : ''} />
            <PlayerDetail title="Pie" subtitle={user.foot ? getMainFoot() : ''} />
            <PlayerDetail title="Posiciones">
              <ChipSelector
                values={user.positions.filter(p => p.active)}
                customStyle={{ fontSize: 10 }}
                markPrincipal
                principal={user.principalPosition}
              />
            </PlayerDetail>
          </View>
          <View style={{ flex: 1 }}>
            <TShirt name={user.name} dorsal={user.dorsal} />
          </View>
        </View>
      </View>
    </PageBlank>
  )
}

const extendedComponent = withFirebaseHOC(FriendScreen)

extendedComponent.navigationOptions = props => {
  return {
    header: null,
    tabBarVisible: false,
  }
}

export default extendedComponent
