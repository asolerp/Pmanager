import React from 'react'
import { View, Text } from 'react-native'
import RadioForm from 'react-native-simple-radio-button'

function RadioSelector(props) {
  return (
    <View>
      <RadioForm
        radio_props={radio_props}
        initial={0}
        onPress={value => {
          this.setState({ value })
        }}
      />
    </View>
  )
}

export default RadioSelector
