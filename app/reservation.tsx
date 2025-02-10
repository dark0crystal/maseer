
import { useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView , Image} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";
import { useRouter } from "expo-router";
import { images } from "../constants";


export default function Reservation() {
  const { id } = useLocalSearchParams(); // Get activity ID from URL

  return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 bg-gray-100">
            <ScrollView
                className="bg-white p-4"
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
                keyboardShouldPersistTaps="handled"
            >
            {/* Activity image */}
            <View className="relative w-full h-72 rounded-lg overflow-hidden">
                <Image source={images.kayak} width={200} height={200} resizeMode="cover" />
            </View>
            <View className="h-[100vh]"/>
            
            </ScrollView>
        </View>
    </TouchableWithoutFeedback>
  );
}