import React from 'react'
import { ScrollView, Image, Text, StyleSheet, View, Alert, TouchableNativeFeedback, Dimensions } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import AppButton from '../components/AppButton'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { toggleFavouritePost, deletePost } from '../store'
export const PostScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const dispatch = useDispatch()
  const post = useSelector(state => state.posts.find(post => post.id === id), shallowEqual)

  if (!post) return null;
  
  navigation.setOptions({
    title: new Date(post.date).toLocaleDateString(),
    headerTitleStyle: {
      marginLeft: 20, textAlign: 'center'
    },
    headerLeft: () => (
      <View style={{ flexDirection: 'row', paddingLeft: 15 }}>
        <TouchableOpacity style={{ padding: 10 }} onPress={navigation.toggleDrawer}>
          <FontAwesome name="bars" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }} onPress={navigation.goBack}>
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    ),
    headerRight: () =>
      (<View style={{ paddingRight: 15 }}>
        <TouchableNativeFeedback style={{ padding: 10 }} onPress={() => dispatch(toggleFavouritePost(id))}>
          <FontAwesome name={post.booked ? 'star' : 'star-o'} size={20} color="#fff" />
        </TouchableNativeFeedback>
      </View>),
  })


  const removePost = () => {
    Alert.alert(
      'Delete post',
      'Are you sure to delete post ?',
      [
        {
          text: 'Yes',
          onPress: () => {
            navigation.goBack();
            dispatch(deletePost(id));
          },
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
      <Image source={{ uri: post.img }} style={{ height: Dimensions.get('screen').height / 2 }} />
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
