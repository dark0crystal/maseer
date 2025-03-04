import { useLocalSearchParams } from "expo-router";
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from "react-native";
import { images } from "../../constants";
import Price from "@/components/shared-components/Price";


export default function ReservationMain() {
  const { id } = useLocalSearchParams(); // Get activity ID from URL


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header top section */}
          <View className="flex flex-row w-screen border-gray-200 border-b-[1px] my-2 py-4">
            {/* Activity image */}
            <View className="relative w-[160px] h-[140px] rounded-lg overflow-hidden">
              <Image source={images.kayak} resizeMode="contain" className="w-full h-full" />
            </View>

            {/* Content section */}
            <View className="px-3 justify-center">
              <Text className="text-lg font-bold">
                <Price price={50} />
              </Text>
              <Text className="text-md text-gray-700">Kayaking sport albsjfd</Text>
              <Text className="text-sm text-yellow-500">⭐ 5 Stars</Text>
            </View>
          </View>

         

          <View className="h-[100vh]" />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
