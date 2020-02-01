import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Avatar } from 'react-native-elements'

const AvatarWithPicker = ({ setImage, ...rest }) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  return <Avatar onEditPress={() => pickImage()} {...rest} />
}

export default AvatarWithPicker
