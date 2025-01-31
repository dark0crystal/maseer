import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { images } from "@/constants";

export default function ExperienceCards() {
  const activityCategories = [
    { id: "1", name: "Scuba Diving", description: "Explore underwater beauty", image: images.brand },
    { id: "2", name: "Fishing", description: "Relax and catch some fish", image:images.brand },
    { id: "3", name: "Sea Tour", description: "Enjoy a scenic boat tour", image: images.brand },
    { id: "4", name: "Snorkeling", description: "Discover marine life up close", image: images.brand },
    { id: "5", name: "Jet Ski", description: "Feel the thrill on water", image: images.brand },
    { id: "6", name: "Kayak", description: "Paddle through calm waters", image: images.brand },
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
          <Link href="/" asChild>
            <TouchableOpacity className="w-48 h-64 rounded-xl overflow-hidden relative">
              {/* صورة الغلاف */}
              <Image source={item.image} className="w-full h-full absolute" resizeMode="cover" />
              
              {/* التعتيم فوق الصورة */}
              <View className="absolute inset-0 bg-black opacity-30" />
              
              {/* محتوى البطاقة */}
              <View className="absolute bottom-4 left-4">
                <Text className="text-white text-xl font-bold">{item.name}</Text>
                <Text className="text-white text-sm">{item.description}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}
