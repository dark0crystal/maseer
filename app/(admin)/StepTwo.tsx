import { View, Text, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";
import { formSchema } from "../../schemas/formSchema";
import { useFormStore } from "../../store/FormStore";
import { useRouter } from "expo-router";
import ProgressBar from "@/components/shared-components/ProgressBar";


export default function StepTwo() {
  const router = useRouter();
  const { governorate, setGovernorate, city, setCity, coordinates, setCoordinates ,incrementFormprogress,decrementFormprogress} = useFormStore();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema.pick({ governorate: true, city: true, coordinates: true })),
    defaultValues: { governorate, city, coordinates },
  });

  const omaniGovernorates = [
    "Muscat", "Dhofar", "Musandam", "Al Buraimi", "Ad Dakhiliyah",
    "Al Batinah North", "Al Batinah South", "Ash Sharqiyah North",
    "Ash Sharqiyah South", "Ad Dhahirah", "Al Wusta"
  ];

  const onNext = async (data: any) => {
    // Save the current step data to the store
    setGovernorate(data.governorate);
    setCity(data.city);
    setCoordinates(coordinates);

    // Validate that all required fields are filled
    if (!data.governorate || !data.city || !coordinates) {
      return;
    }

    // Store the data in the form store for the next step
    incrementFormprogress();
    router.push("./StepThree");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }} keyboardShouldPersistTaps="handled">
          <View className="items-center mt-4">
            <Text className="text-xl font-semibold text-black">Select Location</Text>

            {/* Governorate Dropdown */}
            <Text className="mt-2">Select Governorate</Text>
            <View className="mt-1 w-full max-w-xs border border-gray-300 rounded-lg">
              <Picker
                selectedValue={governorate}
                onValueChange={(itemValue) => {
                  setGovernorate(itemValue);
                  setValue("governorate", itemValue);
                }}
                style={{ color: "black" }}
              >
                <Picker.Item label="Select Governorate" value="" style={{ color: "black" }} />
                {omaniGovernorates.map((gov, index) => (
                  <Picker.Item key={index} label={gov} value={gov} style={{ color: "black" }} color='black' />
                ))}
              </Picker>
            </View>
            {errors.governorate && <Text className="text-red-500 mt-1">{errors.governorate.message}</Text>}

            {/* City Input */}
            <Text className="mt-2">Select City</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-2 mt-1 w-full max-w-xs text-lg"
              placeholder="Enter City Name"
              {...register("city")}
              onChangeText={(text) => setValue("city", text)}
            />
            {errors.city && <Text className="text-red-500 mt-1">{errors.city.message}</Text>}

            {/* Map for Coordinates Selection */}
            <View className="w-full max-w-xs h-64 mt-6 overflow-hidden rounded-lg border border-gray-300">
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: 23.6143,
                  longitude: 58.5453,
                  latitudeDelta: 2,
                  longitudeDelta: 2,
                }}
                onPress={(e) => {
                  const { latitude, longitude } = e.nativeEvent.coordinate;
                  setCoordinates({ latitude, longitude });
                  setValue("coordinates", { latitude, longitude });
                }}
              >
                {coordinates && (
                  <Marker coordinate={coordinates} title="Selected Location" />
                )}
              </MapView>
            </View>
            {errors.coordinates && <Text className="text-red-500 mt-1">{errors.coordinates.message}</Text>}
          </View>
        </ScrollView>

        {/* Fixed Bottom Buttons */}
        <View className="absolute bottom-0 bg-white h-[120px] flex flex-row w-screen">
        {/* progress bar */}
          <ProgressBar />
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => {router.back() , decrementFormprogress()}}
            className="absolute bottom-12 left-6 rounded-lg px-6 py-3"
          >
            <Text className="text-black text-lg font-semibold">Back</Text>
          </TouchableOpacity>

          {/* Next Button */}
          <TouchableOpacity
            onPress={handleSubmit(onNext)}
            className= "absolute bottom-12 right-6 bg-black rounded-lg px-6 py-3"
          >
            <Text className="text-white text-lg font-semibold">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
