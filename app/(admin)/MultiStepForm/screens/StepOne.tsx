import { View, Text, TextInput, Button } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../../../schemas/formSchema";
import { useFormStore } from "../../../../store/FormStore";
import { useRouter } from "expo-router";


export default function StepOne() {
  const router = useRouter();
  const { title, price, setTitle, setPrice } = useFormStore();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema.pick({ title: true, price: true })),
    defaultValues: { title, price }
  });

  const onNext = (data: any) => {
    setTitle(data.title);
    setPrice(data.price);
    router.push("./StepTwo");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Title</Text>
      <TextInput {...register("title")} onChangeText={(text) => setValue("title", text)} style={{ borderWidth: 1, marginBottom: 10 }} />
      {errors.title && <Text style={{ color: "red" }}>{errors.title.message}</Text>}

      <Text>Price</Text>
      <TextInput {...register("price")} onChangeText={(text) => setValue("price", text)} keyboardType="numeric" style={{ borderWidth: 1, marginBottom: 10 }} />
      {errors.price && <Text style={{ color: "red" }}>{errors.price.message}</Text>}

      <Button title="Next" onPress={handleSubmit(onNext)} />
    </View>
  );
}
