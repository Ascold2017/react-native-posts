import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { MainScreen } from '../screens/MainScreen'
import { PostScreen } from '../screens/PostScreen'
import { AboutScreen } from '../screens/AboutScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { FontAwesome } from '@expo/vector-icons'
import { View, TouchableNativeFeedback, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const navigatorOptions = ({ navigation }) => ({
  headerTintColor: 'white',
  headerStyle: { backgroundColor: 'blue' },
  headerBackTitleStyle: { color: 'white' },
  headerRight: () => (<View style={{ paddingRight: 15 }}>
    <TouchableNativeFeedback style={{ padding: 10 }} onPress={() => navigation.navigate('Create')}>
      <FontAwesome name="camera" size={20} color="#fff" />
    </TouchableNativeFeedback>
  </View>),
  headerLeft: () => (<View style={{ flexDirection: 'row', paddingLeft: 15 }}>
    <TouchableNativeFeedback style={{ padding: 10 }} onPress={navigation.toggleDrawer}>
      <FontAwesome name="bars" size={20} color="#fff" />
    </TouchableNativeFeedback>
  </View>)
});

export default () => (
  <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name="MainTabs" options={{ title: 'Home' }}>
        {() => (
          <Tab.Navigator>
            <Tab.Screen
              name="All"
              options={{
                title: 'Home',
                tabBarIcon: ({ size, color }) => <FontAwesome name="home" size={20} color={color} />,
                unmountOnBlur: true
              }}
            >{() => (
              <Stack.Navigator screenOptions={navigatorOptions} initialRouteName="MainAll">
                <Stack.Screen name="MainAll" options={{ title: 'All posts' }} component={MainScreen} />
                <Stack.Screen name="Post" component={PostScreen}/>
              </Stack.Navigator>
            )}
            </Tab.Screen>
            <Tab.Screen
              name="Favourite"
              options={{
                title: 'Favourite',
                tabBarIcon: ({ size, color }) => <FontAwesome name="heart-o" size={20} color={color} />,
                unmountOnBlur: true
              }}>
              {() => (
                <Stack.Navigator screenOptions={navigatorOptions} initialRouteName="MainFavourite">
                  <Stack.Screen name="MainFavourite" options={{ title: 'Favourite posts' }} component={MainScreen} />
                  <Stack.Screen name="FavouritePost" component={PostScreen} />
                </Stack.Navigator>
              )}
            </Tab.Screen>
          </Tab.Navigator>
        )}
      </Drawer.Screen>

      <Drawer.Screen name="About">
        {() => (
          <Stack.Navigator screenOptions={navigatorOptions}>
            <Stack.Screen name="About" component={AboutScreen} />
          </Stack.Navigator>
        )}
      </Drawer.Screen>

      <Drawer.Screen name="Create">
        {() => (
          <Stack.Navigator screenOptions={navigatorOptions}>
            <Stack.Screen name="Create" component={CreateScreen} options={{ title: 'Create new post'}} />
          </Stack.Navigator>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  </NavigationContainer>
)