/* eslint react/prop-types: 0 */

import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  label,
  value,
  ...rest
}) => (
  <View style={styles.inputWrapper}>
    {value.length < 20 && <Text style={styles.label}>{label}</Text>}
    <TextInput
      style={styles.input}
      placeholderTextColor="grey"
      textAlign="right"
      name={name}
      placeholder={placeholder}
      value={value}
      {...rest}
    />
  </View>
)

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#aaaaaa',
    padding: 5,
  },
  inputStyle: {
    borderBottomWidth: 0,
  },
  input: {
    fontSize: 15,
    marginRight: 10,
    height: 50,
    padding: 0,
    fontFamily: 'montserrat-regular',
    width: '100%',
    color: 'black',
    flex: 1,
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

export default FormInput
