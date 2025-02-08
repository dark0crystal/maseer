import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Keyboard, 
    TouchableWithoutFeedback, 
    ScrollView 
  } from "react-native";
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1">
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 100 }}>
            <Text className="text-xl font-semibold text-black mt-8">
              Now, Select Your Price
            </Text>
            <Text className="text-base text-gray-500 mt-1">
              You can change it any time.
            </Text>
  
            {/* Input Field with Currency */}
            <View className="flex flex-row items-center justify-center mt-8 rounded-lg p-4 w-full max-w-xs">
              {/* Currency Label */}
              <View className="px-4 py-2 rounded-lg">
                <Text className="text-5xl text-black font-semibold">OMR</Text>
              </View>
  
              {/* Price Input */}
              <TextInput
                className="text-4xl text-black font-semibold flex-1 text-center rounded-lg px-4"
                keyboardType="numeric"
                placeholder="20"
                {...register("price", { valueAsNumber: true })}
                onChangeText={(number) => setValue("price", parseFloat(number) || 0)}
              />
            </View>
  
            {/* Error Message */}
            {errors.price && (
              <Text className="text-red-500 mt-2">{errors.price.message}</Text>
            )}
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
  