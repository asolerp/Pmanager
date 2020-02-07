import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { HideWithKeyboard } from 'react-native-hide-with-keyboard'
import FormInput from '../components/form/FormInput'
import FormButton from '../components/form/FormButton'
import ErrorMessage from '../components/form/ErrorMessage'
import AppLogo from '../components/AppLogo'
import { withFirebaseHOC } from '../config/Firebase'

import BlurBackground from '../components/BlurBackground'

import Images from '../constants/Images'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Introduce un email válido')
    .required('Introduce una cuenta de email'),
  password: Yup.string()
    .label('Password')
    .required('El password es obligatorio')
    .min(6, 'El password debe tener como mínimo 6 carácteres '),
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  inputsWrapper: {
    width: '100%',
    flexDirection: 'column',
  },
  inputContainer: {
    marginBottom: 10,
  },
  logoContainer: {
    marginBottom: 15,
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  formWrapper: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  signUpText: {
    fontFamily: 'montserrat-light',
    color: 'white',
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
})

function LoginScreen(props) {
  const [loading, setLoading] = useState(false)

  const goToSignup = () => props.navigation.navigate('Signup')

  const handleOnLogin = async (values, actions) => {
    setLoading(true)
    const { email, password } = values
    try {
      const { user } = await props.firebase.loginWithEmail(email, password)
      if (user) {
        await props.firebase.updateLogin(user)
        setLoading(false)
      }
      props.navigation.navigate('App', { userUID: user.uid })
    } catch (error) {
      actions.setFieldError('general', error.message)
      setLoading(false)
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <View style={styles.container}>
      <BlurBackground center backgroundSource={Images.loginScreen.file}>
        <HideWithKeyboard style={styles.logoContainer}>
          <AppLogo logo={false} />
        </HideWithKeyboard>
        <View style={styles.formWrapper}>
          <Formik
            initialValues={{
              email: 'albertosolpal@gmail.com',
              password: '121212',
            }}
            onSubmit={(values, actions) => {
              handleOnLogin(values, actions)
            }}
            validationSchema={validationSchema}
          >
            {({ handleChange, values, handleSubmit, errors, touched, handleBlur }) => (
              <>
                <View style={styles.inputContainer}>
                  <FormInput
                    name="email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="Email"
                    autoCapitalize="none"
                    iconName="ios-person"
                    iconColor="#2C384A"
                    textAlign="center"
                    onBlur={handleBlur('email')}
                  />
                  <ErrorMessage errorValue={touched.email && errors.email} />
                </View>
                <View style={styles.inputContainer}>
                  <FormInput
                    name="password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="Password"
                    secureTextEntry
                    iconName="ios-lock"
                    iconColor="#2C384A"
                    textAlign="center"
                    onBlur={handleBlur('password')}
                  />
                  <ErrorMessage errorValue={touched.password && errors.password} />
                </View>
                <View style={styles.buttonContainer}>
                  <FormButton
                    loading={loading}
                    loadingProps={{ color: 'white', size: 'large' }}
                    buttonType="outline"
                    onPress={handleSubmit}
                    title="LOGIN"
                    buttonColor="#22508F"
                  />
                </View>
                <ErrorMessage errorValue={errors.general} />
                <TouchableOpacity onPress={() => goToSignup()}>
                  <Text style={styles.signUpText}>Aun no estoy registrado</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </BlurBackground>
      {/*
      <View>
        <Button
          title="Aun no tienes una cuenta? Registrate!"
          onPress={goToSignup}
          titleStyle={{color: '#F57C00'}}
          type="clear"
        />
      </View> */}
    </View>
  )
}

const LoginWithHOC = withFirebaseHOC(LoginScreen)

LoginWithHOC.navigationOptions = {
  header: null,
}

export default LoginWithHOC
