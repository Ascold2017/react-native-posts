import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Post from '../components/Post'
import { useSelector, shallowEqual } from 'react-redux'
export const MainScreen = ({ route, navigation }) => {
  const posts = useSelector(state => state.posts, shallowEqual)
  return (
    <View style={styles.center}>
      <FlatList
        data={route.name === 'MainFavourite' ? posts.filter(post => post.booked) : posts }
        renderItem={({ item }) => <Post post={item} onOpen={() => navigation.navigate(route.name === 'MainFavourite' ? 'FavouritePost' :'Post', { id: item.id }) }/>}
        keyExtractor={item => item.id}
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
