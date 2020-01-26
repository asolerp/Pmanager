import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { HideWithKeyboard } from 'react-native-hide-with-keyboard'
import FormInput from '../components/form/FormInput'
import FormButton from '../components/form/FormButton'
import ErrorMessage from '../components/form/ErrorMessage'
import { withFirebaseHOC } from '../config/Firebase'

import AppLogo from '../components/AppLogo'
import BlurBackground from '../components/BlurBackground'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Must have at least 2 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password should be at least 6 characters '),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    .required('Confirm Password is required'),
  check: Yup.boolean().oneOf([true], 'Please check the agreement'),
})

const Signup = props => {
  const [loading, setLoading] = useState(false)
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true)
  const [passwordIcon, setPasswordIcon] = useState('ios-eye')
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('ios-eye')

  const goToLogin = () => props.navigation.navigate('Login')

  // const handlePasswordVisibility = () => {
  //   this.setState(prevState => ({
  //     passwordIcon: prevState.passwordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
  //     passwordVisibility: !prevState.passwordVisibility,
  //   }))
  // }

  // const handleConfirmPasswordVisibility = () => {
  //   this.setState(prevState => ({
  //     confirmPasswordIcon: prevState.confirmPasswordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
  //     confirmPasswordVisibility: !prevState.confirmPasswordVisibility,
  //   }))
  // }

  const handleOnSignup = async (values, actions) => {
    setLoading(true)
    const { name, email, password } = values

    try {
      const response = await props.firebase.signupWithEmail(email, password)

      if (response.user.uid) {
        const { uid } = response.user
        const userData = {
          email,
          name,
          uid,
          imageProfile:
            'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjHlpDU1oPmAhUwx4UKHclvBsoQjRx6BAgBEAQ&url=http%3A%2F%2Fwww.institutodeestrategia.com%2Farticulo%2Fsociedad%2Fes-dia-vida-lionel-messi%2F20180324160025011840.html&psig=AOvVaw20hqx2umS74ZH4INf4ehEW&ust=1574713384916570',
          firstLogin: true,
          position: 'Medio centro',
        }
        await props.firebase.createNewUser(userData)
        setLoading(false)
        props.navigation.navigate('App')
      }
    } catch (error) {
      setLoading(false)
      actions.setFieldError('general', error.message)
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <View style={styles.container}>
      <BlurBackground
        center
        backgroundUrl="https://www.actualidadiphone.com/wp-content/uploads/2015/09/fondos-de-pantalla-deportes-9.jpeg"
      >
        <HideWithKeyboard style={styles.logoContainer}>
          <AppLogo logo={false} />
        </HideWithKeyboard>
        <SafeAreaView style={styles.formWrapper}>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              check: false,
            }}
            onSubmit={(values, actions) => {
              handleOnSignup(values, actions)
            }}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              values,
              handleSubmit,
              errors,
              isValid,
              touched,
              handleBlur,
              isSubmitting,
              setFieldValue,
            }) => (
              <>
                <View style={styles.inputContainer}>
                  <FormInput
                    name="name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    placeholder="Nombre"
                    iconName="md-person"
                    iconColor="#2C384A"
                    textAlign="center"
                    onBlur={handleBlur('name')}
                  />
                  <ErrorMessage errorValue={touched.name && errors.name} />
                </View>
                <View style={styles.inputContainer}>
                  <FormInput
                    name="email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="Email"
                    autoCapitalize="none"
                    iconName="ios-mail"
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
                    placeholder="Contraseña"
                    iconName="ios-lock"
                    iconColor="#2C384A"
                    onBlur={handleBlur('password')}
                    textAlign="center"
                    secureTextEntry={passwordVisibility}
                    // rightIcon={
                    //   <TouchableOpacity onPress={handlePasswordVisibility}>
                    //     <Ionicons name={passwordIcon} size={28} color="grey" />
                    //   </TouchableOpacity>
                    // }
                  />
                  <ErrorMessage errorValue={touched.password && errors.password} />
                </View>
                <View style={styles.inputContainer}>
                  <FormInput
                    name="password"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    placeholder="Confirmar contraseña"
                    iconName="ios-lock"
                    iconColor="#2C384A"
                    onBlur={handleBlur('confirmPassword')}
                    textAlign="center"
                    secureTextEntry={confirmPasswordVisibility}
                    // rightIcon={
                    //   <TouchableOpacity onPress={handleConfirmPasswordVisibility}>
                    //     <Ionicons name={confirmPasswordIcon} size={28} color="grey" />
                    //   </TouchableOpacity>
                    // }
                  />
                  <ErrorMessage errorValue={touched.confirmPassword && errors.confirmPassword} />
                </View>
                <CheckBox
                  containerStyle={styles.checkBoxContainer}
                  textStyle={styles.checkBoxText}
                  titleProps={{
                    style: styles.checkBoxText,
                  }}
                  checkedIcon="check-box"
                  iconType="material"
                  uncheckedIcon="check-box-outline-blank"
                  title="Acepto los términos y condiciones"
                  checkedTitle="Has aceptado los términos y condiciones"
                  checked={values.check}
                  onPress={() => setFieldValue('check', !values.check)}
                />
                <View style={styles.buttonContainer}>
                  <FormButton
                    loading={loading}
                    loadingProps={{ color: 'white', size: 'large' }}
                    buttonType="outline"
                    onPress={handleSubmit}
                    title="SIGNUP"
                    buttonColor="#22508F"
                  />
                </View>
                <ErrorMessage errorValue={errors.general} />
              </>
            )}
          </Formik>
          <Button
            title="Ya estoy registrado!"
            onPress={() => goToLogin()}
            titleStyle={styles.loginText}
            type="clear"
          />
        </SafeAreaView>
      </BlurBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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
  inputContainer: {
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
  },
  checkBoxContainer: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    marginBottom: 15,
    alignItems: 'center',
  },
  checkBoxText: {
    color: 'white',
    fontFamily: 'montserrat-light',
    fontSize: 15,
    marginLeft: 10,
  },
  loginText: {
    fontFamily: 'montserrat-light',
    color: 'white',
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
})

const SignupWithHOC = withFirebaseHOC(Signup)

SignupWithHOC.navigationOptions = {
  header: null,
}

export default SignupWithHOC
