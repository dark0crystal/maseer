import { View, Text, Button, Image, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "../../store/FormStore";
import { useRouter } from "expo-router";
import { formSchema } from "../../schemas/formSchema";

export default function StepFour() {
  const router = useRouter();
  const { title, features, images, setImages } = useFormStore();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema.pick({ images: true })),
    defaultValues: { images },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = [...images, ...result.assets.map(asset => asset.uri)];
      setImages(newImages);
      setValue("images", newImages);
    }
  };

  const onNext = () => {
    console.log({ title, features, images });
    router.replace("./StepFive"); // Redirect to StepFive
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ padding: 20 }}>
        <Text className="text-xl font-semibold">Upload Images:</Text>
        <Button title="Pick Images" onPress={pickImage} />

        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
          {images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={{ width: 80, height: 80, margin: 5, borderRadius: 8 }} />
          ))}
        </View>

        {errors.images && <Text className="text-red-500 mt-2">{errors.images.message}</Text>}

        <View className="flex flex-row w-screen justify-around">
          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()} className="bg-black rounded-lg px-6 py-4 mt-6">
            <Text className="text-white text-lg font-semibold text-center">Back</Text>
          </TouchableOpacity>

          {/* Next Button */}
          <TouchableOpacity onPress={handleSubmit(onNext)} className="bg-black rounded-lg px-6 py-4 mt-6">
            <Text className="text-white text-lg font-semibold text-center">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
