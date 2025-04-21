'use client'

import { View, Text, TouchableOpacity, Modal, ScrollView, Dimensions, Animated, Platform } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import MapView, { Marker, Callout, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { supabase } from '@/lib/supabase'
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

interface Place {
  id: string
  name_en: string
  name_ar: string
  description_en: string
  description_ar: string
  governorate: number
  place_type: number
  rating: number
  latitude: number
  longitude: number
}

export default function MapScreen() {
  const [places, setPlaces] = useState<Place[]>([])
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [loading, setLoading] = useState(true)
  const [showList, setShowList] = useState(false)
  const [region, setRegion] = useState<Region>({
    latitude: 23.6145,
    longitude: 58.5453,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const router = useRouter()
  const mapRef = useRef<MapView>(null)
  const scrollViewRef = useRef<ScrollView>(null)
  const slideAnimation = useRef(new Animated.Value(0)).current
  const { width, height } = Dimensions.get('window')

  useEffect(() => {
    fetchPlaces()
  }, [])

  const fetchPlaces = async () => {
    try {
      const { data, error } = await supabase
        .from('place')
        .select('*')
      
      if (error) throw error
      if (data) setPlaces(data)
    } catch (error) {
      console.error('Error fetching places:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkerPress = (place: Place, index: number) => {
    setSelectedPlace(place)
    
    // Animate to the selected marker
    mapRef.current?.animateToRegion({
      latitude: place.latitude,
      longitude: place.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 500)

    // Scroll to the corresponding card
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * (width - 40), animated: true })
    }
  }

  const handleCardPress = (place: Place) => {
    router.push({
      pathname: 'place/[id]' as any,
      params: { id: place.id }
    })
  }

  const toggleView = () => {
    setShowList(!showList)
    Animated.timing(slideAnimation, {
      toValue: showList ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const onRegionChange = (newRegion: Region) => {
    setRegion(newRegion)
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1">
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          className="flex-1"
          region={region}  // Corrected to `region` prop
          onRegionChangeComplete={onRegionChange}  // Updated to `onRegionChangeComplete` to handle region changes properly
          showsUserLocation
          showsMyLocationButton
          showsCompass
          showsScale
          showsBuildings
          showsTraffic={false}
          showsIndoors
          mapPadding={{ top: 0, right: 0, bottom: 120, left: 0 }}
          style={{ width: '100%', height: '100%' }}
        >
          {places.map((place) => (
            <Marker
              key={place.id}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              onPress={() => handleMarkerPress(place, places.indexOf(place))}
              pinColor={selectedPlace?.id === place.id ? '#FF5A5F' : '#000000'}
            >
              <View className={`px-3 py-2 rounded-full ${selectedPlace?.id === place.id ? 'bg-[#FF5A5F]' : 'bg-white'} shadow-lg border border-gray-200`}>
                <Text className={`font-bold ${selectedPlace?.id === place.id ? 'text-white' : 'text-black'}`}>
                  {place.rating.toFixed(1)}
                </Text>
              </View>
            </Marker>
          ))}
        </MapView>

        {/* Top Bar */}
        <View className="absolute top-4 left-4 right-4 flex-row justify-between">
          <TouchableOpacity 
            className="bg-white p-3 rounded-full shadow-md"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          
          <View className="flex-row">
            <TouchableOpacity 
              className="bg-white p-3 rounded-full shadow-md mr-2"
              onPress={() => mapRef.current?.animateToRegion(region, 500)}
            >
              <FontAwesome name="location-arrow" size={22} color="#FF5A5F" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="bg-white p-3 rounded-full shadow-md"
              onPress={toggleView}
            >
              <MaterialIcons name={showList ? "map" : "list"} size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Card Carousel */}
        <View className="absolute bottom-4 left-0 right-0">
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={width - 40}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 20 }}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / (width - 40))
              if (places[index]) {
                setSelectedPlace(places[index])
                mapRef.current?.animateToRegion({
                  latitude: places[index].latitude,
                  longitude: places[index].longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }, 500)
              }
            }}
          >
            {places.map((place) => (
              <TouchableOpacity
                key={place.id}
                className="bg-white rounded-xl shadow-lg mr-4 border border-gray-100"
                style={{ width: width - 80 }}
                onPress={() => handleCardPress(place)}
                activeOpacity={0.9}
              >
                <View className="p-4">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-lg font-bold">{place.name_en}</Text>
                    <View className="flex-row items-center bg-[#FF5A5F] px-2 py-1 rounded-lg">
                      <Ionicons name="star" size={16} color="white" />
                      <Text className="ml-1 text-white font-bold">{place.rating}</Text>
                    </View>
                  </View>
                  
                  <Text className="text-gray-500 text-sm mb-2" numberOfLines={2}>
                    {place.description_en}
                  </Text>
                  
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gray-600 text-xs">
                      Lat: {place.latitude.toFixed(4)}, Lon: {place.longitude.toFixed(4)}
                    </Text>
                    <Text className="text-[#FF5A5F] font-bold">View Details</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* List View (Animated) */}
        <Animated.View 
          className="absolute bg-white rounded-t-3xl shadow-lg"
          style={{
            top: 80,
            left: 0,
            right: 0,
            bottom: 0,
            transform: [
              {
                translateY: slideAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1000, 0]
                })
              }
            ],
            opacity: slideAnimation,
            display: showList ? 'flex' : 'none'
          }}
        >
          <View className="items-center py-2">
            <View className="w-12 h-1 bg-gray-300 rounded-full" />
          </View>
          
          <ScrollView className="p-4">
            {places.map((place) => (
              <TouchableOpacity
                key={place.id}
                className="bg-white border border-gray-200 rounded-xl mb-4 overflow-hidden shadow-sm"
                onPress={() => handleCardPress(place)}
              >
                <View className="h-32 bg-gray-200 justify-center items-center">
                  <Text className="text-gray-400">No image</Text>
                </View>
                
                <View className="p-3">
                  <View className="flex-row justify-between items-center mb-1">
                    <Text className="text-lg font-bold">{place.name_en}</Text>
                    <View className="flex-row items-center bg-[#FF5A5F] px-2 py-1 rounded-lg">
                      <Ionicons name="star" size={16} color="white" />
                      <Text className="ml-1 text-white font-bold">{place.rating}</Text>
                    </View>
                  </View>
                  
                  <Text className="text-gray-500 text-sm mb-2" numberOfLines={2}>
                    {place.description_en}
                  </Text>
                  
                  <Text className="text-gray-600 text-xs">
                    Lat: {place.latitude.toFixed(4)}, Lon: {place.longitude.toFixed(4)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}
