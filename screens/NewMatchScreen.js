// MODULE
import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'

// UI
import { Formik } from 'formik'
import * as Yup from 'yup'
import PageBlank from '../components/PageBlank'
import FormInputSimple from '../components/form/FormInputSimple'
import AvatarWithPicker from '../components/Avatar'
import FormButton from '../components/form/FormButton'
import DatePicker from '../components/form/DatePicker'

// API
import { withFirebaseHOC } from '../config/Firebase'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstSection: {
    flexDirection: 'row',
  },
  seconSection: {
    marginTop: 30,
    paddingHorizontal: 15,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'montserrat-regular',
    fontWeight: 'bold',
  },
  photoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonProgress: {
    fontSize: 15,
    fontFamily: 'montserrat-regular',
    color: 'black',
  },
})

const validationSchema = Yup.object().shape({
  name: Yup.string().label('Nombre'),
  place: Yup.string().label('Lugar del partido'),
  description: Yup.string().label('Descripción'),
})

function NewMatchScreen(props) {
  const [imageMatch, setImgProfile] = useState(
    'https://img.uefa.com/imgml/uefacom/ucl/social/og-default.jpg'
  )
  const setImage = uri => {
    setImgProfile(uri)
  }
  return (
    <PageBlank title="Nuevo Partido" titleColor="black" iconColor="black">
      <View style={styles.firstSection}>
        <View style={styles.photoContainer}>
          <AvatarWithPicker
            rounded
            editButton={{
              name: 'photo-camera',
              type: 'material',
              color: 'black',
              underlayColor: '#000',
            }}
            containerStyle={styles.avatar}
            showEditButton
            setImage={uri => setImage(uri)}
            size="large"
            source={{
              uri: imageMatch,
            }}
          />
        </View>
      </View>
      <View style={styles.seconSection}>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={values => console.log(values)}
          validationSchema={validationSchema}
        >
          {({ handleChange, values, handleSubmit, setFieldValue, errors, isValid, handleBlur }) => (
            <View style={{ height: '90%' }}>
              <ProgressSteps
                activeStepIconBorderColor="#22508F"
                completedProgressBarColor="#22508F"
                completedStepIconColor="#22508F"
                labelFontFamily="montserrat-light"
                activeLabelColor="#22508F"
                labelColor="black"
              >
                <ProgressStep
                  nextBtnText="Siguiente"
                  nextBtnTextStyle={styles.buttonProgress}
                  label="Información general"
                >
                  <FormInputSimple
                    name="name"
                    label="Nombre del Partido"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    placeholder="Nombre del partido"
                    autoCapitalize="none"
                    textAlign="left"
                    color="black"
                    style={{
                      marginBottom: 15,
                    }}
                    onBlur={handleBlur('name')}
                  />
                  <FormInputSimple
                    name="description"
                    label="Descripción"
                    value={values.description}
                    onChangeText={handleChange('name')}
                    placeholder="Descripción del partido"
                    autoCapitalize="none"
                    textAlign="left"
                    color="black"
                    style={{
                      marginBottom: 15,
                    }}
                    onBlur={handleBlur('description')}
                  />
                  <FormInputSimple
                    name="place"
                    label="Lugar"
                    value={values.place}
                    onChangeText={handleChange('place')}
                    placeholder="Lugar del partido"
                    autoCapitalize="none"
                    textAlign="left"
                    color="black"
                    style={{
                      marginBottom: 15,
                    }}
                    onBlur={handleBlur('place')}
                  />
                  <View style={{ flexDirection: 'row' }}>
                    <DatePicker
                      label="Fecha"
                      placeholder="Fecha del partido"
                      mode="date"
                      date={values.date}
                      onValueChange={itemValue => setFieldValue('date', itemValue)}
                    />
                    <DatePicker
                      label="Hora"
                      placeholder="Hora del partido"
                      mode="time"
                      format="HH:mm"
                      date={values.time}
                      onValueChange={itemValue => setFieldValue('time', itemValue)}
                    />
                  </View>
                </ProgressStep>
                <ProgressStep label="Jugadores">
                  <View style={{ alignItems: 'center' }}>
                    <Text>This is the content within step 2!</Text>
                  </View>
                </ProgressStep>
                <ProgressStep label="Third Step">
                  <View style={{ alignItems: 'center' }}>
                    <Text>This is the content within step 3!</Text>
                  </View>
                </ProgressStep>
              </ProgressSteps>
            </View>
          )}
        </Formik>
      </View>
    </PageBlank>
  )
}

const NewMatchScreenWithHOC = withFirebaseHOC(NewMatchScreen)

NewMatchScreenWithHOC.navigationOptions = () => {
  return {
    header: null,
    tabBarVisible: null,
  }
}

export default NewMatchScreenWithHOC
