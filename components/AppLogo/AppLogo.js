import React from 'react'
import { View, Text } from 'react-native'
import { Image } from 'react-native-elements'
import Styles from './Styles'
import PanamaLogo from '../../assets/images/panama.png'

const AppLogo = ({ logo }) => (
  <View style={Styles.logoContainer}>
    {logo && <Image source={PanamaLogo} style={{ width: 200, height: 300 }} />}

    <View style={Styles.titleContainer}>
      <Text style={Styles.leftTitle}>Panama</Text>
      <Text style={Styles.rightTitle}>Manager</Text>
      <Text style={Styles.subtitle}>Tu aplicacion para organizar tus partidos</Text>
    </View>
  </View>
)

export default AppLogo
