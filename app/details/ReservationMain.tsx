import { useLocalSearchParams } from "expo-router";
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { images } from "../../constants";
import { useCurrencyStore } from "@/store/useCurrencyStore";

export default function ReservationMain() {
  const { id } = useLocalSearchParams(); // Get activity ID from URL
  const { currency, setCurrency, convertPrice } = useCurrencyStore(); // Access Zustand store
  const basePrice = 20; // Original price in OMR

  const [convertedPrice, setConvertedPrice] = useState(convertPrice(basePrice));

  // Load saved currency when the component mounts
  useEffect(() => {
    setConvertedPrice(convertPrice(basePrice));
  }, [currency]);

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
                {convertedPrice} {currency}
              </Text>
              <Text className="text-md text-gray-700">Kayaking sport albsjfd</Text>
              <Text className="text-sm text-yellow-500">⭐ 5 Stars</Text>
            </View>
          </View>

          {/* Currency Picker */}
          <View className="px-3 py-2">
            <Text className="text-black text-lg font-semibold">Select Currency:</Text>
            <Picker
              selectedValue={currency}
              onValueChange={async (newCurrency) => {
                await setCurrency(newCurrency);
                setConvertedPrice(convertPrice(basePrice)); // Update price when currency changes
              }}
            >
              <Picker.Item label="OMR - Omani Rial" value="OMR" />
              <Picker.Item label="USD - US Dollar" value="USD" />
              <Picker.Item label="EUR - Euro" value="EUR" />
              <Picker.Item label="GBP - British Pound" value="GBP" />
            </Picker>
          </View>

          <View className="h-[100vh]" />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
