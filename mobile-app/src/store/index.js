import { applyMiddleware } from 'redux'
import { createSlice, configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import DB from '../db'
import * as FileSystem from 'expo-file-system';

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    setPosts: {
      reducer(_, action) {
        return [...action.payload]
      }
    },
    setIsBookedPost: {
      reducer(state, action) {
        return state.map(post => {
          if (post.id === action.payload.id) {
            return { ...post, booked: action.payload.booked }
          }
          return post
        })
      }
    },
    addPost: {
      reducer(state, action) {
        return [...state, action.payload]
      },
      prepare({ id, text, img, booked, date }) {
        return {
          payload: {
            text,
            img,
            id: id.toString(),
            booked: Boolean(booked),
            date: new Date(date).toJSON()
          }
        }
      }
    },
    removePost: {
      reducer(state, action) {
        return state.filter(post => post.id !== action.payload)
      }
    }

  }
})

const store = configureStore({ reducer: combineReducers({ posts: postsSlice.reducer }) }, applyMiddleware(thunk))
const { setPosts, addPost, setIsBookedPost, removePost } = postsSlice.actions

export const getPosts = () => async dispatch => {
  const posts = await DB.getPosts()
  dispatch(setPosts(posts))
}

export const createPost = ({ title, image }) => async dispatch => {
  const imagePath = FileSystem.documentDirectory + image.split('/').pop();

  await FileSystem.moveAsync({
    from: image,
    to: imagePath
  })

  const id = await DB.createPost({ text: title, img: imagePath, booked: 0, date: new Date().toString() })

  return dispatch(addPost({ id, img: imagePath, text: title, date: new Date().toString(), booked: 0 }))
}

export const toggleFavouritePost = id => async (dispatch, getState) => {
  const post = getState().posts.find(post => post.id === id);
  const isBooked = post.booked;

  await DB.updateIsBooked(!isBooked, id);
  dispatch(setIsBookedPost({ id, booked: !isBooked }))
}

export const deletePost = id => async (dispatch, getState) => {
  const post = getState().posts.find(post => post.id === id);
  
  await DB.deletePost(id);
  await FileSystem.deleteAsync(post.img)
  dispatch(removePost(id))
}

export default store