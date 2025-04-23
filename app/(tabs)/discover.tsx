import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DiscoverCards from '@/components/cards/DiscoverCards'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import images from '@/constants/images'

const Discover = () => {
  const router = useRouter()

  const navigateToMap = () => {
    router.push('/map')
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="p-4">
          <Image 
            source={images.brand} 
            className="w-full h-48 rounded-xl mb-4" 
            resizeMode="cover"
          />
          
          <Text className="text-2xl font-bold mb-2">Discover</Text>
          <Text className="text-gray-600 mb-4">
            Explore amazing outdoor experiences and rental equipment for your next adventure in Oman.
          </Text>
          
          <TouchableOpacity 
            className="bg-black p-6 rounded-xl flex-row items-center justify-center mb-4"
            onPress={navigateToMap}
          >
            <Ionicons name="map" size={24} color="white" />
            <Text className="text-white font-bold ml-2">Open Map View</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Discover