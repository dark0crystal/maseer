import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";
import { formSchema } from "../../schemas/formSchema";
import { useFormStore } from "../../store/FormStore";
import { useRouter } from "expo-router";

export default function StepTwo() {
  const router = useRouter();
  const { governorate, setGovernorate, city, setCity, coordinates, setCoordinates } = useFormStore();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema.pick({ governorate: true, city: true, coordinates: true })),
    defaultValues: { governorate, city, coordinates },
  });

  const omaniGovernorates = [
    "Muscat", "Dhofar", "Musandam", "Al Buraimi", "Ad Dakhiliyah",
    "Al Batinah North", "Al Batinah South", "Ash Sharqiyah North",
    "Ash Sharqiyah South", "Ad Dhahirah", "Al Wusta"
  ];

  const onNext = (data: any) => {
    setGovernorate(data.governorate);
    setCity(data.city);
    setCoordinates(coordinates);
    router.push("./StepThree");
  };

  return (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="text-xl font-semibold text-black mt-4">
        Select Location
      </Text>

      {/* Governorate Dropdown */}
      <View className="mt-4 w-full max-w-xs border border-gray-300 rounded-lg">
        <Picker
          selectedValue={governorate}
          onValueChange={(itemValue) => {
            setGovernorate(itemValue);
            setValue("governorate", itemValue);
          }}
        >
          <Picker.Item label="Select Governorate" value="" />
          {omaniGovernorates.map((gov, index) => (
            <Picker.Item key={index} label={gov} value={gov} />
          ))}
        </Picker>
      </View>
      {errors.governorate && <Text className="text-red-500 mt-1">{errors.governorate.message}</Text>}

      {/* City Input */}
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-2 mt-4 w-full max-w-xs text-lg"
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

      {/* Next Button */}
      <TouchableOpacity
        onPress={handleSubmit(onNext)}
        className="bg-black rounded-lg px-6 py-4 mt-6"
      >
        <Text className="text-white text-lg font-semibold text-center">
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}


// import { View, Text, TouchableOpacity } from "react-native";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { formSchema } from "../../schemas/formSchema";
// import { useFormStore } from "../../store/FormStore";
// import { useRouter } from "expo-router";

// const featuresList = ["WiFi", "Parking", "Pool", "Gym", "AC", "TV"];

// export default function StepTwo() {
//   const router = useRouter();
//   const { features, setFeatures } = useFormStore();

//   const { handleSubmit, setValue, formState: { errors } } = useForm({
//     resolver: zodResolver(formSchema.pick({ features: true })),
//     defaultValues: { features },
//   });

//   const toggleFeature = (feature: string) => {
//     const updatedFeatures = features.includes(feature)
//       ? features.filter((f) => f !== feature)
//       : [...features, feature];

//     setFeatures(updatedFeatures);
//     setValue("features", updatedFeatures);
//   };

//   const onNext = () => router.push("./StepThree");

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
//         Select Features:
//       </Text>

//       {featuresList.map((feature) => {
//         const isSelected = features.includes(feature);
//         return (
//           <TouchableOpacity
//             key={feature}
//             onPress={() => toggleFeature(feature)}
//             style={{
//               padding: 12,
//               marginVertical: 6,
//               borderWidth: 2,
//               borderColor: isSelected ? "#000" : "#ccc",
//               backgroundColor: isSelected ? "#000" : "#fff",
//               borderRadius: 10,
//               alignItems: "center",
//             }}
//           >
//             <Text style={{ color: isSelected ? "#fff" : "#000", fontSize: 16 }}>
//               {isSelected ? `✔ ${feature}` : feature}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}

//       {errors.features && (
//         <Text style={{ color: "red", marginTop: 10 }}>
//           {errors.features.message}
//         </Text>
//       )}

//       <TouchableOpacity
//         onPress={handleSubmit(onNext)}
//         style={{
//           marginTop: 20,
//           padding: 12,
//           backgroundColor: "#000",
//           borderRadius: 10,
//           alignItems: "center",
//         }}
//       >
//         <Text style={{ color: "#fff", fontSize: 18 }}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
