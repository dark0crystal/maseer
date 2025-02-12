import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../constants";

export default function ManageActivity() {
//   const navigation = useNavigation();

  const activityCategories = [
    { id: "1", location: "Muscat", title: "Scuba Diving", type: "Hard", female: true, price: "100.0", companyName: "MfqodLTD", img: images.kayak },
    { id: "2", location: "Bidyah", title: "صيد السمك", type: "Easy", female: true, price: "1200", companyName: "Masser", img: images.brand },
    { id: "3", location: "Sidab", title: "Sea tour", type: "Mid", female: false, price: "20", companyName: "Masser Almotahidah", img: images.kayak },
    { id: "4", location: "Qatar", title: "Snorkeling", type: "Hard", female: false, price: "30.5", companyName: "Masseeer trips", img: images.brand },
    { id: "5", location: "Saudi", title: "Jet ski", type: "Easy", female: true, price: "30000", companyName: "Oman trips LTD", img: images.kayak },
    { id: "6", location: "Dubai", title: "Kayak", type: "Mid", female: false, price: "49.5", companyName: "MfqodLTD", img: images.brand },
  ];

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4 text-gray-800">Manage Activities</Text>

      <FlatList
        data={activityCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-gray-100 rounded-lg shadow-md p-4 mb-4">
            <Image source={item.img} className="w-full h-40 rounded-md mb-2" />
            <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
            <Text className="text-gray-600">{item.location} - {item.companyName}</Text>
            <Text className="text-gray-700">Difficulty: {item.type} | Price: ${item.price}</Text>

            {/* Navigation Button */}
            <TouchableOpacity
            //   onPress={() => navigation.navigate("ActivityDetails", { activity: item })}
              className="mt-3 bg-blue-500 p-2 rounded-md"
            >
              <Text className="text-white text-center font-semibold">View Details</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
