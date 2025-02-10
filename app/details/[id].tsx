import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, Modal } from "react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { images } from "../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import ReservationMain from "./ReservationMain";
import ReservationStepOne from "./ReservationStepOne";
import ReservationStepTwo from "./ReservationStepTwo";
import ReservationStepThree from "./ReservationStepThree";

const activityCategories = [
  { id: "1", location: "Muscat", title: "Scuba Diving", type: "Hard", female: true, price: "100.0", companyName: "MfqodLTD", img: images.kayak },
  { id: "2", location: "Bidyah", title: "صيد السمك", type: "Easy", female: true, price: "1200", companyName: "Masser", img: images.brand },
  { id: "3", location: "Sidab", title: "Sea tour", type: "Mid", female: false, price: "20", companyName: "Masser Almotahidah", img: images.kayak },
  { id: "4", location: "Qatar", title: "Snorkeling", type: "Hard", female: false, price: "30.5", companyName: "Masseeer trips", img: images.brand },
  { id: "5", location: "Saudi", title: "Jet ski", type: "Easy", female: true, price: "30000", companyName: "Oman trips LTD", img: images.kayak },
  { id: "6", location: "Dubai", title: "Kayak", type: "Mid", female: false, price: "49.5", companyName: "MfqodLTD", img: images.brand },
];

export default function ActivityDetails() {
  const steps = [
    { name: "Main", component: <ReservationMain /> },
    { name: "Step One", component: <ReservationStepOne /> },
    { name: "Step Two", component: <ReservationStepTwo /> },
    { name: "Step Three", component: <ReservationStepThree /> },
  ];
  
  const { id } = useLocalSearchParams();
  const activity = activityCategories.find((item) => item.id === id);
  const [modalVisible, setModalVisible] = useState(false);
  const [reservationStep, setReservationStep] = useState(0);

  if (!activity) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-semibold text-red-500">Activity not found</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-gray-100">
        <ScrollView className="bg-white p-4" contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }} keyboardShouldPersistTaps="handled">
          <View className="relative w-full h-72 rounded-lg overflow-hidden">
            <Image source={activity.img} className="w-full h-full" resizeMode="cover" />
            {activity.female && (
              <View className="absolute bottom-2 left-2 bg-red-500 px-4 py-1 rounded-lg">
                <Text className="text-white font-semibold">Female Only</Text>
              </View>
            )}
          </View>

          <View className="mt-4 px-3">
            <Text className="text-2xl font-bold text-gray-900">{activity.title}</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="location-outline" size={16} color="black" />
              <Text className="text-gray-600 ml-1">{activity.location}</Text>
            </View>
            <Text className="text-lg font-semibold mt-2 text-gray-800">
              Price: <Text className="text-violet-500">{activity.price} R.O</Text>
            </Text>
            <Text className="text-gray-600 mt-2">Company: {activity.companyName}</Text>
            <Text className="text-gray-600 mt-2">Difficulty: {activity.type}</Text>
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 bg-black h-28 flex-row items-center justify-between px-6 py-4">
          <Text className="text-white text-lg font-semibold">{activity.price} OMR</Text>
          <TouchableOpacity className="bg-violet-500 px-6 py-3 rounded-lg" onPress={() => setModalVisible(true)}>
            <Text className="text-white font-semibold">Book Now</Text>
          </TouchableOpacity>
        </View>
        {/* Rendering Reservation components in a Model */}
        <Modal transparent={true} visible={modalVisible} animationType="slide" >
          <View className="flex-1 rounded-t-3xl  overflow-hidden border-t-2 ">
            <View className="w-full bg-white rounded-lg h-full p-4 ">
              <View className="flex relative items-center justify-center h-[8vh] mt-14 border-gray-200 border-b-[1px]">
                <TouchableOpacity className="absolute right-4  " onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={32} color="black" />
                </TouchableOpacity>

                <Text className="text-lg font-pmedium text-gray-900">Request a Book</Text>

              </View>
             


              <View>{steps[reservationStep].component}</View>
              {/* buttons */}
              <View className="absolute bottom-0 bg-white h-[120px] flex flex-row w-screen">
              <View className="h-2 w-full bg-black"></View>
                <TouchableOpacity
                  disabled={reservationStep === 0}
                  className={`absolute bottom-12 left-6 px-6 py-3 rounded-lg  ${reservationStep === 0 ? "bg-gray-300" : "bg-gray-500"}`}
                  onPress={() => setReservationStep(reservationStep - 1)}
                >
                  <Text className="text-black text-lg font-semibold">Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={reservationStep === steps.length - 1}
                  className={`absolute bottom-12 right-6 bg-black rounded-lg px-6 py-3 ${reservationStep === steps.length - 1 ? "bg-gray-300" : "bg-black"}`}
                  onPress={() => setReservationStep(reservationStep + 1)}
                >
                  <Text className="text-white text-lg font-semibold">Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}