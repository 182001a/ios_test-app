// screens/HomeScreen.tsx

import React, { useState, useEffect } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
import Card from '../components/Card'
import { Post } from '../types'
import { RootStackParamList } from '../App'

type HomeNavProp = NativeStackNavigationProp<RootStackParamList>

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>()

  const [posts, setPosts] = useState<Post[]>([])

  // AsyncStorage から読み込み
  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem('posts')
        if (stored) setPosts(JSON.parse(stored))
      } catch {
        Alert.alert('投稿の読み込みに失敗しました')
      }
    }
    load()
    // フォーカスごとに再読み込み
    const unsubscribe = navigation.addListener('focus', load)
    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.rootContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.content.slice(0, 10)}
            description={post.content}
            date={post.date}
            place={post.address}
            image={post.photos[0] ?? undefined}
            onPress={() =>
              navigation.navigate('Detail', {
                title: '詳細',
                description: post.content,
                photos: post.photos,
              })
            }
          />
        ))}
      </ScrollView>
      <Pressable style={styles.fab} onPress={() => navigation.navigate('AddPost')}>
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'flex-start',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6CAC1A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
})
