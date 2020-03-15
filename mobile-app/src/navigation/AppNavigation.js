import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Main } from '../screens/MainScreen'
import { Post } from '../screens/PostScreen'
const Navigator = createStackNavigator({
    Main,
    Post
}, { initialRouteName: 'Main' })

export const AppNavigation = createAppContainer(Navigator)