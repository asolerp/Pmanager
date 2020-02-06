import React, { useState } from 'react'
// import RNPickerSelect from 'react-native-picker-select'
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

const FormSelect = ({ values, label, iconName, iconSize, iconColor, ...rest }) => {
  const [language, setLanguage] = useState()

  return (
    <View style={styles.wrapper}>
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Picker
          selectedValue={language}
          style={{ height: 50, width: '100%', borderWidth: 1, borderColor: 'black' }}
          onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
          itemTextStyle={{ color: 'red' }}
          textStyle={{ color: 'red' }}
        >
          {values.map(value => (
            <Picker.Item label={value.label} value={value.value} />
          ))}
        </Picker>
        {/* <RNPickerSelect
          style={{
            ...styles.inputStyle,
            iconContainer: {
              top: 20,
              right: 10,
            },
            placeholder: {
              color: 'white',
              fontSize: 15,
              fontFamily: 'montserrat-regular',
            },
          }}
          items={values}
          {...rest}
        /> */}
      </View>
    </View>
  )
}

export default FormSelect
