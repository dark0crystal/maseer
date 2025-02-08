import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../schemas/formSchema";
import { useFormStore } from "../../store/FormStore";
import { useRouter } from "expo-router";

export default function StepOne() {
  const router = useRouter();
  const { title, description, setDescription, setTitle } = useFormStore();

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 p-8">
        <Text className="text-xl font-pmedium text-black mt-4">Now, let's give your activity a Title</Text>
        <TextInput
          className="border rounded-2xl text-xl font-pmedium h-24 p-3 mt-2"
          multiline={true}
          placeholder="Enter your Activity Title..."
          textAlignVertical="top"
          {...register("title")}
          onChangeText={(text) => setValue("title", text)}
        />
        {errors.title && <Text className="text-red-500">{errors.title.message}</Text>}

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
        {errors.description && <Text className="text-red-500">{errors.description.message}</Text>}

        {/* Spacer to avoid overlap */}
        <View className="flex-1" />

        {/* Fixed Button at the Bottom */}
        <View className="absolute bottom-0  w-screen h-[120px] bg-violet-300 flex ">
          <View className="h-2 w-full bg-black"></View>
          <TouchableOpacity onPress={handleSubmit(onNext)} className="absolute bottom-12 right-6 bg-black rounded-lg px-6 py-3 w-[100px] ">
            <Text className="text-white text-lg font-semibold">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
