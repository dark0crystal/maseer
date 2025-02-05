import { View, Text, TextInput, Button } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../schemas/formSchema";
import { useFormStore } from "../../store/FormStore";
import { useRouter } from "expo-router";


export default function StepOne() {
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

  return (
    <View style={{ padding: 20 }}>
      <Text className="text-xl font-pmedium text-black mt-4">Now, let's give your activity a Title</Text>
      <TextInput 
        className="border rounded-2xl text-xl font-pmedium h-24 p-3 mt-2" 
        multiline={true}
        placeholder="Enter your Acrivity Title..."
        textAlignVertical="top"
        {...register("title")} 
        onChangeText={(text) => setValue("title", text)}
      />
      {errors.title && <Text style={{ color: "red" }}>{errors.title.message}</Text>}

      <Text className="text-xl font-pmedium text-black mt-8">Create Your Description</Text>
      <Text className="text-base text-gray-500 mt-1">Share what makes your activity special</Text>
      <TextInput
        className="h-56 border border-black rounded-2xl p-3 text-xl font-pmedium"
        multiline={true}
        placeholder="Enter your text..."
        textAlignVertical="top"
        {...register("description")} 
        onChangeText={(text) => setValue("description", text)}
      />
      {errors.description && <Text style={{ color: "red" }}>{errors.description.message}</Text>}
    
    
      <View className="bg-black rounded-lg w-fit p-4 mt-6">
          <Button title="Next" onPress={handleSubmit(onNext)} color="white" />
      </View>

    
    </View>
  );
}
