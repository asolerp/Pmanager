import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import Images from '../constants/Images'

// UI
import PageBlank from '../components/PageBlank'
import AvatarWithPicker from '../components/Avatar'

// API
import { withFirebaseHOC } from '../config/Firebase'

const styles = StyleSheet.create({
  fieldContainer: {
    width: '100%',
    position: 'relative',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    shadowColor: '#aaaaaa',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  avatar: {
    borderColor: 'white',
    borderWidth: 2,
    shadowColor: '#aaaaaa',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
})

const Formacion = ({ match, reverse }) => {
  return (
    <View
      style={{
        width: '50%',
        height: '100%',
        flexDirection: reverse ? 'row-reverse' : 'row',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <AvatarWithPicker
            rounded
            containerStyle={styles.avatar}
            imageUrl={match && match.imageMatch}
            size="small"
            source={{
              uri: match && match.imageMatch,
            }}
          />
          <Text style={{ color: 'white', fontSize: 10 }}>Nombre</Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <AvatarWithPicker
            rounded
            containerStyle={styles.avatar}
            imageUrl={match && match.imageMatch}
            size="small"
            source={{
              uri: match && match.imageMatch,
            }}
          />
          <Text style={{ color: 'white', fontSize: 10 }}>Nombre</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <AvatarWithPicker
            rounded
            containerStyle={styles.avatar}
            imageUrl={match && match.imageMatch}
            size="small"
            source={{
              uri: match && match.imageMatch,
            }}
          />
          <Text style={{ color: 'white', fontSize: 10 }}>Nombre</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <AvatarWithPicker
            rounded
            containerStyle={styles.avatar}
            imageUrl={match && match.imageMatch}
            size="small"
            source={{
              uri: match && match.imageMatch,
            }}
          />
          <Text style={{ color: 'white', fontSize: 10 }}>Nombre</Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <AvatarWithPicker
            rounded
            containerStyle={styles.avatar}
            imageUrl={match && match.imageMatch}
            size="small"
            source={{
              uri: match && match.imageMatch,
            }}
          />
          <Text style={{ color: 'white', fontSize: 10 }}>Nombre</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <AvatarWithPicker
            rounded
            containerStyle={styles.avatar}
            imageUrl={match && match.imageMatch}
            size="small"
            source={{
              uri: match && match.imageMatch,
            }}
          />
          <Text style={{ color: 'white', fontSize: 10 }}>Nombre</Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <AvatarWithPicker
            rounded
            containerStyle={styles.avatar}
            imageUrl={match && match.imageMatch}
            size="small"
            source={{
              uri: match && match.imageMatch,
            }}
          />
          <Text style={{ color: 'white', fontSize: 10 }}>Nombre</Text>
        </View>
      </View>
    </View>
  )
}

const MatchScreen = props => {
  const [match, setMatch] = useState()

  useEffect(() => {
    const matchSelected = props.navigation.getParam('match')
    setMatch(matchSelected)
  }, [])

  return (
    <PageBlank
      title={match && match.name}
      titleColor="white"
      topContainerColor="#072357"
      backgroundColorChildren="#f2f2f2"
      iconColor="black"
      leftSide={() => (
        <TouchableOpacity onPress={() => props.navigation.pop()}>
          <Icon name="angle-left" type="font-awesome" color="white" size={30} />
        </TouchableOpacity>
      )}
      rightSide={() => (
        <AvatarWithPicker
          rounded
          imageUrl={match && match.imageMatch}
          size="small"
          source={{
            uri: match && match.imageMatch,
          }}
        />
      )}
    >
      <View style={{ flex: 1, justifyContent: 'flex-start', paddingHorizontal: 10 }}>
        <View style={styles.fieldContainer}>
          <Image
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
            source={Images.matchField.file}
          />
          <View
            style={{
              position: 'absolute',
              zIndex: 2,
              width: '100%',
              height: '100%',
              flexDirection: 'row',
            }}
          >
            <Formacion match={match} />
            <Formacion match={match} reverse />
          </View>
        </View>
      </View>
    </PageBlank>
  )
}

const MatchScreenWithHOC = withFirebaseHOC(MatchScreen)

MatchScreenWithHOC.navigationOptions = {
  header: null,
}

export default MatchScreenWithHOC
