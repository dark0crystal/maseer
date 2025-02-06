import { View, Text, TextInput, Button } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../schemas/formSchema";
import { useFormStore } from "../../store/FormStore";
import { useRouter } from "expo-router";


export default function StepFour(){

    const router = useRouter();
    const { price, setPrice  } = useFormStore();
    
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
      resolver: zodResolver(formSchema.pick({ price: true})),
      defaultValues: { price, setPrice }
    });
  
    const onNext = (data: any) => {
      setPrice(data.price);
      router.push("./StepSix");
    };

    return(
        <View>
            <Text className="text-xl font-pmedium text-black mt-4">Now, Select Your Price</Text>
            <Text className="text-base text-gray-500 mt-1">You can change it any time.</Text>
            <View className="flex flex-row gap-2 items-center justify-center h-fit">
                <Text className="text-5xl text-black font-psemibold">OMR</Text>
                <TextInput 
                    className="text-5xl text-black  font-psemibold"
                    keyboardType="numeric" 
                    {...register("price", { valueAsNumber: true })} 
                    onChangeText={(number) => setValue("price", parseFloat(number) || 0)} 
                />
            </View>

        {errors.price && <Text style={{ color: "red" }}>{errors.price.message}</Text>}
    
    
        <View className="bg-black rounded-lg w-fit p-4 mt-6">
            <Button title="Next" onPress={handleSubmit(onNext)} color="white" />
        </View>
        </View>
    )
}