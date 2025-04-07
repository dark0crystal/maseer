import { useState } from "react";
import { 
  View, Text, Image, ScrollView, TouchableOpacity, Alert 
} from "react-native";
import { useFormStore } from "../../store/FormStore";
import ProgressBar from "@/components/shared-components/ProgressBar";
import { router, useRouter } from "expo-router";
import ConfettiCannon from "react-native-confetti-cannon";
import { supabase } from "../../lib/supabase";  // Import your supabase client
import { Picker } from "@react-native-picker/picker";

export default function StepEight() {
  const {
    title, description, features, coverImage, images, price,
    coordinates, availableSeats, genderPreference, activityDates, activityType,
    decrementFormprogress, setActivityType 
  } = useFormStore();
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      console.log({
        title, description, features, coverImage, images, price,
        coordinates, availableSeats, genderPreference, activityDates, activityType
      });

      // Insert post data into the 'posts' table (including activity type)
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .insert([
          {
            title,
            description,
            price,
            available_seats: availableSeats,
            gender_preference: genderPreference,
            activity_type: activityType // Add activity_type here
          }
        ])
        .single();

      if (postError) throw new Error(postError.message);

      // Insert data into other tables as before...

      setSubmitted(true);
      setTimeout(() => {
        router.replace("/"); // Navigate to the home or success screen
      }, 3000);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>
        
        {/* Activity Type */}
        <Text className="text-lg font-semibold mt-4">Activity Type:</Text>
        <Picker
          selectedValue={activityType}
          onValueChange={(itemValue) => setActivityType(itemValue)}
          style={{ height: 50, width: '100%' }}
        >
          <Picker.Item label="Choose an Activity Type" value="" />
          <Picker.Item label="Sport" value="Sport" />
          <Picker.Item label="Workshop" value="Workshop" />
          <Picker.Item label="Event" value="Event" />
          <Picker.Item label="Social Gathering" value="Social Gathering" />
        </Picker>

        {/* Other fields... */}
        
      </ScrollView>

      {/* Bottom Section */}
      <View className="absolute bottom-0 w-screen bg-white h-[120px]">
        <ProgressBar />
        <View className="flex-row justify-between px-6 py-4">
          <TouchableOpacity onPress={() => { router.back(); decrementFormprogress(); }} className="rounded-lg px-6 py-3">
            <Text className="text-black text-lg font-semibold">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} className="bg-green-600 rounded-lg px-6 py-3">
            <Text className="text-white text-lg font-semibold">Submit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Confetti Effect */}
      {submitted && <ConfettiCannon count={200} origin={{ x: 200, y: 0 }} />}
    </View>
  );
}