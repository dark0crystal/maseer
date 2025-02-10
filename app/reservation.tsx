
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
            <View className="flex flex-row">
            {/* Activity image */}
                <View className=" relative w-[160px] h-[140px] rounded-lg overflow-hidden">
                    <Image 
                    source={images.kayak}  
                    resizeMode="contain"  
                    className="w-full h-full "
                    />
                </View>
                
                {/* Content section */}
                <View className="border px-3 justify-center">
                    <Text className="text-lg font-bold">20 OMR</Text>
                    <Text className="text-md text-gray-700">Kayaking</Text>
                    <Text className="text-sm text-yellow-500">⭐ 5 Stars</Text>
                </View>
                </View>

            <View className="h-[100vh]"/>

            </ScrollView>
        </View>
    </TouchableWithoutFeedback>
  );
}