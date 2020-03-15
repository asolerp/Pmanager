/* eslint react/prop-types: 0 */

import React from 'react'
import { View, Text, TextInput } from 'react-native'

// Styles
import Styles from './Styles'

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
  <View style={[Styles.inputWrapper, style]}>
    {label && (
      <View style={Styles.labelWrapper}>
        <Text style={Styles.label}>{label}</Text>
      </View>
    )}
    <TextInput
      style={[Styles.input, { color }]}
      placeholderTextColor={color}
      name={name}
      placeholder={placeholder}
      value={value}
      {...rest}
    />
  </View>
)

export default FormInput
