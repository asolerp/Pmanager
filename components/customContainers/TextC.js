import React from 'react'
import { Text } from 'react-native'

const TextC = ({ style, children, ...rest }) => {
  return (
    <Text style={[style, { fontFamily: 'montserrat-regular' }]} {...rest}>
      {children}
    </Text>
  )
}

export default TextC
