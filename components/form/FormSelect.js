import React from 'react'
import { StyleSheet, Picker, View, Text } from 'react-native'

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

const FormSelect = ({ value, values, label, iconName, iconSize, iconColor, ...rest }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Picker
          selectedValue={value}
          style={{ height: 50, width: '100%', borderWidth: 1, borderColor: 'black' }}
          itemTextStyle={{ color: 'red' }}
          textStyle={{ color: 'red' }}
          {...rest}
        >
          {values.map(v => (
            <Picker.Item key={v.value} label={v.label} value={v.value} />
          ))}
        </Picker>
      </View>
    </View>
  )
}

export default FormSelect
