// MODULE
import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
// UI
import { Formik } from 'formik'
import * as Yup from 'yup'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PageBlank from '../components/PageBlank'
import BlurBackground from '../components/BlurBackground'
import FormInputSimple from '../components/form/FormInputSimple'
import AvatarWithPicker from '../components/Avatar'
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
    <View style={styles.container}>
      <PageBlank title="Nuevo Partido" titleColor="black" iconColor="black" />
      {/* <BlurBackground
        blur={3}
        center
        backColor="rgba(63, 63, 63, .8)"
        title="Nuevo Partido"
        backgroundUrl="https://i.pinimg.com/originals/b8/cd/1f/b8cd1f6848ffd08cd4392abd07ad2444.jpg"
      >
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
            {({
              handleChange,
              values,
              handleSubmit,
              setFieldValue,
              errors,
              isValid,
              handleBlur,
            }) => (
              <View style={{ height: '88%' }}>
                <ProgressSteps>
                  <ProgressStep label="Información general">
                    <ScrollView>
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
                    </ScrollView>
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
      </BlurBackground> */}
    </View>
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
