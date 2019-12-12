import React, { useState, useEffect } from 'react'
import {
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native'
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
import { POSITIONS, MAIN_FOOT, PLAYER_STATS } from '../constants/Player'
import { withFirebaseHOC } from '../config/Firebase'
import NumberSelector from '../components/form/NumberSelector'
import Section from '../components/form/SectionTitle'
import RadioSelector from '../components/form/RadioSelector'
import COUNTRIES from '../constants/Countries'

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

  const addValue = (value, setFieldValue, input) => {
    setFieldValue(input, String(Number(value) + 1))
  }

  const removeValue = (value, setFieldValue, input) => {
    setFieldValue(input, String(Number(value) - 1))
  }

  const selectOption = (value, setFieldValue, input) => {
    setFieldValue(input, value)
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().label('Nombre'),
    dorsal: Yup.string().label('Dorsal'),
    description: Yup.string().label('Descripción'),
    country: Yup.string().label('País'),
    age: Yup.string().label('Edad'),
    height: Yup.string().label('Edad'),
    weight: Yup.string().label('Edad'),
    position: Yup.string().required('Position requerida'),
    foot: Yup.string().required('Pie requerido'),
    shoot: Yup.string(),
    speed: Yup.string(),
    dribbling: Yup.string(),
    pass: Yup.string(),
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
          <KeyboardAvoidingView
            style={styles.inputsWrapper}
            behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
            enabled
          >
            <Formik
              initialValues={{ ...user }}
              onSubmit={(values, actions) => {
                const {
                  age,
                  name,
                  dorsal = 0,
                  description,
                  country,
                  height,
                  weight,
                  position,
                  foot,
                  stats = {},
                } = values
                const { uid } = props.firebase.currentUser()
                props.firebase
                  .uriToBlob(imgProfile)
                  .then(blob => props.firebase.uploadToFirebase(blob, uid, 'profile'))
                  .then(snapshot => snapshot.ref.getDownloadURL())
                  .then(downloadURL => {
                    const userData = {
                      uid,
                      name,
                      dorsal,
                      description,
                      country,
                      age,
                      height,
                      weight,
                      position,
                      foot,
                      stats,
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
                  <Section title="Datos personales" />
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
                  <FormSelect
                    value={values.country}
                    label="País"
                    iconColor="black"
                    iconSize="15"
                    iconName="ios-arrow-down"
                    values={COUNTRIES}
                    placeholder={{
                      label: 'País',
                      value: null,
                      color: '#9EA0A4',
                    }}
                    onValueChange={itemValue => setFieldValue('country', itemValue)}
                  />
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
                  <Section title="Características jugador" />
                  <NumberSelector
                    label="Dorsal"
                    name="dorsal"
                    value={values.dorsal}
                    addValue={value => addValue(value, setFieldValue, 'dorsal')}
                    removeValue={value => removeValue(value, setFieldValue, 'dorsal')}
                    onChangeText={handleChange('dorsal')}
                    bgColor="#22508F"
                  />
                  <NumberSelector
                    label="Edad"
                    name="age"
                    value={values.age}
                    addValue={value => addValue(value, setFieldValue, 'age')}
                    removeValue={value => removeValue(value, setFieldValue, 'age')}
                    onChangeText={handleChange('age')}
                    bgColor="#22508F"
                  />
                  <NumberSelector
                    label="Altura (cm)"
                    name="height"
                    value={values.height}
                    addValue={value => addValue(value, setFieldValue, 'height')}
                    removeValue={value => removeValue(value, setFieldValue, 'height')}
                    onChangeText={handleChange('height')}
                    bgColor="#22508F"
                  />
                  <NumberSelector
                    label="Peso (kg)"
                    name="weight"
                    value={values.weight}
                    addValue={value => addValue(value, setFieldValue, 'weight')}
                    removeValue={value => removeValue(value, setFieldValue, 'weight')}
                    onChangeText={handleChange('weight')}
                    bgColor="#22508F"
                  />
                  <Section title="Habilidad" />
                  <RadioSelector
                    values={PLAYER_STATS}
                    label="Disparo"
                    index={
                      values.stats
                        ? PLAYER_STATS.findIndex(stat => stat.value === values.stats.shoot)
                        : 0
                    }
                    selectedOption={value => selectOption(value, setFieldValue, 'stats.shoot')}
                  />
                  <RadioSelector
                    values={PLAYER_STATS}
                    label="Velocidad"
                    index={
                      values.stats
                        ? PLAYER_STATS.findIndex(stat => stat.value === values.stats.speed)
                        : 0
                    }
                    selectedOption={value => selectOption(value, setFieldValue, 'stats.speed')}
                  />
                  {/* <RadioSelector
                    values={PLAYER_STATS}
                    label="Regate"
                    index={PLAYER_STATS.findIndex(stat => stat.value === values.stats.dribbling)}
                    selectedOption={value => selectOption(value, setFieldValue, 'dribbling')}
                  />
                  <RadioSelector
                    values={PLAYER_STATS}
                    label="Pase"
                    index={PLAYER_STATS.findIndex(stat => stat.value === values.stats.pass)}
                    selectedOption={value => selectOption(value, setFieldValue, 'pass')}
                  />
                  <RadioSelector
                    values={PLAYER_STATS}
                    label="Fuerza"
                    index={PLAYER_STATS.findIndex(stat => stat.value === values.stats.strength)}
                    selectedOption={value => selectOption(value, setFieldValue, 'strength')}
                  />
                  <RadioSelector
                    values={PLAYER_STATS}
                    label="Resistencia"
                    index={PLAYER_STATS.findIndex(stat => stat.value === values.stats.resistance)}
                    selectedOption={value => selectOption(value, setFieldValue, 'resistance')}
                  /> */}
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
