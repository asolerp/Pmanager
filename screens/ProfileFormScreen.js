// UI
import React, { useState, useEffect } from 'react'
import {
  Platform,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
} from 'react-native'
// import * as ImagePicker from 'expo-image-picker'
import * as Yup from 'yup'

// Components
import { Formik } from 'formik'
// import { HideWithKeyboard } from 'react-native-hide-with-keyboard'
// import BlurBackgroundWithAvatar from '../components/BlurBackgroundWithAvatar'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import FormInput from '../components/form/FormInput'
import FormInputSimple from '../components/form/FormInputSimple'
import FormButton from '../components/form/FormButton'
import FormSelect from '../components/form/FormSelect'
import ErrorMessage from '../components/form/ErrorMessage'
import NumberSelector from '../components/form/NumberSelector'
import Section from '../components/form/SectionTitle'
import RadioSelector from '../components/form/RadioSelector'
import TShirt from '../components/form/TShirt'

// Utils
import { withFirebaseHOC } from '../config/Firebase'
import { POSITIONS, MAIN_FOOT, PLAYER_STATS } from '../constants/Player'
import COUNTRIES from '../constants/Countries'
import PageBlank from '../components/PageBlank'
import AvatarWithPicker from '../components/Avatar'
import ChipSelector from '../components/form/ChipSelector'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsWrapper: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
  },
  avatar: {},
  numericInputs: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
})

const userEmpty = {
  age: 0,
  name: '',
  dorsal: 0,
  description: '',
  country: '',
  height: 0,
  weight: 0,
  position: '',
  foot: '',
  stats: {
    shoot: 0,
    speed: 0,
    dribbling: 0,
    pass: 0,
    strength: 0,
    resistance: 0,
  },
}

