import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Reservation() {
  const { id } = useLocalSearchParams(); // Get activity ID from URL

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl font-bold">Reservation Page</Text>
      <Text className="text-lg mt-4">Activity ID: {id}</Text>
    </View>
  );
}