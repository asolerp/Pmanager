import React from 'react'
import { Dimensions, StyleSheet, View, Text } from 'react-native'
import { Slider } from 'react-native-elements'

const { height } = Dimensions.get('window')

function SliderSelector({ label, selectedOption, value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Slider
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={value}
          style={{ width: '80%' }}
          onValueChange={v => selectedOption(v)}
          thumbTintColor="#aaaaaa"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  slider: {
    position: 'absolute',
    marginTop: height * 0.57,
    width: height * 0.67,
    transform: [{ rotateZ: '-90deg' }],
    marginLeft: 125,
  },
  label: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'montserrat-regular',
    marginBottom: 10,
  },
  radioButton: {
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 5,
    paddingRight: 5,
  },
})

export default SliderSelector
