import { View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "../../store/FormStore";
import { formSchema } from "../../schemas/formSchema";
import { useRouter } from "expo-router";
import ProgressBar from "@/components/shared-components/ProgressBar";

// Activity types list
const activityTypes = ["Hiking", "Camping", "Fishing", "Cycling", "Diving"];

export default function StepThree() {
  const router = useRouter();
  const { activityType, setActivityType } = useFormStore();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema.pick({ activityType: true })),    
    defaultValues: { activityType },
  });

  const selectedActivityType = watch("activityType");    

  const onSelect = (type: string) => {
    setValue("activityType", type, { shouldValidate: true });
    setActivityType(type);
  };

  const onNext = () => {
    setActivityType(selectedActivityType); 
    router.push("./StepFour");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 140 }} className="p-5">
          <Text className="text-xl font-semibold text-black mb-4">
            Choose Your Activity Type
          </Text>
          
          {activityTypes.map((type) => (
            <TouchableOpacity
              key={type}
              className={`p-4 my-2 border rounded-lg ${
                selectedActivityType === type ? "bg-black text-white" : "border-gray-300"
              }`}
              onPress={() => onSelect(type)}
            >
              <Text className={`text-lg ${selectedActivityType === type ? "text-white" : "text-black"}`}>
                {selectedActivityType === type ? `✔ ${type}` : type}
              </Text>
            </TouchableOpacity>
          ))}

          {errors.activityType && <Text className="text-red-500 mt-2">{errors.activityType.message}</Text>}
        </ScrollView>

        {/* Fixed Bottom Buttons */}
        <View className="absolute bottom-0 w-screen bg-white h-[120px]">
          {/* progress bar */}
          <ProgressBar />
          <View className="flex-row justify-between px-6 py-4">
            {/* Back Button */}
            <TouchableOpacity onPress={() => router.back()} className="rounded-lg px-6 py-3">
              <Text className="text-black text-lg font-semibold">Back</Text>
            </TouchableOpacity>

            {/* Next Button */}
            <TouchableOpacity onPress={handleSubmit(onNext)} className="bg-black rounded-lg px-6 py-3">
              <Text className="text-white text-lg font-semibold">Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
