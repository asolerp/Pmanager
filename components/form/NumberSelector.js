import React from 'react'
import { TouchableOpacity, StyleSheet, View, Text, TextInput } from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#aaaaaa',
  },
  button: {
    padding: 5,
    backgroundColor: '#aaaaaa',
    alignItems: 'center',
    borderWidth: 1,
  },
  leftButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingLeft: 9,
    paddingRight: 8,
  },
  rightButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  input: {
    padding: 5,
    width: 50,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 15,
    color: 'black',
    fontFamily: 'montserrat-regular',
    marginBottom: 10,
  },
})

function NumberSelector({ label, addValue, removeValue, value, bgColor, ...rest }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => removeValue(value)}>
          <View
            style={[
              styles.button,
              styles.leftButton,
              bgColor && { backgroundColor: bgColor, borderColor: bgColor },
            ]}
          >
            <Text style={styles.symbol}>-</Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.input, bgColor && { borderColor: bgColor }]}>
          <TextInput
            style={styles.number}
            keyboardType="numeric"
            textAlign="center"
            value={value}
            {...rest}
          />
        </View>
        <TouchableOpacity onPress={() => addValue(value)}>
          <View
            style={[
              styles.button,
              styles.rightButton,
              bgColor && { backgroundColor: bgColor, borderColor: bgColor },
            ]}
          >
            <Text style={styles.symbol}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default NumberSelector
