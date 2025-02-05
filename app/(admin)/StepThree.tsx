import { View, Text, TouchableOpacity, Button } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "../../store/FormStore";
import { formSchema } from "../../schemas/formSchema";
import { useRouter } from "expo-router";

// Activity types list
const activityTypes = ["Hiking", "Camping", "Fishing", "Cycling", "Diving"];

export default function StepOne() {
  const router = useRouter();
  const { activityType, setActivityType } = useFormStore();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { activityType },
  });

  const onSelect = (type: string) => {
    setValue("activityType", type);
    setActivityType(type);
  };

  const onNext = (data: any) => {
    setActivityType(data.activityType);
    router.push("./StepTwo");
  };

  return (
    <View className="p-5">
      <Text className="text-xl font-semibold text-black mb-4">
        Choose Your Activity Type
      </Text>

      {activityTypes.map((type) => (
        <TouchableOpacity
          key={type}
          className={`p-4 my-2 border rounded-lg ${
            activityType === type ? "bg-black text-white" : "border-gray-300"
          }`}
          onPress={() => onSelect(type)}
        >
          <Text className={`text-lg ${activityType === type ? "text-white" : "text-black"}`}>
            {activityType === type ? `✔ ${type}` : type}
          </Text>
        </TouchableOpacity>
      ))}

      {errors.activityType && <Text className="text-red-500 mt-2">{errors.activityType.message}</Text>}

      <View className="bg-black rounded-lg p-4 mt-6">
        <Button title="Next" onPress={handleSubmit(onNext)} color="white" />
      </View>
    </View>
  );
}
