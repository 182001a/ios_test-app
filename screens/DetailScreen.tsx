// screens/DetailScreen.tsx

import React from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../App'

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>

export default function DetailScreen() {
  const route = useRoute<DetailRouteProp>()
  const { title, description } = route.params

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.descText}>{description}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
