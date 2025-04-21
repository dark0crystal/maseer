import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DiscoverCards from '@/components/cards/DiscoverCards'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const Discover = () => {
  const router = useRouter()

  const navigateToMap = () => {
    router.push('/map')
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Discover</Text>
        <TouchableOpacity 
          className="bg-black p-4 rounded-xl flex-row items-center justify-center mb-4"
          onPress={navigateToMap}
        >
          <Ionicons name="map" size={20} color="white" />
          <Text className="text-white font-bold ml-2">Open Map View</Text>
        </TouchableOpacity>
        <DiscoverCards/>
      </View>
    </SafeAreaView>
  )
}

export default Discover