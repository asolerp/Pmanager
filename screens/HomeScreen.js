import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'
import { useStateValue } from '../config/User/UserContextManagement'

function Home(props) {
  const [{ user }, dispatch] = useStateValue()

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
      <Text style={styles.text}>Home</Text>
      <Text style={styles.text}>{user.name}</Text>
      <Button
        title="Signout"
        onPress={handleSignout}
        titleStyle={{
          color: '#F57C00',
        }}
        type="clear"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontFamily: 'montserrat-regular',
  },
})

const HomeWithHOC = withFirebaseHOC(Home)

HomeWithHOC.navigationOptions = ({ navigation }) => {
  console.log('[[PROPS]]', navigation)
  const tabBarVisible = false

  return {
    tabBarVisible: navigation.getParam('tabBar'),
  }
  // if (props.navigation.getParam('showHeader')) {
  //   return {
  //     // title: props.navigation.getParam('titulo'),
  //     // headerStyle: {
  //     //   backgroundColor: '#f4511e',
  //     // },
  //   }
  // }
  // return {
  //   header: null,
  //   tabBarVisible: false,
  // }
}

export default HomeWithHOC
