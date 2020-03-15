import React, { useState } from 'react'
import { Modal, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Avatar } from 'react-native-elements'
import ImageViewer from 'react-native-image-zoom-viewer'

const AvatarWithPicker = ({ setImage, zoomImage, imageUrl, ...rest }) => {
  const [showImage, setShowImage] = useState(false)

  const handlePress = () => {
    if (zoomImage) {
      setShowImage(true)
    }
  }
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

  return (
    <>
      <Modal visible={showImage} transparent>
        <ImageViewer
          imageUrls={[{ url: imageUrl }]}
          onSwipeDown={() => {
            setShowImage(false)
          }}
          enableSwipeDown
        />
      </Modal>
      {zoomImage ? (
        <TouchableOpacity onPress={() => handlePress()}>
          <Avatar onEditPress={() => pickImage()} {...rest} />
        </TouchableOpacity>
      ) : (
        <Avatar onEditPress={() => pickImage()} {...rest} />
      )}
    </>
  )
}

export default AvatarWithPicker
