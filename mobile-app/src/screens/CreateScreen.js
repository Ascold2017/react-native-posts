import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { addPost, createPost } from '../store'
import { useDispatch } from 'react-redux'
import { TextInput } from 'react-native-paper'
import AppButton from '../components/AppButton'
import AppCard from '../components/AppCard'
import ImagePicker from '../components/ImagePicker'

export const CreateScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null)
  const dispatch = useDispatch()
  const submitPost = async () => {
    await dispatch(createPost({ title, image }))
    setTitle('')
    setImage(null)
    navigation.navigate('MainAll')
  }
  return (
    <View style={{flex: 1, padding: 5}}>
      <AppCard style={{ padding: 10 }}>
        <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
        {image && <Image source={{ uri: image }} style={styles.preview}/>}
        <View style={styles.buttons}>
          <ImagePicker onPick={setImage} isFromGallery style={{ marginRight: 10 }}/>
          <ImagePicker onPick={setImage}/>
        </View>
        <AppButton color="green" onPress={submitPost}>Submit</AppButton>
      </AppCard>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1
  },
  preview: {
    height: Dimensions.get('screen').height /2,
    width: 'auto',
    resizeMode: 'contain'
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginVertical: 10
  }
})
