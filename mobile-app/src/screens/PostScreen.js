import React from 'react'
import { ScrollView, Image, Text, StyleSheet, View, Alert, TouchableNativeFeedback } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import AppButton from '../components/AppButton'
import { DATA } from '../../assets/data'
export const PostScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const post = DATA.find(p => p.id === id);
  navigation.setOptions({
    title: new Date(post.date).toLocaleDateString(),
    headerRight: () =>
      (<View style={{ paddingRight: 15 }}>
        <TouchableNativeFeedback style={{ padding: 10 }}>
          <FontAwesome name={post.booked ? 'star' : 'star-o'} size={20} color="#fff" />
        </TouchableNativeFeedback>
      </View>)
  })

  const removePost = () => {
    Alert.alert(
      'Delete post',
      'Are you sure to delete post ?',
      [
        {
          text: 'Yes',
          onPress: () => console.log(post.id),
          style: 'destructive'
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    )
  }

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={{ height: 200 }} />
      <View style={styles.content}><Text>{post.text.repeat(100)}</Text></View>
      <AppButton color="red" onPress={removePost}>Delete</AppButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 10
  }
})
