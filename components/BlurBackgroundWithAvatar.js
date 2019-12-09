import React from 'react'
import { ImageBackground, StyleSheet, View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'

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
    fontSize: 20,
    marginTop: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 12,
  },
  infoWrapper: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
})

function BlurBackgroundWithAvatar(props) {
  return (
    <ImageBackground
      source={{
        uri: props.backgroundUrl,
      }}
      blurRadius={6}
      style={styles.container}
    >
      <View style={styles.topBackgroundImage}>
        <View
          style={[
            styles.avatarWrapper,
            props.children ? { justifyContent: 'flex-end' } : { justifyContent: 'center' },
          ]}
        >
          <Avatar
            rounded
            editButton={{
              name: 'photo-camera',
              type: 'material',
              color: 'black',
              underlayColor: '#000',
            }}
            containerStyle={styles.avatar}
            showEditButton={props.showEditButton}
            onEditPress={props.onEditPress}
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
