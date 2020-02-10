import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import DatePicker from 'react-native-datepicker'

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 50,
    marginBottom: 15,
    flex: 1,
  },
  inputWrapper: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#aaaaaa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    height: 40,
  },
  labelWrapper: {},
  label: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'montserrat-regular',
    marginBottom: 10,
  },
  iconSyle: {
    justifyContent: 'center',
  },
})

const DatePickerCustom = ({
  label,
  color = 'black',
  format = 'DD-MM-YYYY',
  style,
  onValueChange,
  ...rest
}) => {
  return (
    <View style={[{ marginRight: 15 }, style]}>
      {label && <Text style={[styles.label, { color }]}>{label}</Text>}
      <DatePicker
        showIcon={false}
        placeholder="select date"
        format={format}
        minDate={new Date()}
        maxDate="01-01-2040"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        customStyles={{
          dateInput: {
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#aaaaaa',
            padding: 5,
          },
        }}
        onDateChange={d => {
          onValueChange(d)
        }}
        {...rest}
      />
    </View>
  )
}

export default DatePickerCustom
