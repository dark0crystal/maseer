import { View, Text, TouchableOpacity, Button ,Keyboard, TouchableWithoutFeedback} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "../../store/FormStore";
import { formSchema } from "../../schemas/formSchema";
import { useRouter } from "expo-router";

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
    console.log("Selected activity type:", selectedActivityType);
    setActivityType(selectedActivityType); 
    router.push("./StepFour");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View className="p-5">
      <Text className="text-xl font-semibold text-black mb-4">
        Choose Your Activity Type
      </Text>
      <View className="">
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
      </View>
    

      {errors.activityType && <Text className="text-red-500 mt-2">{errors.activityType.message}</Text>}

      <View className="flex flex-row w-screen justify-around">
      {/* Back Button */}
      <TouchableOpacity
            onPress={() => router.back()}
            className="bg-black rounded-lg px-6 py-4 mt-6"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Back
            </Text>
          </TouchableOpacity>

      
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
    </View>
    </TouchableWithoutFeedback>
  );
}
