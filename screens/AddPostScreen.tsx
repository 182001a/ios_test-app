import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function AddPostScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>日付</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>内容</Text>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 16, marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 4 },
  photoList: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 12 },
  thumb: { width: 80, height: 80, marginRight: 8, marginBottom: 8 },
});
