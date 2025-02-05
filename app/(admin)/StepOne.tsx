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
      <Text>Activity Title</Text>
      <TextInput className="border rounded-2xl text-xl font-pmedium p-4 " {...register("title")} onChangeText={(text) => setValue("title", text)}  />
      {errors.title && <Text style={{ color: "red" }}>{errors.title.message}</Text>}

      <Text>Describtion</Text>
      <TextInput {...register("description")} onChangeText={(text) => setValue("description", text)} style={{ borderWidth: 1, marginBottom: 10 }} />
      {errors.title && <Text style={{ color: "red" }}>{errors.description.message}</Text>}
    

      <Button title="Next" onPress={handleSubmit(onNext)} />
    </View>
  );
}
