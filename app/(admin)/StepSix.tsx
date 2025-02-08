import { 
    View, 
    Text, 
    TouchableOpacity, 
    Keyboard, 
    TouchableWithoutFeedback, 
    ScrollView 
  } from "react-native";
  import { Controller, useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useFormStore } from "../../store/FormStore";
  import { useRouter } from "expo-router";
  
  export default function StepSix() {
    const router = useRouter();
    const { availableSeats, genderPreference, allowPets, incrementSeat, decrementSeat, setGenderPreference, setAllowPets } = useFormStore();
    const { control, handleSubmit, setValue, watch } = useForm({
      defaultValues: {
        availableSeats,
        genderPreference,
        allowPets,
      },
    });
  
    const onNext = (data: any) => {
      console.log(data);
      // Use setState functions from Zustand to update the store
      setGenderPreference(data.genderPreference);
      setAllowPets(data.allowPets);
      router.push("./StepSeven"); // Navigate to next page
    };
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 100 }}>
            <Text className="text-xl font-semibold mb-4">How many available seats?</Text>
  
            {/* Control for available seats */}
            <View className="flex flex-row items-center justify-between border p-3 rounded-lg w-40">
              <TouchableOpacity
                onPress={() => {
                  decrementSeat(availableSeats);  // Update the state using Zustand store
                }}
                className="p-2 bg-gray-200 rounded-full"
              >
                <Text className="text-lg">-</Text>
              </TouchableOpacity>
  
              <Text className="text-lg font-semibold">{availableSeats}</Text>
  
              <TouchableOpacity
                onPress={() => {
                  incrementSeat(availableSeats);  // Update the state using Zustand store
                }}
                className="p-2 bg-gray-200 rounded-full"
              >
                <Text className="text-lg">+</Text>
              </TouchableOpacity>
            </View>
  
            {/* Gender preference */}
            <Text className="text-xl font-semibold mt-6">Who is this activity for?</Text>
            <Controller
              control={control}
              name="genderPreference"
              render={({ field: { onChange, value } }) => (
                <View className="mt-2">
                  {["men", "women", "both"].map((option) => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => onChange(option)}
                      className={`p-3 border rounded-lg mt-2 ${value === option ? "bg-gray-300" : ""}`}
                    >
                      <Text className="text-lg">{option === "men" ? "Men" : option === "women" ? "Women" : "Both"}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            />
  
            {/* Pets allowed */}
            <Text className="text-xl font-semibold mt-6">Are pets allowed?</Text>
            <Controller
              control={control}
              name="allowPets"
              render={({ field: { onChange, value } }) => (
                <View className="mt-2">
                  <TouchableOpacity
                    onPress={() => onChange(true)}
                    className={`p-3 border rounded-lg mt-2 ${value ? "bg-gray-300" : ""}`}
                  >
                    <Text className="text-lg">Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onChange(false)}
                    className={`p-3 border rounded-lg mt-2 ${!value ? "bg-gray-300" : ""}`}
                  >
                    <Text className="text-lg">No</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </ScrollView>
  
         {/* Fixed Bottom Buttons */}
        <View className="absolute bottom-0 bg-white h-[120px] flex flex-row w-screen">
        <View className="h-2 w-full bg-black"></View>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
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
  