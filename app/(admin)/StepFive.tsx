import { View, Text, TextInput, Button } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../schemas/formSchema";
import { useFormStore } from "../../store/FormStore";
import { useRouter } from "expo-router";

export default function StepFour(){

    const router = useRouter();
    const { title, description ,setDescription, setTitle  } = useFormStore();
    
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
      resolver: zodResolver(formSchema.pick({ title: true, description: true })),
      defaultValues: { title, description }
    });
  
    const onNext = (data: any) => {
      setTitle(data.title);
      setDescription(data.description);
      router.push("./StepTwo");
    };
    
    return(
        <View>
            <Text className="text-xl font-pmedium text-black mt-4">Now, Select Your Price</Text>
            <Text className="text-base text-gray-500 mt-1">You can change it any time.</Text>
            <TextInput 
            className="text-5xl text-black "
            />

        {errors.description && <Text style={{ color: "red" }}>{errors.description.message}</Text>}
    
    
        <View className="bg-black rounded-lg w-fit p-4 mt-6">
            <Button title="Next" onPress={handleSubmit(onNext)} color="white" />
        </View>
        </View>
    )
}