'use client'

import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'expo-router'
import { Ionicons, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'

interface Governorate {
  id: number;
  name: string;
}

interface PlaceType {
  id: number;
  name: string;
}

const governorates: Governorate[] = [
  { id: 1, name: 'Muscat' },
  { id: 2, name: 'Dhofar' },
  // ... rest of governorates
];

const placeTypes: PlaceType[] = [
  { id: 1, name: 'Historical Site' },
  { id: 2, name: 'Natural Attraction' },
  // ... rest of place types
];

export default function AddPlaceForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    description_en: '',
    description_ar: '',
    governorate: 1,
    place_type: 1,
    rating: 1,
    latitude: '',
    longitude: ''
  })

  const handleSubmit = async () => {
    if (!formData.name_en || !formData.latitude || !formData.longitude) {
      Alert.alert('Error', 'Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      const { data: authData, error: userError } = await supabase.auth.getUser()
      if (userError || !authData.user) throw new Error('User not authenticated')

      const { error: insertError } = await supabase
        .from('place')
        .insert([{
          name_ar: formData.name_ar,
          name_en: formData.name_en,
          description_ar: formData.description_ar,
          description_en: formData.description_en,
          governorate: formData.governorate,
          place_type: formData.place_type,
          rating: formData.rating,
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
          user_id: authData.user.id
        }])

      if (insertError) throw insertError

      Alert.alert('Success', 'Place added successfully')
      router.back()
    } catch (error) {
      console.log("this is the place info", formData)
      console.error('Error adding place:', error)
      Alert.alert('Error', error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        <View className="py-6">
          <Text className="text-3xl font-bold mb-8 text-black text-center">Add New Place</Text>

          {/* Name EN */}
          <View className="mb-5">
            <Text className="text-gray-800 mb-2 font-semibold">Name (English)</Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg overflow-hidden bg-gray-50">
              <View className="p-3 bg-gray-200">
                <FontAwesome name="building" size={20} color="black" />
              </View>
              <TextInput
                className="flex-1 p-3 bg-gray-50 text-black"
                value={formData.name_en}
                onChangeText={(text) => setFormData({ ...formData, name_en: text })}
                placeholder="Enter place name in English"
                placeholderTextColor="#666"
              />
            </View>
          </View>

          {/* Name AR */}
          <View className="mb-5">
            <Text className="text-gray-800 mb-2 font-semibold">Name (Arabic)</Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg overflow-hidden bg-gray-50">
              <View className="p-3 bg-gray-200">
                <FontAwesome name="building-o" size={20} color="black" />
              </View>
              <TextInput
                className="flex-1 p-3 bg-gray-50 text-black"
                value={formData.name_ar}
                onChangeText={(text) => setFormData({ ...formData, name_ar: text })}
                placeholder="Enter place name in Arabic"
                textAlign="right"
                placeholderTextColor="#666"
              />
            </View>
          </View>

          {/* Description EN */}
          <View className="mb-5">
            <Text className="text-gray-800 mb-2 font-semibold">Description (English)</Text>
            <View className="flex-row border border-gray-400 rounded-lg overflow-hidden bg-gray-50">
              <View className="p-3 bg-gray-200 h-24 items-center justify-center">
                <MaterialIcons name="description" size={20} color="black" />
              </View>
              <TextInput
                className="flex-1 p-3 bg-gray-50 text-black h-24"
                value={formData.description_en}
                onChangeText={(text) => setFormData({ ...formData, description_en: text })}
                placeholder="Enter description in English"
                multiline
                placeholderTextColor="#666"
              />
            </View>
          </View>

          {/* Description AR */}
          <View className="mb-5">
            <Text className="text-gray-800 mb-2 font-semibold">Description (Arabic)</Text>
            <View className="flex-row border border-gray-400 rounded-lg overflow-hidden bg-gray-50">
              <View className="p-3 bg-gray-200 h-24 items-center justify-center">
                <MaterialIcons name="description" size={20} color="black" />
              </View>
              <TextInput
                className="flex-1 p-3 bg-gray-50 text-black h-24"
                value={formData.description_ar}
                onChangeText={(text) => setFormData({ ...formData, description_ar: text })}
                placeholder="Enter description in Arabic"
                multiline
                textAlign="right"
                placeholderTextColor="#666"
              />
            </View>
          </View>

          {/* Latitude */}
          <View className="mb-5">
            <Text className="text-gray-800 mb-2 font-semibold">Latitude</Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg overflow-hidden bg-gray-50">
              <View className="p-3 bg-gray-200">
                <FontAwesome5 name="map-marker-alt" size={20} color="black" />
              </View>
              <TextInput
                className="flex-1 p-3 bg-gray-50 text-black"
                value={formData.latitude}
                onChangeText={(text) => setFormData({ ...formData, latitude: text })}
                placeholder="Enter latitude"
                keyboardType="numeric"
                placeholderTextColor="#666"
              />
            </View>
          </View>

          {/* Longitude */}
          <View className="mb-5">
            <Text className="text-gray-800 mb-2 font-semibold">Longitude</Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg overflow-hidden bg-gray-50">
              <View className="p-3 bg-gray-200">
                <FontAwesome5 name="map-pin" size={20} color="black" />
              </View>
              <TextInput
                className="flex-1 p-3 bg-gray-50 text-black"
                value={formData.longitude}
                onChangeText={(text) => setFormData({ ...formData, longitude: text })}
                placeholder="Enter longitude"
                keyboardType="numeric"
                placeholderTextColor="#666"
              />
            </View>
          </View>

          {/* Governorate */}
          <View className="mb-5">
            <Text className="text-gray-800 mb-2 font-semibold">Governorate</Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg overflow-hidden bg-gray-50">
              <View className="p-3 bg-gray-200 h-12 items-center justify-center">
                <FontAwesome5 name="city" size={20} color="black" />
              </View>
              <View className="flex-1">
                <Picker
                  selectedValue={formData.governorate}
                  onValueChange={(value) => setFormData({ ...formData, governorate: value })}
                  style={{ color: 'black' }}
                >
                  {governorates.map((gov) => (
                    <Picker.Item key={gov.id} label={gov.name} value={gov.id} color='black' />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          {/* Place Type */}
          <View className="mb-5">
            <Text className="text-gray-800 mb-2 font-semibold">Place Type</Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg overflow-hidden bg-gray-50">
              <View className="p-3 bg-gray-200 h-12 items-center justify-center">
                <MaterialIcons name="category" size={20} color="black" />
              </View>
              <View className="flex-1">
                <Picker
                  selectedValue={formData.place_type}
                  onValueChange={(value) => setFormData({ ...formData, place_type: value })}
                  style={{ color: 'black' }}
                >
                  {placeTypes.map((type) => (
                    <Picker.Item key={type.id} label={type.name} value={type.id} color='black'/>
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          {/* Rating */}
          <View className="mb-8">
            <Text className="text-gray-800 mb-2 font-semibold">Rating</Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg p-3 bg-gray-50">
              <View className="mr-3">
                <Ionicons name="star" size={20} color="black" />
              </View>
              <View className="flex-row space-x-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setFormData({ ...formData, rating: star })}
                  >
                    <Ionicons
                      name={star <= formData.rating ? 'star' : 'star-outline'}
                      size={28}
                      color={star <= formData.rating ? "#000" : "#666"}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-black rounded-lg p-4 mb-8 shadow-md"
            onPress={handleSubmit}
            disabled={loading}
          >
            <View className="flex-row items-center justify-center">
              {loading ? (
                <Ionicons name="reload" size={20} color="white" className="mr-2" />
              ) : (
                <Ionicons name="add-circle-outline" size={20} color="white" className="mr-2" />
              )}
              <Text className="text-white text-center font-bold ml-2">
                {loading ? 'Adding...' : 'Add Place'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
