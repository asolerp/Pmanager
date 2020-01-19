import React from 'react'
import { Button } from 'react-native-elements'

const FormButton = ({ title, buttonType, buttonColor, ...rest }) => (
  <Button
    type={buttonType}
    title={title}
    buttonStyle={{
      borderColor: buttonColor,
      borderWidth: 1,
      borderRadius: 50,
      height: 50,
      backgroundColor: buttonColor,
    }}
    titleStyle={{ color: 'white', fontFamily: 'montserrat-light', fontSize: 20 }}
    {...rest}
  />
)

export default FormButton
