/* eslint react/prop-types: 0 */

import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'colum',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 20,
    flex: 0.7,
    borderRadius: 50,
    height: 50,
    fontFamily: 'montserrat-regular',
    width: '100%',
  },
  labelWrapper: {
    flex: 0.3,
    height: '100%',
    backgroundColor: '#22508F',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '400',
    color: 'white',
    marginLeft: 10,
    marginBottom: 0,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'montserrat-regular',
  },
})

const FormInputS = ({
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
    {label && (
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>{label}</Text>
      </View>
    )}
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

export default FormInputS
