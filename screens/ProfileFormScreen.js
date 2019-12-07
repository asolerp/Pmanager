import React, { useState, useEffect } from 'react'
import { ScrollView, KeyboardAvoidingView, StyleSheet, View, Alert } from 'react-native'
import { Formik } from 'formik'
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import * as Yup from 'yup'
import * as Permissions from 'expo-permissions'
import { HideWithKeyboard } from 'react-native-hide-with-keyboard'
import BlurBackgroundWithAvatar from '../components/BlurBackgroundWithAvatar'
import FormInput from '../components/form/FormInput'
import FormButton from '../components/form/FormButton'
import FormSelect from '../components/form/FormSelect'
import ErrorMessage from '../components/form/ErrorMessage'
import { useStateValue } from '../config/User/UserContextManagement'
import { POSITIONS, MAIN_FOOT } from '../utils/constants/Player'
import { withFirebaseHOC } from '../config/Firebase'
import NumberSelector from '../components/form/NumberSelector'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topWrapper: {
    flex: 2,
    width: '100%',
  },
  formWrapper: {
    flex: 3,
    width: '100%',
  },
  inputsWrapper: {
    marginLeft: 15,
    marginRight: 15,
  },
  avatar: {
    marginTop: 15,
    marginBottom: 10,
  },
  numericInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

const getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      Alert('Sorry, we need camera roll permissions to make this work!')
    }
  }
}

function ProfileForm(props) {
  const [{ user }, dispatch] = useStateValue()
  const [imgProfile, setImgProfile] = useState(user.imgProfile)

  useEffect(() => {
    console.log(user)
    props.navigation.setParams({
      title: user.name,
      showHeader: !user.firstLogin,
    })
  }, [])

  useEffect(() => {
    getPermissionAsync()
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.cancelled) {
      setImgProfile(result.uri)
    }
  }

  const addValue = type => {
    console.log(user[type])
    user[type] = String(Number(user[type]) + 1)
  }

  const onEmailChange = (e, setFieldValue) => {
    console.log(e)
    // const domain = e.target.value
    // setFieldValue('age', domain)
  }

  const removeValue = type => {
    if (Number(type) > 0) {
      String(Number(type) - 1)
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().label('Nombre'),
    description: Yup.string().label('Descripción'),
    age: Yup.string().label('Edad'),
    height: Yup.string().label('Edad'),
    weight: Yup.string().label('Edad'),
    position: Yup.string().required('Position requerida'),
    foot: Yup.string().required('Pie requerido'),
  })

  return (
    <View style={styles.container}>
      <HideWithKeyboard style={styles.topWrapper}>
        {user && (
          <BlurBackgroundWithAvatar
            backgroundUrl={imgProfile}
            avatarUrl={imgProfile}
            showEditButton
            onEditPress={() => pickImage()}
            size="xlarge"
          />
        )}
      </HideWithKeyboard>
      <View style={styles.formWrapper}>
        <ScrollView style={{ marginTop: 10 }}>
          <KeyboardAvoidingView style={styles.inputsWrapper} behavior="position" enabled>
            <Formik
              initialValues={{ ...user }}
              onSubmit={(values, actions) => {
                const { age, name, height, weight, position, foot } = values
                const { uid } = props.firebase.currentUser()
                props.firebase
                  .uriToBlob(imgProfile)
                  .then(blob => props.firebase.uploadToFirebase(blob, uid, 'profile'))
                  .then(snapshot => snapshot.ref.getDownloadURL())
                  .then(downloadURL => {
                    const userData = {
                      uid,
                      name,
                      age,
                      height,
                      weight,
                      position,
                      foot,
                      imgProfile: downloadURL,
                    }
                    dispatch({
                      type: 'updateProfile',
                      userProfile: userData,
                    })
                    return props.firebase.updateUserProfile(userData)
                  })
                  .then(() => props.navigation.navigate('Profile'))
              }}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                values,
                handleSubmit,
                setFieldValue,
                errors,
                isValid,
                handleBlur,
                isSubmitting,
              }) => (
                <>
                  <FormInput
                    name="name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    label="Nombre"
                    placeholder="Nombre de jugador"
                    autoCapitalize="none"
                    onBlur={handleBlur('name')}
                  />
                  <FormInput
                    name="description"
                    value={values.description}
                    onChangeText={handleChange('description')}
                    label="Descripción"
                    placeholder="Que tipo de jugador eres?"
                    multiline
                    numberOfLines={4}
                    autoCapitalize="none"
                    onBlur={handleBlur('name')}
                  />
                  <NumberSelector
                    label="Edad"
                    name="age"
                    value={values.age}
                    addValue={ev => onEmailChange(ev, setFieldValue)}
                    removeValue={() => removeValue()}
                    onChangeText={handleChange('age')}
                  />
                  {/* <FormInput
                    placeholder="Edad"
                    autoCapitalize="none"
                    onBlur={handleBlur('age')}
                  />
                  <FormInput
                    name="height"
                    value={values.height}
                    onChangeText={handleChange('height')}
                    label="Altura (cm)"
                    placeholder="Altura"
                    onBlur={handleBlur('height')}
                  />
                  <FormInput
                    name="weight"
                    value={values.weight}
                    onChangeText={handleChange('weight')}
                    label="Peso"
                    placeholder="Peso (kg)"
                    onBlur={handleBlur('weight')}
                  /> */}
                  <View style={styles.numericInputs}>
                    <FormSelect
                      value={values.position}
                      label="Posición"
                      iconColor="black"
                      iconSize="15"
                      iconName="ios-arrow-down"
                      values={POSITIONS}
                      placeholder={{
                        label: 'Posición',
                        value: null,
                        color: '#9EA0A4',
                      }}
                      onValueChange={itemValue => setFieldValue('position', itemValue)}
                    />
                    <FormSelect
                      value={values.foot}
                      label="Pierna"
                      iconColor="black"
                      iconSize="15"
                      iconName="ios-arrow-down"
                      values={MAIN_FOOT}
                      placeholder={{
                        label: 'Pierna principal',
                        value: null,
                        color: '#9EA0A4',
                      }}
                      onValueChange={itemValue => setFieldValue('foot', itemValue)}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <FormButton
                      onPress={handleSubmit}
                      title="Editar"
                      buttonColor="#039BE5"
                      disabled={!isValid}
                      loading={isSubmitting}
                    />
                  </View>
                  <ErrorMessage errorValue={errors.general} />
                </>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  )
}

const ProfileFormWithHOC = withFirebaseHOC(ProfileForm)

ProfileFormWithHOC.navigationOptions = props => {
  if (props.navigation.getParam('showHeader')) {
    return {
      title: props.navigation.getParam('title'),
      headerTitleStyle: {
        color: 'black',
        fontSize: 20,
      },
    }
  }
  return {
    header: null,
    tabBarVisible: null,
  }
}

export default ProfileFormWithHOC
