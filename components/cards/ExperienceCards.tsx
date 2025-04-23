import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { images } from "@/constants";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";

export default function ExperienceCards() {
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    name: string;
    image: any;
  } | null>(null);
  const [places, setPlaces] = useState<
    Array<{
      id: string;
      name_en: string;
      rating: number;
      description_en: string;
      latitude?: number;
      longitude?: number;
      location?: string;
    }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<{
    id: string;
    name_en: string;
    rating: number;
    description_en: string;
    latitude?: number;
    longitude?: number;
    location?: string;
  } | null>(null);

  const activityCategories = [
    { id: "1", name: "Scuba Diving", image: images.brand },
    { id: "2", name: "Fishing", image: images.kayak },
    { id: "3", name: "Sea Tour", image: images.brand },
    { id: "4", name: "Snorkeling", image: images.brand },
    { id: "5", name: "Jet Ski", image: images.brand },
    { id: "6", name: "Kayak", image: images.brand },
  ];

  useEffect(() => {
    if (selectedCategory) {
      fetchPlacesByCategory(selectedCategory.id);
    }
  }, [selectedCategory]);

  const fetchPlacesByCategory = async (categoryId: string) => {
    setLoading(true);
    try {
      const typeId = parseInt(categoryId);
      const { data, error } = await supabase
        .from("place")
        .select("id, name_en, rating, description_en, latitude, longitude")
        .eq("place_type", typeId);

      if (error) throw error;
      setPlaces(data || []);
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = (category: {
    id: string;
    name: string;
    image: any;
  }) => {
    setSelectedCategory(category);
  };

  const handleViewDetails = (place: {
    id: string;
    name_en: string;
    rating: number;
    description_en: string;
    latitude?: number;
    longitude?: number;
    
  }) => {
    // Make sure we have all the required properties before setting the selected place
    if (place && place.id && place.name_en) {
      setSelectedPlace({
        id: place.id,
        name_en: place.name_en,
        rating: place.rating || 0,
        description_en: place.description_en || "",
        latitude: place.latitude,
        longitude: place.longitude,
   
      });
    } else {
      console.error("Invalid place data:", place);
    }
  };

  return (
    <View className="p-4">
      <FlatList
        data={activityCategories}
        keyExtractor={(category) => category.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCategoryPress(item)}>
            <View className="w-full">
              <View className="h-64 rounded-xl overflow-hidden relative">
                <Image
                  source={item.image}
                  className="w-full h-full absolute"
                  resizeMode="cover"
                />
                <View className="absolute inset-0 bg-black opacity-30" />
                <View className="absolute bottom-4 left-4">
                  <Text className="text-white text-xl font-bold">{item.name}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={!!selectedCategory}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedCategory(null)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl h-3/4">
            <View className="items-center py-2 relative my-2 h-[70px]">
              <View className="w-12 h-1 bg-gray-300 rounded-full" />
              <Text className="text-xl font-bold mt-2">
                {selectedCategory?.name} Places
              </Text>
              <TouchableOpacity
                className="absolute right-4 top-2 p-2"
                onPress={() => setSelectedCategory(null)}
              >
                <Ionicons name="close" size={40} color="gray" />
              </TouchableOpacity>
            </View>

            {loading ? (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#2563eb" />
                <Text className="text-gray-600 mt-2">Loading places...</Text>
              </View>
            ) : (
              <ScrollView className="p-4">
                {places.length > 0 ? (
                  places.map((place) => (
                    <View
                      key={place.id}
                      className="bg-gray-50 rounded-xl p-4 mb-4 shadow-sm"
                    >
                      <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-xl font-bold">{place.name_en}</Text>
                        <View className="flex-row items-center">
                          <Ionicons name="star" size={16} color="#FFD700" />
                          <Text className="ml-1">{place.rating}</Text>
                        </View>
                      </View>
                      <View className="h-40 bg-gray-200 rounded-xl mb-3 justify-center items-center">
                        <Text className="text-gray-400">No image</Text>
                      </View>
                      <Text className="text-gray-600">{place.description_en}</Text>
                      <TouchableOpacity
                        className="bg-blue-600 rounded-lg p-3 mt-3"
                        onPress={() => handleViewDetails(place)}
                      >
                        <Text className="text-white text-center font-bold">
                          View Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <View className="flex-1 justify-center items-center py-10">
                    <Text className="text-gray-500">No places found for this category</Text>
                  </View>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

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
                className="absolute right-4 top-2 p-2"
                onPress={() => setSelectedPlace(null)}
              >
                <Ionicons name="close" size={40} color="gray" />
              </TouchableOpacity>
            </View>

            <ScrollView className="p-4">
              {selectedPlace && (
                <>
                  <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-2xl font-bold">{selectedPlace.name_en}</Text>
                    <View className="flex-row items-center">
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <Text className="ml-1">{selectedPlace.rating}</Text>
                    </View>
                  </View>

                  <View className="h-48 bg-gray-200 rounded-xl mb-4 justify-center items-center">
                    <Text className="text-gray-400">No image</Text>
                  </View>

                  <Text className="text-lg font-semibold mb-2">Description</Text>
                  <Text className="text-gray-600 mb-4">{selectedPlace.description_en}</Text>

                 

                  {selectedPlace.latitude && selectedPlace.longitude && (
                    <>
                      <Text className="text-lg font-semibold mb-2">Coordinates</Text>
                      <Text className="text-gray-600 mb-4">
                        {selectedPlace.latitude}, {selectedPlace.longitude}
                      </Text>
                    </>
                  )}

                  <TouchableOpacity 
                    className="bg-blue-600 rounded-lg p-4 mt-3"
                    onPress={() => setSelectedPlace(null)}
                  >
                    <Text className="text-white text-center font-bold">Book Now</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
