// UI
import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
// FORM
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../components/form/FormInput'
import AvatarWithPicker from '../components/Avatar'
// API
import { withFirebaseHOC } from '../config/Firebase'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
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
    fontSize: 50,
    fontFamily: 'montserrat-regular',
    color: 'black',
    textAlign: 'left',
  },
  photoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 20,
  },
})

const validationSchema = Yup.object().shape({
  name: Yup.string().label('Nombre'),
  place: Yup.string().label('Lugar del partido'),
  description: Yup.string().label('Descripción'),
})

function NewMatchScreen() {
  const [imageMatch, setImgProfile] = useState(
    'https://img.uefa.com/imgml/uefacom/ucl/social/og-default.jpg'
  )
  const setImage = uri => {
    setImgProfile(uri)
  }
  return (
    <View style={styles.container}>
      <View style={styles.firstSection}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Nuevo Partido</Text>
        </View>
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
            size="xlarge"
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
            <ScrollView>
              <FormInput
                name="name"
                label="Nombre del Partido"
                value={values.name}
                onChangeText={handleChange('name')}
                placeholder="Nombre del partido"
                autoCapitalize="none"
                textAlign="center"
                color="black"
                style={{
                  marginBottom: 15,
                }}
                onBlur={handleBlur('name')}
              />
              <FormInput
                name="description"
                label="Descripción"
                value={values.description}
                onChangeText={handleChange('name')}
                placeholder="Descripción del partido"
                autoCapitalize="none"
                textAlign="center"
                color="black"
                style={{
                  marginBottom: 15,
                }}
                onBlur={handleBlur('description')}
              />
              <FormInput
                name="place"
                label="Lugar"
                value={values.place}
                onChangeText={handleChange('place')}
                placeholder="Lugar del partido"
                autoCapitalize="none"
                textAlign="center"
                color="black"
                style={{
                  marginBottom: 15,
                }}
                onBlur={handleBlur('place')}
              />
            </ScrollView>
          )}
        </Formik>
      </View>
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
