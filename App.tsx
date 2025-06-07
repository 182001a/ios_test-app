import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'
import AddPostScreen from './screens/AddPostScreen'

export type RootStackParamList = {
  Home: undefined
  Detail: { title: string; description: string }
  AddPost: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'ホーム' }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: '詳細画面' }}
        />
        <Stack.Screen
          name="AddPost"
          component={AddPostScreen}
          options={{ title: '投稿画面' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
