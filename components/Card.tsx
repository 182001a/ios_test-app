// Card.tsx

import React from 'react'
import { View, Text, StyleSheet, ViewStyle, TextStyle, Image, ImageStyle, ImageSourcePropType } from 'react-native'

interface CardProps {
  title?: string
  description?: string
  image?: string | ImageSourcePropType
  date?: string
  place?: string
}

function Card({ title, description, date, place, image }: CardProps) {
  return (
    <View style={styles.cardContainer}>
      {title && <Text style={styles.cardTitle}>{title}</Text>}
      {description && <Text style={styles.cardDescription}>{description}</Text>}
      {date && <Text style={styles.cardDate}>{date}</Text>}
      {place && <Text style={styles.cardPlace}>{place}</Text>}
      {image ? (
        typeof image === 'string' ? (
          <Image source={{ uri: image }} style={styles.cardImage} resizeMode="cover" />
        ) : (
          <Image source={image} style={styles.cardImage} resizeMode="cover" />
        )
      ) : null}
    </View>
  )
}

export default Card

const styles = StyleSheet.create<{
  cardContainer: ViewStyle
  cardTitle: TextStyle
  cardDescription: TextStyle
  cardDate: TextStyle
  cardPlace: TextStyle
  cardImage: ImageStyle
}>({
  cardContainer: {
    width: 300, 
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    // iOS の影
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android の影
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  cardDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  cardPlace: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 4,
    marginTop: 8,
  },
})