function ProfileForm(props) {
  const [user, setUser] = useState()
  const [imgProfile, setImgProfile] = useState('')

  useEffect(() => {
    const userData = props.navigation.getParam('user')
    setImgProfile(userData.imgProfile)
    setUser(userData)
  }, [])

  const setImage = uri => {
    setImgProfile(uri)
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

  // const validationSchema = Yup.object().shape({
  //   name: Yup.string().label('Nombre'),
  //   dorsal: Yup.string().label('Dorsal'),
  //   description: Yup.string().label('Descripción'),
  //   country: Yup.string().label('País'),
  //   age: Yup.string().label('Edad'),
  //   height: Yup.string().label('Edad'),
  //   weight: Yup.string().label('Edad'),
  //   position: Yup.string().required('Position requerida'),
  //   foot: Yup.string().required('Pie requerido'),
  //   shoot: Yup.string(),
  //   speed: Yup.string(),
  //   dribbling: Yup.string(),
  //   pass: Yup.string(),
  // })

  return (
    <View style={styles.container}>
      {user && (
        <PageBlank
          title={user.name}
          titleColor="black"
          iconColor="black"
          viewLeftSide={user.profileFilled}
          rightSide={() => (
            <AvatarWithPicker
              rounded
              editButton={{
                name: 'photo-camera',
                type: 'material',
                color: 'black',
                underlayColor: '#000',
              }}
              containerStyle={styles.avatar}
              imageUrl={imgProfile}
              showEditButton
              setImage={uri => setImage(uri)}
              size="medium"
              source={{
                uri: imgProfile,
              }}
            />
          )}
        >
          {/* <HideWithKeyboard style={styles.topWrapper}>
            {user && (
              <BlurBackgroundWithAvatar
                backgroundUrl={imgProfile}
                avatarUrl={imgProfile}
                showEditButton
                setImage={uri => setImage(uri)}
                size="xlarge"
              />
            )}
          </HideWithKeyboard> */}
          <View style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'padding'} enabled>
              <Formik
                initialValues={{ ...userEmpty, ...user, positions: [] }}
                onSubmit={values => {
                  const {
                    age,
                    name,
                    dorsal = 0,
                    description,
                    country,
                    height,
                    weight,
                    positions,
                    principalPosition,
                    foot,
                    stats = {
                      shoot: 0,
                      speed: 0,
                      dribbling: 0,
                      pass: 0,
                      strength: 0,
                      resistance: 0,
                    },
                  } = values
                  const { uid } = props.firebase.currentUser()
                  props.firebase
                    .uriToBlob(imgProfile)
                    .then(blob =>
                      props.firebase.uploadToFirebase(blob, `players/${uid}`, 'profile')
                    )
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
                        positions,
                        principalPosition,
                        foot,
                        stats,
                        imgProfile: downloadURL,
                      }
                      return props.firebase.updateUserProfile(userData)
                    })
                    .then(() => props.navigation.navigate('Profile'))
                }}
              >
                {({
                  handleChange,
                  values,
                  handleSubmit,
                  setFieldValue,
                  errors,
                  handleBlur,
                  isSubmitting,
                }) => (
                  <SafeAreaView>
                    <ScrollView
                      behaviour="height"
                      style={{ marginBottom: 0 }}
                      stickyHeaderIndices={[0, 2, 4]}
                    >
                      <Section title="Datos personales" />
                      <View style={styles.inputsWrapper}>
                        <TShirt name={values.name} dorsal={values.dorsal} />
                        <View
                          style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}
                        >
                          <FormInputSimple
                            name="name"
                            value={values.name}
                            onChangeText={handleChange('name')}
                            placeholder="Nombre de jugador"
                            autoCapitalize="none"
                            textAlign="left"
                            label="Nombre"
                            color="black"
                            style={{
                              marginBottom: 15,
                              marginRight: 30,
                            }}
                            onBlur={handleBlur('name')}
                          />
                          <NumberSelector
                            label="Dorsal"
                            name="dorsal"
                            value={values.dorsal}
                            addValue={value => addValue(value, setFieldValue, 'dorsal')}
                            removeValue={value => removeValue(value, setFieldValue, 'dorsal')}
                            onChangeText={handleChange('dorsal')}
                            bgColor="#22508F"
                          />
                        </View>
                        <FormInputSimple
                          name="description"
                          label="Descripción"
                          value={values.description}
                          onChangeText={handleChange('description')}
                          placeholder="Que tipo de jugador eres?"
                          multiline
                          numberOfLines={4}
                          textAlignVertical="top"
                          autoCapitalize="none"
                          textAlign="left"
                          color="black"
                          style={{
                            marginBottom: 15,
                          }}
                          onBlur={handleBlur('name')}
                        />
                        <FormSelect
                          value={values.country}
                          label="País"
                          iconColor="white"
                          iconSize="15"
                          iconName="ios-arrow-down"
                          values={COUNTRIES}
                          placeholder={{
                            label: 'País',
                            value: null,
                            color: 'white',
                          }}
                          onValueChange={itemValue => setFieldValue('country', itemValue)}
                        />
                        <ChipSelector
                          touchable
                          multiple
                          value={values.positions}
                          values={POSITIONS}
                          label="Posición"
                          onValueChange={itemValue => setFieldValue('positions', itemValue)}
                        />
                        <FormSelect
                          value={values.principalPosition}
                          label="Posición principal"
                          values={values.positions.filter(p => p.active)}
                          placeholder={{
                            label: 'Pierna principal',
                            value: null,
                            color: '#9EA0A4',
                          }}
                          onValueChange={itemValue => setFieldValue('principalPosition', itemValue)}
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
                      <Section title="Características jugador" />
                      <View style={styles.inputsWrapper}>
                        <View style={styles.numericInputs}>
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
                        </View>
                      </View>
                      <Section title="Habilidad" />
                      <View style={styles.inputsWrapper}>
                        <RadioSelector
                          values={PLAYER_STATS}
                          label="Disparo"
                          index={
                            values.stats
                              ? PLAYER_STATS.findIndex(stat => stat.value === values.stats.shoot)
                              : 0
                          }
                          selectedOption={value =>
                            selectOption(value, setFieldValue, 'stats.shoot')
                          }
                        />
                        <RadioSelector
                          values={PLAYER_STATS}
                          label="Velocidad"
                          index={
                            values.stats
                              ? PLAYER_STATS.findIndex(stat => stat.value === values.stats.speed)
                              : 0
                          }
                          selectedOption={value =>
                            selectOption(value, setFieldValue, 'stats.speed')
                          }
                        />
                        <RadioSelector
                          values={PLAYER_STATS}
                          label="Regate"
                          index={
                            values.stats
                              ? PLAYER_STATS.findIndex(
                                  stat => stat.value === values.stats.dribbling
                                )
                              : 0
                          }
                          selectedOption={value =>
                            selectOption(value, setFieldValue, 'stats.dribbling')
                          }
                        />
                        <RadioSelector
                          values={PLAYER_STATS}
                          label="Pase"
                          index={
                            values.stats
                              ? PLAYER_STATS.findIndex(stat => stat.value === values.stats.pass)
                              : 0
                          }
                          selectedOption={value => selectOption(value, setFieldValue, 'stats.pass')}
                        />
                        <RadioSelector
                          values={PLAYER_STATS}
                          label="Fuerza"
                          index={
                            values.stats
                              ? PLAYER_STATS.findIndex(stat => stat.value === values.stats.strength)
                              : 0
                          }
                          selectedOption={value =>
                            selectOption(value, setFieldValue, 'stats.strength')
                          }
                        />
                        <RadioSelector
                          values={PLAYER_STATS}
                          label="Resistencia"
                          index={
                            values.stats
                              ? PLAYER_STATS.findIndex(
                                  stat => stat.value === values.stats.resistance
                                )
                              : 0
                          }
                          selectedOption={value =>
                            selectOption(value, setFieldValue, 'stats.resistance')
                          }
                        />
                      </View>
                      <View style={styles.buttonContainer}>
                        <FormButton
                          onPress={handleSubmit}
                          style={{
                            backgroundColor: 'transparent',
                          }}
                          title="Guardar"
                          buttonColor="black"
                          // disabled={!isValid}
                          loading={isSubmitting}
                        />
                      </View>
                      <ErrorMessage errorValue={errors.general} />
                    </ScrollView>
                  </SafeAreaView>
                )}
              </Formik>
            </KeyboardAvoidingView>
          </View>
        </PageBlank>
      )}
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
