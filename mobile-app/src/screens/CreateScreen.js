import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { TextInput } from 'react-native-paper'
import AppButton from '../components/AppButton'

export const CreateScreen = ({}) => {
  const [title, setTitle] = useState('');
  const submitPost = () => {
    console.log('submit')
  }
  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <AppButton color="blue" onPress={submitPost}>Submit</AppButton>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
