/* eslint react/prop-types: 0 */

import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

const FormInput = ({
  iconName,
  iconColor,
  color = 'white',
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  label,
  value,
  style,
  ...rest
}) => (
  <View style={[styles.inputWrapper, style]}>
    {value.length < 20 && <Text style={styles.label}>{label}</Text>}
    <TextInput
      style={[styles.input, { color }]}
      placeholderTextColor={color}
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#aaaaaa',
  },
  input: {
    fontSize: 20,
    borderRadius: 50,
    height: 50,
    fontFamily: 'montserrat-regular',
    width: '100%',
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
