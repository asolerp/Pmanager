import React from 'react'
import { Button } from 'react-native-elements'

const FormButton = ({ title, buttonType, style, buttonColor, ...rest }) => (
  <Button
    type={buttonType}
    title={title}
    buttonStyle={[style]}
    loadingProps={{ color: 'black' }}
    titleStyle={{ color: 'black', fontFamily: 'montserrat-regular', fontSize: 20 }}
    {...rest}
  />
)

export default FormButton
