import React, { useEffect } from 'react'
import { ActivityIndicator, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { Button, CheckBox, ListItem } from 'react-native-elements'
import { useStateValue } from '../config/User/UserContextManagement'
import { withFirebaseHOC } from '../config/Firebase'
import subscribeUserData from '../hooks/subscribeUserData'
import subscribePlayerMatches from '../hooks/subscribePlayerMatches'
import StatsDetail from '../components/StatsDetail'
import PositionLabel from '../components/PositionLabel'
import { getLabelPostionByValue } from '../constants/Player'
import PageBlank from '../components/PageBlank'
import AvatarWithPicker from '../components/Avatar'

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

  const handleSignout = async () => {
    try {
      await props.firebase.signOut()
      props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <PageBlank
      title="PANAMA MANAGER"
      titleColor="black"
      iconColor="black"
      leftSide={() => <></>}
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
      {matches &&
        matches.map(match => (
          <View style={{ width: '100%' }}>
            <Text style={{ textAlign: 'center', fontSize: 30, color: 'black', marginBottom: 15 }}>
              {match.name}
            </Text>
            <View style={{ height: 300 }}>
              {match.players &&
                match.players.map(player => (
                  <ListItem
                    title={player.name}
                    titleStyle={{ fontSize: 15 }}
                    subtitle={
                      <View style={styles.positionLabelContainer}>
                        <PositionLabel
                          position={getLabelPostionByValue(player.principalPosition)}
                        />
                      </View>
                    }
                    rightElement={
                      <View
                        style={{
                          flex: 1,
                          flexGrow: 4,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <StatsDetail stats={player.stats} />
                        <CheckBox
                          checked={player.assistance}
                          // onPress={() => handlePress(item)}
                          checkedColor="black"
                        />
                      </View>
                    }
                    leftAvatar={{ source: { uri: player.imgProfile } }}
                    bottomDivider
                  />
                ))}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity
                onPress={() => props.firebase.updatePlayerParticipation2(match, user, true)}
              >
                <Text style={{ color: 'black', fontSize: 20 }}>Asistir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.firebase.updatePlayerParticipation2(match, user, false)}
              >
                <Text style={{ color: 'black', fontSize: 20 }}>No Asistir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      <View>
        <Button
          title="Nuevo partido"
          onPress={() => props.navigation.navigate('NewMatch')}
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
