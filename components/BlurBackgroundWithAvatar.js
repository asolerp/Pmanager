import React, { useContext } from 'react'
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { NavigationContext } from 'react-navigation'
import AvatarWithPicker from './Avatar'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  topBackgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(63, 63, 63, .6)',
  },
  avatarWrapper: {
    flex: 2,
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
  },
  avatar: {
    marginTop: 30,
  },
  title: {
    color: 'white',
    fontFamily: 'montserrat-regular',
    fontSize: 20,
    marginTop: 10,
  },
  subtitle: {
    color: 'white',
    fontFamily: 'montserrat-light',
    fontSize: 12,
  },
  infoWrapper: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
})

function BlurBackgroundWithAvatar(props) {
  const navigation = useContext(NavigationContext)
  return (
    <ImageBackground
      source={{
        uri: props.backgroundUrl,
      }}
      blurRadius={6}
      style={styles.container}
    >
      <View style={styles.topBackgroundImage}>
        {props.editableUser && (
          <View style={{ position: 'absolute', right: 25, top: 50 }}>
            <TouchableOpacity
              onPress={() => navigation && navigation.navigate('ProfileForm', { user: props.user })}
            >
              <MaterialCommunityIcons name="account-edit" size={32} color="white" />
            </TouchableOpacity>
          </View>
        )}

        <View
          style={[
            styles.avatarWrapper,
            props.children ? { justifyContent: 'flex-end' } : { justifyContent: 'center' },
          ]}
        >
          <AvatarWithPicker
            rounded
            editButton={{
              name: 'photo-camera',
              type: 'material',
              color: 'black',
              underlayColor: '#000',
            }}
            containerStyle={styles.avatar}
            showEditButton={props.showEditButton}
            setImage={props.setImage}
            size={props.size}
            source={{
              uri: props.avatarUrl,
            }}
          />
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subtitle}>{props.subtitle}</Text>
        </View>
        {props.children && <View style={styles.infoWrapper}>{props.children}</View>}
      </View>
    </ImageBackground>
  )
}

export default BlurBackgroundWithAvatar
