import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import RadioForm from 'react-native-simple-radio-button'

function RadioSelector(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <RadioForm
          radio_props={props.values}
          initial={props.index !== -1 ? props.index : 0}
          formHorizontal
          labelHorizontal={false}
          wrapStyle={{ alignItems: 'center' }}
          buttonColor="#00508F"
          labelColor="#00508F"
          selectedButtonColor="#00508F"
          onPress={value => props.selectedOption(value)}
          style={styles.radioButton}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontWeight: '400',
    color: '#B6B6B6',
    marginLeft: 10,
    marginBottom: 0,
    fontSize: 15,
    fontFamily: 'montserrat-regular',
  },
  radioButton: {
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 5,
    paddingRight: 5,
  },
})

export default RadioSelector
