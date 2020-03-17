import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { DATA } from '../../assets/data'
import Post from '../components/Post'
export const MainScreen = ({ route, navigation }) => {
  return (
    <View style={styles.center}>
      <FlatList
        data={route.name === 'MainFavourite' ? DATA.filter(post => post.booked) : DATA }
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
