import { useState } from "react";
import { 
  View, Text, Image, ScrollView, TouchableOpacity 
} from "react-native";
import { useFormStore } from "../../store/FormStore";
import ProgressBar from "@/components/shared-components/ProgressBar";
import { useRouter } from "expo-router";
import ConfettiCannon from "react-native-confetti-cannon";

export default function StepEight() {
  const {
    title, description, features, coverImage, images, price,
    coordinates, availableSeats, genderPreference, activityDates, 
    decrementFormprogress 
  } = useFormStore();
  
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log({
      title, description, features, coverImage, images, price,
      coordinates, availableSeats, genderPreference, activityDates
    });

    // Simulate successful form submission
    setSubmitted(true);

    // Navigate after delay
    setTimeout(() => {
      router.replace("/success"); // Navigate to success screen or home page
    }, 3000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>
        
        {/* Title */}
        <Text className="text-2xl font-bold text-center mt-6">{title}</Text>

        {/* Cover Image */}
        {coverImage && (
          <Image source={{ uri: coverImage }} className="w-full h-52 rounded-lg mt-4" />
        )}

        {/* Description */}
        <Text className="text-gray-600 mt-4">{description}</Text>

        {/* Features */}
        <View className="mt-4">
          <Text className="text-lg font-semibold">Features:</Text>
          {features.map((feature, index) => (
            <Text key={index} className="text-gray-600">- {feature}</Text>
          ))}
        </View>

        {/* Additional Images */}
        <Text className="text-lg font-semibold mt-4">Additional Images:</Text>
        <View className="flex-row flex-wrap mt-2">
          {images.map((uri, index) => (
            <Image key={index} source={{ uri }} className="w-[30%] h-28 m-1 rounded-lg" />
          ))}
        </View>

        {/* Price */}
        <Text className="text-lg font-semibold mt-4">Price:</Text>
        <Text className="text-gray-600">${price}</Text>

        {/* Available Seats */}
        <Text className="text-lg font-semibold mt-4">Available Seats:</Text>
        <Text className="text-gray-600">{availableSeats}</Text>

        {/* Gender Preference */}
        <Text className="text-lg font-semibold mt-4">Gender Preference:</Text>
        <Text className="text-gray-600">{genderPreference}</Text>

        {/* Activity Dates */}
        <Text className="text-lg font-semibold mt-4">Activity Dates:</Text>
        {activityDates.map((date, index) => (
          <Text key={index} className="text-gray-600">
            {date.start} - {date.end}
          </Text>
        ))}

      </ScrollView>

      {/* Bottom Section */}
      <View className="absolute bottom-0 w-screen bg-white h-[120px]">
        <ProgressBar />

        <View className="flex-row justify-between px-6 py-4">
          {/* Back Button */}
          <TouchableOpacity 
            onPress={() => { router.back(); decrementFormprogress(); }} 
            className="rounded-lg px-6 py-3"
          >
            <Text className="text-black text-lg font-semibold">Back</Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity 
            onPress={handleSubmit} 
            className="bg-green-600 rounded-lg px-6 py-3"
          >
            <Text className="text-white text-lg font-semibold">Submit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Confetti Effect */}
      {submitted && <ConfettiCannon count={200} origin={{ x: 200, y: 0 }} />}
      
    </View>
  );
}
