import React from 'react'
import { Button } from 'react-native-elements'

const FormButton = ({ title, buttonType, style, buttonColor = 'black', ...rest }) => (
  <Button
    type={buttonType}
    title={title}
    buttonStyle={[style]}
    loadingProps={{ color: buttonColor }}
    titleStyle={{ color: buttonColor, fontFamily: 'montserrat-regular', fontSize: 20 }}
    {...rest}
  />
)

export default FormButton
