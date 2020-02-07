import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useStateValue } from '../config/User/UserContextManagement'
import { withFirebaseHOC } from '../config/Firebase'
import subscribeUserData from '../hooks/subscribeUserData'
import BlurBackground from '../components/BlurBackground'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontFamily: 'montserrat-light',
    color: 'white',
  },
})

function Home(props) {
  const { loading, user } = subscribeUserData()
  // const [{ session }, dispatch] = useStateValue()

  useEffect(() => {
    props.navigation.setParams({ titulo: 'Alberto Soler', tabBar: false })
  }, [])

  const handleSignout = async () => {
    try {
      await props.firebase.signOut()
      props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={styles.container}>
      <BlurBackground
        blur={2}
        center
        backColor="rgba(63, 63, 63, .6)"
        backgroundUrlOnline="https://i.pinimg.com/originals/35/5e/06/355e06c94e6bf92cbaf0c015edf7eea3.jpg"
      >
        {loading && <ActivityIndicator size="small" color="white" />}
        {user && <Text style={styles.text}>{user.name}</Text>}
        <Button
          title="Nuevo partido"
          onPress={() => props.navigation.navigate('NewMatch')}
          titleStyle={{
            color: 'white',
          }}
          type="clear"
        />
        <Button
          title="Signout"
          onPress={handleSignout}
          titleStyle={{
            color: 'white',
          }}
          type="clear"
        />
      </BlurBackground>
    </View>
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
