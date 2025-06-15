// screens/DetailScreen.tsx
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../App'

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>

export default function DetailScreen() {
  const route = useRoute<DetailRouteProp>()
  const { title, description, photos = [] } = route.params
  const screenWidth = Dimensions.get('window').width

  return (
    <ScrollView style={styles.container}>
      {/* 画像スライダー */}
      {photos.length > 0 && (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.sliderContainer}
        >
          {photos.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={[styles.slideImage, { width: screenWidth }]}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      )}

      {/* タイトルと説明 */}
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.descText}>{description}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sliderContainer: {
    height: 250,
  },
  slideImage: {
    height: 250,
  },
  textContainer: {
    padding: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  descText: {
    fontSize: 16,
    color: '#555',
  },
})
