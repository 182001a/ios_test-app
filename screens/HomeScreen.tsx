import React from 'react'
import { View, StyleSheet, ScrollView, Pressable } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Card from '../components/Card'
import { RootStackParamList } from '../App'

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>()

  const handleCardPress = () => {
    navigation.navigate('Detail', {
      title: '遷移先のタイトル',
      description: '詳細画面に渡す説明文なのだ～',
    })
  }

  const handleAddPress = () => {
    navigation.navigate('AddPost')
  }

  return (
    <View style={styles.rootContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card
          title="サンプルカード"
          description="ここをタップすると詳細画面へ移動するのだ～"
          date="2025-06-02"
          place="東京"
          image={require('../assets/image.png')}
          onPress={handleCardPress}
        />
      </ScrollView>
      <Pressable
        style={styles.fab}
        onPress={handleAddPress}
      >
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
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',       // 画面上に重ねるため absolute にするのだ～
    bottom: 32,                 // 画面下から 24px の位置
    right: 24,                  // 画面右から 24px の位置
    width: 56,                  // ボタンの幅
    height: 56,                 // ボタンの高さ
    borderRadius: 28,           // 半径 = 幅／2 で完全な円形にするのだ～
    backgroundColor: '#6CAC1A', // ずんだ色のグリーン（お好みで変更可）✨
    alignItems: 'center',       // アイコンを中央寄せ
    justifyContent: 'center',   // アイコンを中央寄せ
    // iOS の影
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Android の影
    elevation: 5,
  },
})
