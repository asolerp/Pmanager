import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'
import BlurBackgroundWithAvatar from '../components/BlurBackground/BlurBackgroundWithAvatar'
import subscribeUserData from '../hooks/subscribeUserData'
import { POSITIONS, MAIN_FOOT } from '../constants/Player'
import COUNTRIES from '../constants/Countries'
import Stat from '../components/Stat'
import PlayerDetail from '../components/PlayerDetail'
import Section from '../components/Form/SectionTitle'
import TShirt from '../components/Form/TShirt'
import ChipSelector from '../components/Form/ChipSelector'

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

  const handleSignout = async () => {
    try {
      await props.firebase.signOut()
      props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
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
              editableUser
              avatarUrl={
                user.imgProfile ||
                'https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg'
              }
              title={user.name || ''}
              subtitle={user.position ? getPositon().label : ''}
              size="xlarge"
            />
          </>
        )}
      </View>
      <View style={styles.bottomWrapper}>
        <ScrollView>
          {user && (
            <>
              <Section title="Características jugador" />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                  marginTop: 0,
                  background: 'red',
                }}
              >
                <Stat title="Edad" stat={user.age || ''} />
                <Stat title="Altura" stat={user.height || ''} />
                <Stat title="Peso" stat={user.weight || ''} />
              </View>
              <Section title="Datos personales" />
              <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                <View style={{ flex: 1 }}>
                  <PlayerDetail title="Descripción" subtitle={user.description || ''} />
                  <PlayerDetail
                    title="Nacionalidad"
                    subtitle={user.country ? getCountryLabel() : ''}
                  />
                  <PlayerDetail title="Pie" subtitle={user.foot ? getMainFoot() : ''} />
                  {user.positions && (
                    <PlayerDetail title="Posiciones">
                      <ChipSelector
                        values={user.positions.filter(p => p.active)}
                        customStyle={{ fontSize: 10 }}
                        markPrincipal
                        principal={user.principalPosition}
                      />
                    </PlayerDetail>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <TShirt name={user.name || 'Nombre'} dorsal={user.dorsal || 0} />
                </View>
              </View>
              <Section title="Habilidad" />
              <Button
                title="Signout"
                onPress={handleSignout}
                titleStyle={{
                  color: 'black',
                }}
                type="clear"
              />
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
