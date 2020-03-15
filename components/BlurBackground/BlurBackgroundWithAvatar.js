import React, { useContext } from 'react'
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { NavigationContext } from 'react-navigation'
import AvatarWithPicker from '../Avatar/Avatar'
import Styles from './Styles'

function BlurBackgroundWithAvatar({
  showEditButton,
  backgroundUrl,
  editableUser,
  avatarUrl,
  setImage,
  children,
  subtitle,
  title,
  user,
  size,
}) {
  const navigation = useContext(NavigationContext)
  return (
    <ImageBackground
      source={{
        uri: backgroundUrl,
      }}
      blurRadius={6}
      style={Styles.container}
    >
      <View style={Styles.topBackgroundImageWithColor}>
        {editableUser && (
          <View style={{ position: 'absolute', right: 25, top: 50 }}>
            <TouchableOpacity
              onPress={() => navigation && navigation.navigate('ProfileForm', { user })}
            >
              <MaterialCommunityIcons name="account-edit" size={32} color="white" />
            </TouchableOpacity>
          </View>
        )}

        <View
          style={[
            Styles.avatarWrapper,
            children ? { justifyContent: 'flex-end' } : { justifyContent: 'center' },
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
            containerStyle={Styles.avatar}
            showEditButton={showEditButton}
            setImage={setImage}
            size={size}
            imageUrl={avatarUrl}
            source={{
              uri: avatarUrl,
            }}
          />
          <Text style={Styles.title}>{title}</Text>
          <Text style={Styles.subtitle}>{subtitle}</Text>
        </View>
        {children && <View style={Styles.infoWrapper}>{children}</View>}
      </View>
    </ImageBackground>
  )
}

export default BlurBackgroundWithAvatar
