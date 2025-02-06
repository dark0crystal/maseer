import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../schemas/formSchema";
import { useFormStore } from "../../store/FormStore";
import { useRouter } from "expo-router";

export default function StepFour() {
  const router = useRouter();
  const { price, setPrice } = useFormStore();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema.pick({ price: true })),
    defaultValues: { price }
  });

  const onNext = (data: any) => {
    setPrice(data.price);
    router.push("./StepSix");
  };

  return (
    <View className="flex items-center  px-6">
      <Text className="text-xl font-semibold text-black mt-4">
        Now, Select Your Price
      </Text>
      <Text className="text-base text-gray-500 mt-1">
        You can change it any time.
      </Text>

      {/* Input Field with Currency */}
      <View className="flex flex-row items-center justify-center mt-8 border border-gray-300 rounded-lg p-4 bg-white w-full max-w-xs">
        {/* Currency Label */}
        <View className=" px-4 py-2 rounded-lg">
          <Text className="text-4xl text-black font-semibold">OMR</Text>
        </View>

        {/* Price Input */}
        <TextInput
          className="text-4xl text-black font-semibold flex-1 rounded-lg px-4"
          keyboardType="numeric"
          {...register("price", { valueAsNumber: true })}
          onChangeText={(number) => setValue("price", parseFloat(number) || 0)}
        />
      </View>

      {/* Error Message */}
      {errors.price && (
        <Text className="text-red-500 mt-2">{errors.price.message}</Text>
      )}

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
