import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppLoading } from 'expo'
import { bootstrap } from './src/bootstrap'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from './src/screens/MainScreen';
import { PostScreen } from './src/screens/PostScreen';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const Stack = createStackNavigator();

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
      />
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>)
}
