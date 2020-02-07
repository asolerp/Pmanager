import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import Images from '../../constants/Images'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dorsalContainer: {
    position: 'absolute',
    top: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  dorsal: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
  },
})

const TShirt = ({ name, dorsal }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 200, resizeMode: 'contain' }}
        source={Images.tShirt.file}
      />
      <View style={styles.dorsalContainer}>
        <Text style={styles.name}>{name.substring(0, 8)}</Text>
        <Text style={styles.dorsal}>{dorsal}</Text>
      </View>
    </View>
  )
}

export default TShirt
