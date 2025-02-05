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
      <Text>Now, let's give your activity a Title</Text>
      <TextInput className="border rounded-2xl text-xl font-pmedium p-4 " {...register("title")} onChangeText={(text) => setValue("title", text)}  />
      {errors.title && <Text style={{ color: "red" }}>{errors.title.message}</Text>}

      <Text className="text-xl font-pmedium text-black">Create Your Describtion</Text>
      <Text className="text-base text-gray-500">Share what makes your activity special</Text>
      <TextInput
        className="h-32 border border-gray-300 rounded-lg p-3 text-base"
        multiline={true}
        placeholder="Enter your text..."
        textAlignVertical="top"
      />
      {errors.title && <Text style={{ color: "red" }}>{errors.description.message}</Text>}
    

      <Button title="Next" onPress={handleSubmit(onNext)} />
    </View>
  );
}
