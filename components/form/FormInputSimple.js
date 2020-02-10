import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

const FormInputSimple = ({
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
    {label && <Text style={[styles.label, { color }]}>{label}</Text>}
    <TextInput
      style={[styles.input, { color }]}
      placeholderTextColor="#aaaaaa"
      name={name}
      placeholder={placeholder}
      value={value}
      {...rest}
    />
  </View>
)

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#aaaaaa',
    padding: 5,
    paddingLeft: 10,
    fontFamily: 'montserrat-regular',
    fontSize: 15,
    fontWeight: '400',
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'montserrat-regular',
    marginBottom: 10,
  },
})

export default FormInputSimple
