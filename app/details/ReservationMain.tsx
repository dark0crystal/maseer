'use client'

import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useReservationStore } from '../../store/reservationStore';
import { useCurrencyStore } from '../../store/useCurrencyStore';

export default function ReservationMain() {
  const router = useRouter();
  const {
    selectedDates,
    numberOfGuests,
    totalPrice,
    activityDetails,
  } = useReservationStore();

  const { currency, convertPrice } = useCurrencyStore();

  const handleContinue = () => {
    // Simple validation to ensure data is filled
    if (!activityDetails || !selectedDates.startDate || !selectedDates.endDate) {
      Alert.alert('Incomplete Reservation', 'Please complete the previous steps before continuing.');
      return;
    }
    
      router.push("/details/PaymentScreen")
   
    
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">
        <View className="py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold">Reservation Summary</Text>
        </View>

        <ScrollView className="flex-1">
          {/* Activity Details */}
          <View className="py-6 border-b border-gray-200">
            <Text className="text-xl font-semibold mb-4">{activityDetails?.title}</Text>
            <View className="flex-row items-center mb-2">
              <Ionicons name="calendar" size={20} color="black" />
              <Text className="ml-2 text-gray-600">
                {selectedDates?.startDate?.toLocaleDateString()} - {selectedDates?.endDate?.toLocaleDateString()}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="people" size={20} color="black" />
              <Text className="ml-2 text-gray-600">{numberOfGuests} guests</Text>
            </View>
          </View>

          {/* Price Breakdown */}
          <View className="py-6 border-b border-gray-200">
            <Text className="text-xl font-semibold mb-4">Price Details</Text>
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Base price</Text>
                <Text className="text-gray-600">
                  {currency} {convertPrice(activityDetails?.price)}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Number of guests</Text>
                <Text className="text-gray-600">x{numberOfGuests}</Text>
              </View>
              <View className="flex-row justify-between mt-4">
                <Text className="font-semibold">Total</Text>
                <Text className="font-semibold">
                  {currency} {convertPrice(totalPrice)}
                </Text>
              </View>
            </View>
          </View>

          {/* Cancellation Policy */}
          <View className="py-6">
            <Text className="text-xl font-semibold mb-4">Cancellation Policy</Text>
            <Text className="text-gray-600">
              Free cancellation up to 24 hours before the activity. No refunds after that.
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Action Bar */}
        <View className="py-4 border-t border-gray-200">
          <TouchableOpacity
            className="bg-black py-4 rounded-lg"
            onPress={handleContinue}
          >
            <Text className="text-white text-center font-semibold">
              Proceed to Payment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
