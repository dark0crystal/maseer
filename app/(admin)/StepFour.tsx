import { View, Text, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFormStore } from "../../store/FormStore";
import { useRouter } from "expo-router";

export default function StepFour() {
  const router = useRouter();
  const { title, features, images, setImages } = useFormStore();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map(asset => asset.uri)]);
    }
  };

  const onSubmit = () => {
    console.log({ title, features, images });
    alert("Form Submitted!");
    router.replace("./StepFive"); // Redirect to StepFive
  };

  return (
    <View style={{ padding: 20 }}>
      <Text className="text-xl font-semibold">Upload Images:</Text>
      <Button title="Pick Images" onPress={pickImage} />

      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={{ width: 80, height: 80, margin: 5, borderRadius: 8 }} />
        ))}
      </View>

      <View className="bg-black rounded-lg p-4 mt-6">
        <Button title="Next" onPress={onSubmit} color="white" />
      </View>
    </View>
  );
}
