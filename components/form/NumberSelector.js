import React from 'react'
import { TouchableOpacity, StyleSheet, View, Text, TextInput } from 'react-native'

function NumberSelector({ label, addValue, removeValue, value, bgColor, ...rest }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => removeValue(value)}>
          <View
            style={[styles.button, bgColor && { backgroundColor: bgColor, borderColor: bgColor }]}
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
              bgColor && { backgroundColor: bgColor, borderColor: bgColor },
              { borderBottomRightRadius: 50, borderTopRightRadius: 50 },
            ]}
          >
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
    height: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#aaaaaa',
    height: 60,
    marginBottom: 15,
    borderRadius: 50,
  },
  button: {
    padding: 10,
    backgroundColor: '#aaaaaa',
    width: 45,
    alignItems: 'center',
    height: '100%',
  },
  input: {
    padding: 10,
    width: 50,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
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
    marginLeft: 10,
    marginBottom: 0,
    fontSize: 15,
    fontFamily: 'montserrat-regular',
  },
})

export default NumberSelector
