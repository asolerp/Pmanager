import React from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: '#aaaaaa',
    borderRadius: 50,
    marginBottom: 15,
    height: 60,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    flex: 0.7,
  },
  inputStyle: {
    fontSize: 16,
    borderWidth: 0.5,
    color: 'black',
    paddingRight: 30,
  },
  labelWrapper: {
    flex: 0.3,
    backgroundColor: '#22508F',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '400',
    color: 'white',
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
      <View style={styles.labelWrapper}>
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
              color: 'white',
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
