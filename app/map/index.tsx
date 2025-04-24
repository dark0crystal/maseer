'use client'

import { View, Modal, Text, TouchableOpacity, ScrollView, Dimensions, Image, FlatList, useWindowDimensions } from 'react-native'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { WebView } from 'react-native-webview'
import React from 'react'

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
  image_url1?: string
  image_url2?: string
}

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default function MapScreen() {
  const [places, setPlaces] = useState<Place[]>([])
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const router = useRouter()
  const { width, height } = useWindowDimensions()

  useEffect(() => {
    fetchPlaces()
  }, [])

  useEffect(() => {
    // Reset image index when a new place is selected
    if (selectedPlace) {
      setCurrentImageIndex(0)
    }
  }, [selectedPlace])

  const fetchPlaces = async () => {
    try {
      const { data, error } = await supabase.from('place').select('*')
      if (error) throw error
      if (data) setPlaces(data)
    } catch (error) {
      console.error('Error fetching places:', error)
    } finally {
      setLoading(false)
    }
  }

  const leafletHTML = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    />
    <style>
      html, body, #map {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      .place-label {
        background-color: white;
        padding: 4px 10px;
        border-radius: 14px;
        font-size: 13px;
        font-weight: bold;
        box-shadow: 0 1px 6px rgba(0,0,0,0.2);
        white-space: nowrap;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
      const map = L.map('map').setView([23.6145, 58.5453], 8);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      const places = ${JSON.stringify(places)};
      places.forEach(place => {
        const labelIcon = L.divIcon({
          className: 'place-label',
          html: place.name_en,
          iconSize: null
        });

        const marker = L.marker([place.latitude, place.longitude], { icon: labelIcon }).addTo(map);
        marker.on('click', () => {
          window.ReactNativeWebView.postMessage(JSON.stringify(place));
        });
      });
    </script>
  </body>
  </html>
  `

  const onMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data)
    setSelectedPlace(data)
  }

  const getPlaceImages = (place: Place) => {
    const images = []
   
    if (place.image_url1) images.push(place.image_url1)
    if (place.image_url2) images.push(place.image_url2)
    return images.length > 0 ? images : []
  }

  const nextImage = () => {
    if (selectedPlace) {
      const images = getPlaceImages(selectedPlace)
      if (images.length > 1) {
        setCurrentImageIndex((currentImageIndex + 1) % images.length)
      }
    }
  }

  const prevImage = () => {
    if (selectedPlace) {
      const images = getPlaceImages(selectedPlace)
      if (images.length > 1) {
        setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length)
      }
    }
  }

  // Calculate responsive image height based on screen size
  const imageHeight = width > 768 ? 300 : 192

  return (
    <View style={{ flex: 1 }}>
    <WebView
      originWhitelist={['*']}
      source={{ html: leafletHTML }}
      style={{ flex: 1 }}
      onMessage={onMessage}
    />
  
    <Modal
      visible={!!selectedPlace}
      transparent
      animationType="slide"
      onRequestClose={() => setSelectedPlace(null)}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl h-3/4">
          <View className="items-center py-2 relative my-2 h-[70px]">
            <View className="w-12 h-1 bg-gray-300 rounded-full" />
            <TouchableOpacity
              className="absolute right-4 top-2 p-2 "
              onPress={() => setSelectedPlace(null)}
            >
              <Ionicons name="close" size={40} color="gray" />
            </TouchableOpacity>
          </View>
  
          <FlatList
            data={[selectedPlace]}
            renderItem={() => (
              <View className="p-4">
                {selectedPlace && (
                  <>
                    <View className="flex-row justify-between items-center mb-4">
                      <Text className="text-2xl font-bold">{selectedPlace.name_en}</Text>
                      <View className="flex-row items-center">
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text className="ml-1">{selectedPlace.rating}</Text>
                      </View>
                    </View>
    
                    <Text className="text-gray-600 mb-2 text-sm">
                      Lat: {selectedPlace.latitude.toFixed(4)}, Lon: {selectedPlace.longitude.toFixed(4)}
                    </Text>
    
                    <View style={{ height: imageHeight }} className="bg-gray-200 rounded-xl mb-4 overflow-hidden relative">
                      {getPlaceImages(selectedPlace).length > 0 ? (
                        <View className="w-full h-full">
                          <Image
                            source={{ uri: getPlaceImages(selectedPlace)[currentImageIndex] }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                          />
                          {getPlaceImages(selectedPlace).length > 1 && (
                            <>
                              <TouchableOpacity 
                                className="absolute left-2 top-1/2 bg-white/70 rounded-full p-2 -translate-y-1/2"
                                onPress={prevImage}
                              >
                                <Ionicons name="chevron-back" size={24} color="black" />
                              </TouchableOpacity>
                              <TouchableOpacity 
                                className="absolute right-2 top-1/2 bg-white/70 rounded-full p-2 -translate-y-1/2"
                                onPress={nextImage}
                              >
                                <Ionicons name="chevron-forward" size={24} color="black" />
                              </TouchableOpacity>
                              <View className="absolute bottom-2 w-full flex-row justify-center">
                                {getPlaceImages(selectedPlace).map((_, index) => (
                                  <View 
                                    key={index}
                                    className={`h-2 w-2 rounded-full mx-1 ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                                  />
                                ))}
                              </View>
                            </>
                          )}
                        </View>
                      ) : (
                        <View className="w-full h-full justify-center items-center">
                          <Text className="text-gray-400">No image</Text>
                        </View>
                      )}
                    </View>
    
                    <Text className="text-lg font-semibold mb-2">Description</Text>
                    <Text className="text-gray-600 mb-4">{selectedPlace.description_en}</Text>
                  </>
                )}
              </View>
            )}
            keyExtractor={() => 'place-details'}
          />
        </View>
      </View>
    </Modal>
  </View>
  
  )
}
