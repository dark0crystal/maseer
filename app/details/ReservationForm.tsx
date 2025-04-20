'use client'

import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Animated, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { Calendar } from 'react-native-calendars'
import PhoneInput from 'react-native-phone-number-input'
import { useReservationStore } from '@/store/reservationStore'
import { useState, useEffect, useRef } from 'react'
import { ActivityIndicator } from 'react-native'
import { WebView } from 'react-native-webview'
import React from 'react'

interface ActivityDetails {
  id?: string;
  title?: string;
  price?: number;
  img?: string;
  location?: string;
}

export default function ReservationForm() {
  const router = useRouter()
  const { 
    selectedDates, 
    setSelectedDates,
    numberOfGuests,
    setNumberOfGuests,
    phoneNumber,
    setPhoneNumber,
    totalPrice,
    activityDetails,
    setTotalPrice
  } = useReservationStore()
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("dates");

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const calculateDaysBetween = (start: Date, end: Date) => {
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.max(Math.ceil((end.getTime() - start.getTime()) / oneDay), 1);
  };

  const calculateTotalPrice = () => {
    if (
      activityDetails?.price &&
      selectedDates.startDate &&
      selectedDates.endDate &&
      numberOfGuests > 0
    ) {
      const oneDay = 1000 * 60 * 60 * 24;
      const numberOfDays = Math.max(
        Math.ceil((selectedDates.endDate.getTime() - selectedDates.startDate.getTime()) / oneDay),
        1
      );
      return parseFloat((activityDetails.price * numberOfGuests * numberOfDays).toFixed(2));
    }
    return 0;
  };
  
  useEffect(() => {
    if (
      activityDetails?.price &&
      selectedDates.startDate &&
      selectedDates.endDate &&
      numberOfGuests > 0
    ) {
      const total = calculateTotalPrice();
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [numberOfGuests, activityDetails?.price, selectedDates.startDate, selectedDates.endDate]);
  

  const handleDateSelect = (date: any) => {
    if (!selectedDates?.startDate) {
      setSelectedDates({ startDate: new Date(date.dateString), endDate: null });
    } else if (!selectedDates.endDate) {
      if (new Date(date.dateString) < selectedDates.startDate) {
        Alert.alert('Invalid Date', 'End date must be after start date');
        return;
      }
      setSelectedDates({ startDate: selectedDates.startDate, endDate: new Date(date.dateString) });
      setActiveSection("guests");
    } else {
      setSelectedDates({ startDate: new Date(date.dateString), endDate: null });
    }
  };

  const handleGuestChange = (text: string) => {
    const count = parseInt(text) || 0;
    setNumberOfGuests(count);
  };

  const createCheckoutSession = async () => {
    setLoading(true);
    const url = "https://uatcheckout.thawani.om/api/v1/checkout/session";
    const secretKey = "rRQ26GcsZzoEhbrP2HZvLYDbn9C9et";
    const publishableKey = "HGvTMLDssJghr9tlN9gr4DVYt0qyBy";

    // Ensure we have the latest total price calculation
    const finalPrice = calculateTotalPrice();

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "thawani-api-key": secretKey,
        },
        body: JSON.stringify({
          client_reference_id: "123412",
          mode: "payment",
          products: [
            {
              name: activityDetails?.title || "Activity Booking",
              quantity: 1,
              unit_amount: Math.round(finalPrice * 1000), // Convert to baisa (Omani currency subunit)
            },
          ],
          success_url: "https://thw.om/success",
          cancel_url: "https://thw.om/cancel",
          metadata: {
            "Customer name": "Customer",
            "order id": Date.now(),
            "Phone": phoneNumber,
            "Dates": `${selectedDates?.startDate?.toISOString().split('T')[0]} to ${selectedDates?.endDate?.toISOString().split('T')[0]}`,
            "Total Price": `${finalPrice} OMR`,
            "Number of Guests": numberOfGuests,
            "Days": calculateDaysBetween(selectedDates.startDate!, selectedDates.endDate!)
          },
        }),
      });

      const data = await response.json();

      if (response.ok && data.data?.session_id) {
        const sessionId = data.data.session_id;
        const link = `https://uatcheckout.thawani.om/pay/${sessionId}?key=${publishableKey}`;
        setPaymentUrl(link);
        setShowPayment(true);
      } else {
        console.error("Session creation failed:", data);
        setError("Unable to initiate payment session.");
        Alert.alert("Payment Error", "Unable to initiate payment session.");
      }
    } catch (err) {
      console.error("Network or API error:", err);
      setError("Something went wrong. Please try again.");
      Alert.alert("Payment Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!selectedDates.startDate || !selectedDates.endDate) {
      Alert.alert('Date Required', 'Please select both start and end dates');
      setActiveSection("dates");
      return;
    }

    if (!numberOfGuests || numberOfGuests < 1) {
      Alert.alert('Guests Required', 'Please enter a valid number of guests');
      setActiveSection("guests");
      return;
    }

    if (!phoneNumber) {
      Alert.alert('Phone Required', 'Please enter a valid phone number');
      setActiveSection("guests");
      return;
    }

    createCheckoutSession();
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {showPayment ? (
            <View className="flex-1 h-[600px]">
              <WebView source={{ uri: paymentUrl }} style={{ flex: 1 }} />
            </View>
          ) : (
            <Animated.View 
              className="p-5"
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }}
            >
              <View className="mb-6">
                <Text className="text-2xl font-bold mb-2 text-gray-800">Book Your Experience</Text>
                <Text className="text-gray-500">{activityDetails?.title || 'Activity Booking'}</Text>
              </View>
              
              <View className={`mb-8 ${activeSection === "dates" ? "border-2 border-blue-500 rounded-xl p-4" : "p-4"}`}>
                <View className="flex-row items-center mb-4">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                    <Ionicons name="calendar-outline" size={20} color="#3b82f6" />
                  </View>
                  <View>
                    <Text className="text-lg font-semibold text-gray-800">Select Dates</Text>
                    {selectedDates.startDate && selectedDates.endDate && (
                      <Text className="text-blue-500">
                        {formatDate(selectedDates.startDate)} - {formatDate(selectedDates.endDate)}
                      </Text>
                    )}
                  </View>
                </View>
                
                <Calendar 
                  onDayPress={handleDateSelect} 
                  markedDates={{
                    ...(selectedDates.startDate && {
                      [selectedDates.startDate.toISOString().split('T')[0]]: { 
                        startingDay: true, 
                        color: '#3b82f6', 
                        textColor: 'white' 
                      },
                    }),
                    ...(selectedDates.endDate && {
                      [selectedDates.endDate.toISOString().split('T')[0]]: { 
                        endingDay: true, 
                        color: '#3b82f6', 
                        textColor: 'white' 
                      },
                    })
                  }} 
                  markingType="period"
                  theme={{
                    todayTextColor: '#3b82f6',
                    selectedDayBackgroundColor: '#3b82f6',
                    selectedDayTextColor: '#ffffff',
                    arrowColor: '#3b82f6',
                  }}
                />
              </View>

              <View className={`mb-8 ${activeSection === "guests" ? "border-2 border-blue-500 rounded-xl p-4" : "p-4"}`}>
                <View className="flex-row items-center mb-4">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                    <Ionicons name="people-outline" size={20} color="#3b82f6" />
                  </View>
                  <Text className="text-lg font-semibold text-gray-800">Guest Information</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-gray-700 mb-2">Number of Guests</Text>
                  <View className="flex-row items-center">
                    <TouchableOpacity 
                      className="w-10 h-10 bg-gray-200 rounded-l-lg items-center justify-center"
                      onPress={() => setNumberOfGuests(Math.max(1, numberOfGuests - 1))}
                    >
                      <Ionicons name="remove" size={20} color="#4b5563" />
                    </TouchableOpacity>
                    <TextInput
                      keyboardType="numeric"
                      value={numberOfGuests.toString()}
                      onChangeText={handleGuestChange}
                      className="border-t border-b border-gray-300 h-10 px-4 text-center w-16"
                    />
                    <TouchableOpacity 
                      className="w-10 h-10 bg-gray-200 rounded-r-lg items-center justify-center"
                      onPress={() => setNumberOfGuests(numberOfGuests + 1)}
                    >
                      <Ionicons name="add" size={20} color="#4b5563" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <Text className="text-gray-700 mb-2">Phone Number</Text>
                  <PhoneInput
                    defaultValue={phoneNumber}
                    defaultCode="OM"
                    onChangeFormattedText={(text) => setPhoneNumber(text)}
                    containerStyle={{ 
                      width: '100%', 
                      borderRadius: 8, 
                      backgroundColor: '#f9fafb',
                      marginBottom: 16 
                    }}
                    textContainerStyle={{
                      backgroundColor: '#f9fafb',
                      borderRadius: 8,
                    }}
                  />
                </View>
              </View>

              <View className="bg-gray-50 rounded-xl p-5 mb-8">
                <Text className="text-lg font-semibold mb-4">Price Details</Text>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-gray-600">Base price</Text>
                  <Text className="font-medium">{activityDetails?.price?.toFixed(2) || '0.00'} OMR</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-gray-600">Guests</Text>
                  <Text className="font-medium">x {numberOfGuests}</Text>
                </View>
                {selectedDates.startDate && selectedDates.endDate && (
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-600">Days</Text>
                    <Text className="font-medium">
                      x {calculateDaysBetween(selectedDates.startDate, selectedDates.endDate)}
                    </Text>
                  </View>
                )}
                <View className="border-t border-gray-200 my-2" />
                <View className="flex-row justify-between mt-2">
                  <Text className="text-lg font-bold">Total</Text>
                  <Text className="text-lg font-bold">{totalPrice.toFixed(2)} OMR</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-blue-600 rounded-xl p-4 mb-8"
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white text-center text-lg font-bold">Proceed to Payment</Text>
                )}
              </TouchableOpacity>
              
              {error && (
                <View className="bg-red-50 p-3 rounded-lg mb-4">
                  <Text className="text-red-500">{error}</Text>
                </View>
              )}
            </Animated.View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
