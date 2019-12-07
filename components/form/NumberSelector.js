import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Text, TextInput, Alert } from 'react-native'

function NumberSelector({ label, addValue, removeValue, value, ...rest }) {
  // const addValue = () => {
  //   setValue(String(Number(value) + 1))
  // }

  // const removeValue = () => {
  //   if (Number(value) > 0) {
  //     setValue(String(Number(value) - 1))
  //   }
  // }

  // const changeNumber = number => {
  //   if (Number(number) > 0) {
  //     setValue(String(number))
  //   }
  //   if (!number) {
  //     setValue('0')
  //   }
  // }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={removeValue}>
          <View style={styles.button}>
            <Text style={styles.symbol}>-</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.input}>
          <TextInput style={styles.number} keyboardType="numeric" value={value} {...rest} />
        </View>
        <TouchableOpacity onPress={value => addValue(value)}>
          <View style={styles.button}>
            <Text style={styles.symbol}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  button: {
    padding: 10,
    backgroundColor: '#aaaaaa',
    width: 35,
    alignItems: 'center',
    borderColor: '#aaaaaa',
    borderWidth: 1,
  },
  input: {
    padding: 10,
    width: 50,
    alignItems: 'center',
    borderColor: '#aaaaaa',
    borderWidth: 1,
  },
  number: {
    fontSize: 15,
    fontFamily: 'montserrat-regular',
  },
  symbol: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: '400',
    color: '#B6B6B6',
    marginBottom: 0,
    fontSize: 15,
    fontFamily: 'montserrat-regular',
  },
})

export default NumberSelector
