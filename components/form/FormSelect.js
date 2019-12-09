import React from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { Ionicons } from '@expo/vector-icons'
import { Platform, StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: '#aaaaaa',
    padding: 10,
    marginBottom: 15,
    height: 50,
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    alignItems: 'center',
    flex: 0.4,
    height: 50,
  },
  inputStyle: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    height: 50,
  },
  label: {
    fontWeight: '400',
    color: '#B6B6B6',
    marginLeft: 10,
    marginBottom: 0,
    fontSize: 15,
    fontFamily: 'montserrat-regular',
  },
  iconSyle: {
    justifyContent: 'center',
  },
})

const FormSelect = ({ values, label, iconName, iconSize, iconColor, ...rest }) => {
  return (
    <View style={styles.wrapper}>
      <View style={{ flex: 0.6 }}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.inputWrapper}>
        <RNPickerSelect
          style={{
            ...styles.inputStyle,
            iconContainer: {
              top: 20,
              right: 10,
            },
            placeholder: {
              color: 'black',
              fontSize: 15,
              fontFamily: 'montserrat-regular',
            },
          }}
          items={values}
          {...rest}
        />
      </View>
    </View>
    // <View style={styles.wrapper}>
    //   <View style={styles.inputWrapper}>
    //     <Text style={styles.label}>{label}</Text>
    //     <RNPickerSelect
    //       style={{
    //         ...styles.inputStyle,
    //         iconContainer: {
    //           top: 20,
    //           right: 10,
    //         },
    //         placeholder: {
    //           color: 'black',
    //           fontSize: 15,
    //           fontFamily: 'montserrat-regular',
    //         },
    //       }}
    //       items={values}
    //       {...rest}
    //     />
    //   </View>
    //   {Platform.ios &&
    //     'ios'(
    //       <View style={styles.iconSyle}>
    //         <Ionicons name={iconName} size={Number(iconSize)} color={iconColor} />
    //       </View>
    //     )}
    // </View>
  )
}

export default FormSelect
