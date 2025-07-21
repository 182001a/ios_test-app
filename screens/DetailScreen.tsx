// screens/DetailScreen.tsx
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from 'react-native'
import ImageViewing from 'react-native-image-viewing'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../App'

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>

export default function DetailScreen() {
  const route = useRoute<DetailRouteProp>()
  const { title, description, photos = [] } = route.params
  const screenWidth = Dimensions.get('window').width
  const [activeSlide, setActiveSlide] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / screenWidth)
    if (slide !== activeSlide) {
      setActiveSlide(slide)
    }
  }

  const onImagePress = (index: number) => {
    setCurrentImageIndex(index)
    setModalVisible(true)
  }

  const closeImageModal = () => {
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* 画像スライダー */}
        {photos.length > 0 && (
          <View style={styles.sliderWrapper}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              style={styles.sliderContainer}
            >
              {photos.map((uri, index) => (
                <TouchableOpacity key={index} onPress={() => onImagePress(index)}>
                  <Image
                    source={{ uri }}
                    style={[styles.slideImage, { width: screenWidth }]}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.paginationContainer}>
              {photos.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    activeSlide === index && styles.paginationDotActive,
                  ]}
                />
              ))}
            </View>
          </View>
        )}

        {/* タイトルと説明 */}
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.descText}>{description}</Text>
        </View>
      </ScrollView>

      <ImageViewing
        images={photos.map((uri) => ({ uri }))}
        imageIndex={currentImageIndex}
        visible={modalVisible}
        onRequestClose={closeImageModal}
        animationType="fade"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sliderWrapper: {
    height: 250,
    position: 'relative',
  },
  sliderContainer: {
    height: '100%',
  },
  slideImage: {
    height: '100%',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
    width: 10,
    height: 10,
    borderRadius: 5,
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
