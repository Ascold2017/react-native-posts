import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Post from '../components/Post'
import { useSelector, shallowEqual } from 'react-redux'
import AppButton from '../components/AppButton'
export const MainScreen = ({ route, navigation }) => {
  const allPosts = useSelector(state => state.posts, shallowEqual)
  const posts = route.name === 'MainFavourite' ? allPosts.filter(post => post.booked) : allPosts;

  if (!posts.length) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ padding: 10, textAlign: 'center', fontSize: 16 }}>No posts!</Text>
        <AppButton onPress={() => navigation.navigate('Create')} color="green">Create new post</AppButton>
      </View>
    )
  }
  return (
    <View style={styles.center}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} onOpen={() => navigation.navigate(route.name === 'MainFavourite' ? 'FavouritePost' : 'Post', { id: item.id })} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    padding: 10
  }
})
