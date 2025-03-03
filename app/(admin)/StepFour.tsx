import { View, Text, Image, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "../../store/FormStore";
import { useRouter } from "expo-router";
import { formSchema } from "../../schemas/formSchema";
import ProgressBar from "@/components/shared-components/ProgressBar";

export default function StepFour() {
  const router = useRouter();
  const { title, features, coverImage, images, setCoverImage, setImages ,incrementFormprogress,decrementFormprogress} = useFormStore();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema.pick({ coverImage: true, images: true })),
    defaultValues: { coverImage, images },
  });

  // Function to upload Cover Image
  const pickCoverImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setCoverImage(uri);
      setValue("coverImage", uri);
    }
  };

  // Function to upload multiple images
  const pickImages = async () => {
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
    console.log({ title, features, coverImage, images });
    router.replace("./StepFive");
    incrementFormprogress();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 140 }} className="p-5">
          <Text className="text-xl font-semibold mb-4">Upload Cover Image:</Text>

          {/* Cover Image Upload */}
          <TouchableOpacity onPress={pickCoverImage} className="w-full h-52 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300">
            {coverImage ? (
              <Image source={{ uri: coverImage }} className="w-full h-full rounded-lg" />
            ) : (
              <Text className="text-gray-500">Tap to upload cover image</Text>
            )}
          </TouchableOpacity>
          {errors.coverImage && <Text className="text-red-500 mt-2">{errors.coverImage.message}</Text>}

          {/* Other Images Upload */}
          <Text className="text-xl font-semibold mt-6 mb-4">Upload More Images:</Text>
          <TouchableOpacity onPress={pickImages} className="w-full bg-gray-200 p-4 rounded-lg border border-gray-300 text-center">
            <Text className="text-gray-500">Tap to upload more images</Text>
          </TouchableOpacity>

          {/* Images Grid */}
          <View className="flex-row flex-wrap mt-4">
            {images.map((uri, index) => (
              <Image key={index} source={{ uri }} className="w-[30%] h-28 m-1 rounded-lg" />
            ))}
          </View>
          {errors.images && <Text className="text-red-500 mt-2">{errors.images.message}</Text>}
        </ScrollView>

        {/* Fixed Bottom Buttons */}
        <View className="absolute bottom-0 w-screen bg-white h-[120px]">
          {/* progress bar */}
            <ProgressBar />
          <View className="flex-row justify-between px-6 py-4">
            {/* Back Button */}
            <TouchableOpacity onPress={() => router.back()} className="rounded-lg px-6 py-3">
              <Text className="text-black text-lg font-semibold">Back</Text>
            </TouchableOpacity>

            {/* Next Button */}
            <TouchableOpacity onPress={handleSubmit(onNext)} className="bg-black rounded-lg px-6 py-3">
              <Text className="text-white text-lg font-semibold">Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
