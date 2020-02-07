import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Image } from 'react-native-elements'
import PanamaLogo from '../assets/images/panama.png'

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  logoContainer: {
    marginBottom: 20,
  },
  leftTitle: {
    color: '#CC1034',
    marginRight: 10,
    fontSize: 60,
    fontWeight: '100',
    fontFamily: 'montserrat-regular',
  },
  rightTitle: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'montserrat-regular',
  },
  subtitle: {
    marginTop: 10,
    color: 'white',
    fontSize: 15,
    fontFamily: 'montserrat-light',
  },
})

const AppLogo = ({ logo }) => (
  <View style={styles.logoContainer}>
    {logo && <Image source={PanamaLogo} style={{ width: 200, height: 300 }} />}

    <View style={styles.titleContainer}>
      <Text style={styles.leftTitle}>Panama</Text>
      <Text style={styles.rightTitle}>Manager</Text>
      <Text style={styles.subtitle}>Tu aplicacion para organizar tus partidos</Text>
    </View>
  </View>
)

export default AppLogo
