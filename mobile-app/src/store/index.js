
import {createSlice, configureStore, combineReducers} from '@reduxjs/toolkit'

const postsSlice = createSlice({
    name: 'posts',
    initialState: [],
    reducers: {
        setPosts: {
            reducer(state, action) {
                return [...action.payload]
            }
        },
        toggleFavouritePost: {
            reducer(state, action) {
                return state.map(post => {
                    if (post.id === action.payload) {
                        return {...post, booked: !post.booked}
                    }
                    return post
                })
            }
        },
        addPost: {
            reducer(state, action) {
                return [...state, action.payload]
            }
        },
        deletePost: {
            reducer(state, action) {
                return state.filter(post => post.id !== action.payload)
            }
        }
        
    }
})

const store = configureStore({ reducer: combineReducers({ posts: postsSlice.reducer }) })

export const {setPosts, toggleFavouritePost, addPost, deletePost} = postsSlice.actions
export default store