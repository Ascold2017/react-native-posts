import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from '../screens/MainScreen'
import { PostScreen } from '../screens/PostScreen'
import { BookedScreen } from '../screens/BookedScreen'
import { FontAwesome } from '@expo/vector-icons'
import { View, TouchableNativeFeedback, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'blue' },
        headerBackTitleStyle: { color: 'white' },
        headerRight: () => (<View style={{ paddingRight: 15 }}>
          <TouchableNativeFeedback style={{ padding: 10 }}>
            <FontAwesome name="camera" size={20} color="#fff" />
          </TouchableNativeFeedback>
        </View>),
        headerLeft: () => (<View style={{ flexDirection: 'row', paddingLeft: 15 }}>
          <TouchableNativeFeedback style={{ padding: 10 }}>
            <FontAwesome name="bars" size={20} color="#fff" />
          </TouchableNativeFeedback>
        </View>)
      }}>
      <Stack.Screen name="Main">
        {
          () => (
            <Tab.Navigator>
              <Tab.Screen
                name="Main"
                component={MainScreen}
                options={{
                  title: 'Home',
                  shifting: true,
                  tabBarIcon: ({ size, color }) => <FontAwesome name="home" size={20} color={color}/>
                }}
              />
              <Tab.Screen
                name="Favourite"
                component={MainScreen}
                options={{
                  title: 'Favourite',
                  shifting: true,
                  tabBarIcon: ({ size, color }) => <FontAwesome name="heart-o" size={20} color={color}/>
                }} />
            </Tab.Navigator>
          )
        }
      </Stack.Screen>
      <Stack.Screen name="Post" component={PostScreen} />
    </Stack.Navigator>
  </NavigationContainer>)