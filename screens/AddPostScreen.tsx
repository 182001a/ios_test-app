import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import { Post } from '../types'

// 日本語ロケール設定
LocaleConfig.locales['ja'] = {
  monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  monthNamesShort: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
  dayNamesShort: ['日','月','火','水','木','金','土'],
  today: '今日',
}
LocaleConfig.defaultLocale = 'ja'

export default function AddPostScreen() {
  const navigation = useNavigation()

  // ステート定義
  const [content, setContent] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [photos, setPhotos] = useState<string[]>([])
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | undefined>(undefined)
  const [address, setAddress] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showCalendar, setShowCalendar] = useState<boolean>(false)

  // 初期処理（日付セット & 位置取得）
  useEffect(() => {
    const now = new Date()
    const japanTime = now.getTime() + 9 * 60 * 60 * 1000
    setSelectedDate(new Date(japanTime).toISOString().slice(0, 10))

    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('権限がありません', '位置情報の利用を許可してください')
        return
      }
      const loc = await Location.getCurrentPositionAsync({})
      const { latitude, longitude } = loc.coords
      setCoords({ latitude, longitude })
      const [place] = await Location.reverseGeocodeAsync({ latitude, longitude })
      setAddress(`${place.city ?? ''}${place.street ?? ''}`)
    })()
  }, [])

  // 検索機能
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('検索キーワードを入力してください')
      return
    }
    try {
      const geos = await Location.geocodeAsync(searchQuery)
      if (geos.length === 0) {
        Alert.alert('見つかりませんでした')
        return
      }
      const { latitude, longitude } = geos[0]
      setCoords({ latitude, longitude })
      setAddress(searchQuery)
    } catch {
      Alert.alert('検索中にエラーが発生しました')
    }
  }

  // 画像選択
  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('権限がありません', '写真ライブラリへのアクセス権限が必要です')
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 4,
      quality: 0.7,
    })
    if (result.canceled) return
    setPhotos(prev => {
      const merged = [...prev, ...result.assets.map(a => a.uri)]
      if (merged.length > 4) Alert.alert('写真は最大4枚までです')
      return merged.slice(0, 4)
    })
  }

  // 投稿保存
  const handleSubmit = async () => {
    if (!content.trim()) {
      Alert.alert('内容を入力してください')
      return
    }
    try {
      const stored = await AsyncStorage.getItem('posts')
      const posts: Post[] = stored ? JSON.parse(stored) : []
      const newPost: Post = {
        id: Date.now().toString(),
        date: selectedDate,
        content,
        photos,
        address,
        coords,
      }
      await AsyncStorage.setItem('posts', JSON.stringify([newPost, ...posts]))
      navigation.goBack()
    } catch {
      Alert.alert('保存に失敗しました')
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 日付 */}
        <Text style={styles.label}>日付</Text>
        <TouchableOpacity onPress={() => setShowCalendar(prev => !prev)}>
          <Text style={styles.dateLabel}>{selectedDate} ▼</Text>
        </TouchableOpacity>
        {showCalendar && (
          <Calendar
            current={selectedDate}
            onDayPress={(day: DateData) => {
              setSelectedDate(day.dateString)
              setShowCalendar(false)
            }}
            markedDates={{ [selectedDate]: { selected: true, selectedColor: '#0066CC' } }}
            theme={calendarTheme}
          />
        )}

        {/* 場所 */}
        <Text style={styles.label}>場所</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={address || '住所を検索'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Button title="検索" onPress={handleSearch} />
        </View>
        {address ? <Text style={styles.addressText}>{address}</Text> : null}
        {coords && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              ...coords,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={coords} />
          </MapView>
        )}

        {/* 内容 */}
        <Text style={styles.label}>内容</Text>
        <TextInput
          style={[styles.input, { height: 120 }]}
          placeholder="今日の出来事を入力"
          multiline
          value={content}
          onChangeText={setContent}
        />

        {/* 写真 */}
        <View style={styles.photoHeader}>
          <Button title="写真を選択" onPress={pickImages} />
          <Text style={styles.counterText}>{photos.length}/4 枚</Text>
        </View>
        {photos.length > 0 && (
          <View style={styles.photoList}>
            {photos.map((uri, idx) => (
              <Image key={idx} source={{ uri }} style={styles.thumb} />
            ))}
          </View>
        )}

        {/* 投稿 */}
        <View style={styles.submit}>
          <Button title="投稿" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const calendarTheme = {
  todayTextColor: '#FF0000',
  selectedDayBackgroundColor: '#0066CC',
  arrowColor: '#0066CC',
  textMonthFontSize: 16,
  textDayFontSize: 14,
  textSectionTitleColor: '#0066CC',
  textDayHeaderFontSize: 14,
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 16 },
  label: { fontSize: 16, marginTop: 12 },
  dateLabel: { fontSize: 16, paddingVertical: 8, color: '#0066CC' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  addressText: { fontSize: 14, marginTop: 4 },
  map: { width: '100%', height: 150, marginTop: 8, borderRadius: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 4, marginTop: 4 },
  photoHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  counterText: { marginLeft: 12, fontSize: 16, color: '#333' },
  photoList: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 },
  thumb: { width: 80, height: 80, marginRight: 8, marginBottom: 8, borderRadius: 4 },
  submit: { marginTop: 24 },
})