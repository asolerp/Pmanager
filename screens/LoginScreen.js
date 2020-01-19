import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { HideWithKeyboard } from 'react-native-hide-with-keyboard'
import FormInput from '../components/form/FormInput'
import FormButton from '../components/form/FormButton'
import ErrorMessage from '../components/form/ErrorMessage'
import AppLogo from '../components/AppLogo'
import { withFirebaseHOC } from '../config/Firebase'

import BlurBackground from '../components/BlurBackground'

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
    backgroundColor: '#fff',
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
  buttonContainer: {},
})

function LoginScreen(props) {
  // const [passwordVisibility, setPasswordVisibility] = useState(true);
  // const [rightIcon, setRightIcon] = useState('ios-eye');
  const [loading, setLoading] = useState(false)

  // const goToSignup = () => props.navigation.navigate('Signup');

  // const handlePasswordVisibility = () => {
  //   setRightIcon(prevState =>
  //     prevState === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
  //   );
  //   setPasswordVisibility(prevState => !prevState);
  // };

  const handleOnLogin = async (values, actions) => {
    setLoading(true)
    const { email, password } = values
    try {
      const { user } = await props.firebase.loginWithEmail(email, password)
      if (user) {
        console.log(user)
        await props.firebase.updateUserProfile(user)
        setLoading(false)
      }
      props.navigation.navigate('App', { userUID: user.uid })
    } catch (error) {
      actions.setFieldError('general', error.message)
    } finally {
      actions.setSubmitting(false)
    }

    // setLoading(true);
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
                    // rightIcon={
                    //   <TouchableOpacity onPress={handlePasswordVisibility}>
                    //     <Icon
                    //       type="ionicon"
                    //       name={rightIcon}
                    //       size={28}
                    //       color="grey"
                    //     />
                    //   </TouchableOpacity>
                    // }
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
                    // disabled={!isValid || isSubmitting}
                    // loading={isSubmitting}
                  />
                </View>
                <ErrorMessage errorValue={errors.general} />
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
