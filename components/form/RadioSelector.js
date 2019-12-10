import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import RadioForm from 'react-native-simple-radio-button'

function RadioSelector(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Hola</Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <RadioForm
          radio_props={props.values}
          initial={0}
          formHorizontal
          labelHorizontal={false}
          wrapStyle={{ alignItems: 'center' }}
          buttonColor="#B6B6B6"
          labelColor="#B6B6B6"
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            alignContent: 'center',
            marginTop: 5,
          }}
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
    borderWidth: 1,
    borderColor: '#aaaaaa',
  },
  label: {
    fontWeight: '400',
    color: '#B6B6B6',
    marginLeft: 10,
    marginBottom: 0,
    fontSize: 15,
    fontFamily: 'montserrat-regular',
  },
})

export default RadioSelector
