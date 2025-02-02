import { View, Text, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { images } from "../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";

// بيانات وهمية مؤقتة - استبدلها بقاعدة بيانات لاحقًا
const activityCategories = [
  { id: "1", location: "Muscat", title: "Scuba Diving", type: "Hard", female: true, price: "100.0", companyName: "MfqodLTD", img: images.kayak },
  { id: "2", location: "Bidyah", title: "صيد السمك", type: "Easy", female: true, price: "1200", companyName: "Masser", img: images.brand },
  { id: "3", location: "Sidab", title: "Sea tour", type: "Mid", female: false, price: "20", companyName: "Masser Almotahidah", img: images.kayak },
  { id: "4", location: "Qatar", title: "Snorkeling", type: "Hard", female: false, price: "30.5", companyName: "Masseeer trips", img: images.brand },
  { id: "5", location: "Saudi", title: "Jet ski", type: "Easy", female: true, price: "30000", companyName: "Oman trips LTD", img: images.kayak },
  { id: "6", location: "Dubai", title: "Kayak", type: "Mid", female: false, price: "49.5", companyName: "MfqodLTD", img: images.brand },
];

export default function ActivityDetails() {
  const { id } = useLocalSearchParams(); // التقاط ID من الرابط
  const activity = activityCategories.find((item) => item.id === id); // البحث عن النشاط المطابق

  if (!activity) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-semibold text-red-500">Activity not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* صورة النشاط */}
      <View className="relative w-full h-[300px] rounded-lg overflow-hidden">
        <Image source={activity.img} className="absolute w-full h-full" resizeMode="cover" />
        {activity.female && (
          <View className="absolute bottom-2 left-2 bg-red-500 px-4 py-1 rounded-lg">
            <Text className="text-white font-semibold">Female Only</Text>
          </View>
        )}
      </View>

      {/* تفاصيل النشاط */}
      <View className="mt-4 px-3">
        <Text className="text-2xl font-bold">{activity.title}</Text>
        <Text className="text-gray-600 mt-1">
          <Ionicons name="location-outline" size={16} color="black" /> {activity.location}
        </Text>
        <Text className="text-lg font-semibold mt-2">
          Price: {activity.price} R.O
        </Text>
        <Text className="text-gray-600 mt-2">Company: {activity.companyName}</Text>
        <Text className="text-gray-600 mt-2">Difficulty: {activity.type}</Text>
      </View>
    </ScrollView>
  );
}
