import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../schemas/formSchema";
import { useFormStore } from "../../store/FormStore";
import { useRouter } from "expo-router";
import ProgressBar from "@/components/shared-components/ProgressBar";

export default function StepOne() {
  const router = useRouter();
  const { title, description, setDescription, setTitle ,incrementFormprogress} = useFormStore();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema.pick({ title: true, description: true })),
    defaultValues: { title, description }
  });

  const onNext = (data: any) => {
    setTitle(data.title);
    incrementFormprogress();
    setDescription(data.description);
    router.push("./StepTwo");
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView 
          className="flex-1 p-8" 
          contentContainerStyle={{ flexGrow: 1 }} 
          keyboardShouldPersistTaps="handled"
        >
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

          {/* Spacer to push button to bottom */}
          <View className="h-32" />
        </ScrollView>
      </TouchableWithoutFeedback>

      {/* Fixed Button at the Bottom */}
      <View className="absolute bottom-0 w-screen h-[120px] bg-white">
        {/* progress bar */}
        <ProgressBar />
        <TouchableOpacity onPress={handleSubmit(onNext)} className="absolute bottom-12 right-6 bg-black rounded-lg px-6 py-3 w-[100px] ">
          <Text className="text-white text-lg font-semibold text-center">Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
