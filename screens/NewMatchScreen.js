// MODULE
import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, FlatList, Modal, View, Text } from 'react-native'

// UI
import { Formik } from 'formik'
import * as Yup from 'yup'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PageBlank from '../components/PageBlank'
import FormInputSimple from '../components/form/FormInputSimple'
import AvatarWithPicker from '../components/Avatar'
import FormButton from '../components/form/FormButton'
import DatePicker from '../components/form/DatePicker'
import Section from '../components/form/SectionTitle'
import PlayerRow from '../components/PlayerRow'

// API
import subscribeUserData from '../hooks/subscribeUserData'
import { withFirebaseHOC } from '../config/Firebase'

// PAGES
import FriendListScreen from './FriendListScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    marginRight: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  inputsWrapper: {
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
  addButon: {
    fontFamily: 'montserrat-regular',
    fontSize: 10,
    color: 'blue',
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
  const { user } = subscribeUserData()
  const [activeModal, setActiveModal] = useState(false)
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [imageMatch, setImgProfile] = useState(
    'https://img.uefa.com/imgml/uefacom/ucl/social/og-default.jpg'
  )
  const setImage = uri => {
    setImgProfile(uri)
  }
  return (
    <PageBlank
      title="Nuevo Partido"
      titleColor="black"
      iconColor="black"
      rightSide={
        <AvatarWithPicker
          rounded
          editButton={{
            name: 'photo-camera',
            type: 'material',
            color: 'black',
            underlayColor: '#000',
          }}
          containerStyle={styles.avatar}
          imageUrl={imageMatch}
          showEditButton
          setImage={uri => setImage(uri)}
          size="medium"
          source={{
            uri: imageMatch,
          }}
        />
      }
    >
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={activeModal}
          onRequestClose={() => {
            setActiveModal(false)
          }}
        >
          <FriendListScreen
            listSelectedPlayers={selectedPlayers}
            handlePlayerSelection={players => {
              setSelectedPlayers(players)
              setActiveModal(false)
            }}
          />
        </Modal>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={values => console.log(values)}
          validationSchema={validationSchema}
        >
          {({ handleChange, values, handleSubmit, setFieldValue, errors, isValid, handleBlur }) => (
            <SafeAreaView>
              <ScrollView behaviour="height" style={{ marginBottom: 60 }}>
                <Section title="Datos personales" customStyle={{ marginBottom: 10 }} />
                <View style={[styles.inputsWrapper]}>
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
                </View>
                <Section title="Administradores" customStyle={{ marginBottom: 10 }} />
                <View
                  style={[
                    styles.inputsWrapper,
                    { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
                  ]}
                >
                  <AvatarWithPicker
                    rounded
                    containerStyle={styles.avatar}
                    imageUrl={user && user.imgProfile}
                    size="medium"
                    source={{
                      uri: user && user.imgProfile,
                    }}
                  />
                </View>
                <Section
                  title="Jugadores"
                  rightElement={
                    <TouchableOpacity onPress={() => setActiveModal(true)}>
                      <Text style={styles.addButon}>Añadir</Text>
                    </TouchableOpacity>
                  }
                />
                <View>
                  <View
                    style={[styles.inputsWrapper, { flexDirection: 'row', alignItems: 'center' }]}
                  >
                    {selectedPlayers && (
                      <FlatList
                        data={selectedPlayers}
                        renderItem={({ item }) => <PlayerRow player={item} />}
                        keyExtractor={item => item.uid}
                      />
                    )}
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
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
