import { useState } from "react";
import { 
  View, Text, Image, ScrollView, TouchableOpacity, Alert 
} from "react-native";
import { useFormStore } from "../../store/FormStore";
import ProgressBar from "@/components/shared-components/ProgressBar";
import { useRouter } from "expo-router";
import ConfettiCannon from "react-native-confetti-cannon";
import { supabase } from "../../lib/supabase";  // Import your supabase client
import { Picker } from "@react-native-picker/picker";

export default function StepEight() {
  const {
    title, description, features, coverImage, images, price,
    coordinates, availableSeats, genderPreference, activityDates, activityType,
    decrementFormprogress, setActivityType 
  } = useFormStore();
  
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      // Log form data for testing
      console.log({
        title, description, features, coverImage, images, price,
        coordinates, availableSeats, genderPreference, activityDates, activityType
      });

      // Insert post data into 'posts' table
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .insert([
          {
            title,
            description,
            price,
            available_seats: availableSeats,
            gender_preference: genderPreference,
            activity_type: activityType // Include activity type
          }
        ])
        .single();

      if (postError) throw new Error(postError.message);

      // Insert coordinates into the 'post_activity_locations' table
      const { error: locationError } = await supabase
        .from('post_activity_locations')
        .insert([
          {
            post_id: postData.id,
            governate: "some_governate", // Replace with actual governate info
            city: "some_city", // Replace with actual city info
            coordinates: coordinates // Coordinates as a string (latitude, longitude)
          }
        ]);

      if (locationError) throw new Error(locationError.message);

      // Upload images to Supabase Storage and save URLs to 'post_images' table
      for (let image of images) {
        // Upload image to Supabase storage
        const fileExt = image.split(".").pop(); // Extract file extension (e.g., jpg, png)
        const fileName = `${postData.id}_${Date.now()}.${fileExt}`; // Unique file name
        const { data, error: uploadError } = await supabase.storage
          .from("post-images") // Your storage bucket name
          .upload(fileName, { uri: image }, {
            cacheControl: "3600",
            upsert: false
          });

        if (uploadError) throw new Error(uploadError.message);

        // Get the public URL of the uploaded image
        const imageUrl = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/post-images/${data.path}`;

        // Insert image URL into the 'post_images' table
        const { error: imageError } = await supabase
          .from('post_images')
          .insert([
            {
              post_id: postData.id,
              post_image_url: imageUrl
            }
          ]);

        if (imageError) throw new Error(imageError.message);
      }

      // Insert activity dates into 'post_activity_dates' table
      for (let { start, end } of activityDates) {
        const { error: dateError } = await supabase
          .from('post_activity_dates')
          .insert([
            {
              post_id: postData.id,
              start_date: start,
              end_date: end
            }
          ]);

        if (dateError) throw new Error(dateError.message);
      }

      // Show confetti and navigate after a delay
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
