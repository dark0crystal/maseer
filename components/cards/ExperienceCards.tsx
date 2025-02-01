import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { images } from "@/constants";
import React from "react";

export default function ExperienceCards() {
  const activityCategories = [
    { id: "1", name: "Scuba Diving", image: images.brand ,to:"/create" as const},
    { id: "2", name: "Fishing", image: images.kayak ,to:"/profile" as const},
    { id: "3", name: "Sea Tour", image: images.brand ,to:"/" as const},
    { id: "4", name: "Snorkeling", image: images.brand ,to:"/" as const},
    { id: "5", name: "Jet Ski",  image: images.brand ,to:"/create" as const},
    { id: "6", name: "Kayak", image: images.brand ,to:"/create" as const},
  ];

  return (
    <View className="p-4">
      <FlatList
        data={activityCategories}
        keyExtractor={(category) => category.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <Link href={`${item.to }`} >
            <View className="w-48">
              {/* الصورة */}
              <TouchableOpacity className="h-64 rounded-xl overflow-hidden relative">
                <Image source={item.image} className="w-full h-full absolute" resizeMode="cover" />
                {/* تأثير التعتيم */}
                <View className="absolute inset-0 bg-black opacity-30" />
              </TouchableOpacity>

              {/* النصوص أسفل الصورة */}
              <View className="mt-1  flex flex-col items-center">
                <Text className="text-black text-base font-pregular">{item.name}</Text>
              </View>
            </View>
          </Link>
        )}
      />
    </View>
  );
}
