// App.tsx

import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Card from './components/Card'

export default function App() {
  return (
    // この View は背景色や中央寄せのラッパーとして残す
    <View style={styles.rootContainer}>
      {/* ScrollView で中身を包むのだ～ */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}  // flexGrow:1 を指定
        // ※縦方向のスクロールバーを見せたくない場合は showsVerticalScrollIndicator={false} を追加
      >
        <Text style={styles.titleText}>何かサンプルアプリを作るぞ！</Text>

        {/* カードを複数配置するイメージ */}
        <Card
          title="カード１"
          description="これはサンプルのカードなのだ～"
          date="2025-01-01"
          place="東京"
          image={require('./assets/image.png')}
        />

        <Card
          title="カード２"
          description="別のサンプルカードなのだ～"
          date="2025-02-01"
          place="大阪"
          image={require('./assets/image.png')}
        />

        {/* 他に何もなくても、flexGrow:1 により画面いっぱいまでスペース確保される */}
        {/* この余白部分を引っ張ることでスクロールできるのだ～ */}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  // 画面全体の背景＋上下中央寄せを担当
  rootContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // ScrollView の contentContainerStyle 用
  scrollContent: {
    flexGrow: 1,               // これがミソ！常に画面と同じ高さ以上の領域を確保するのだ～✨
    padding: 16,               // スクロール時の余白を指定
    alignItems: 'center',      // 子要素（Text や Card）を横方向に中央寄せ
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
})
