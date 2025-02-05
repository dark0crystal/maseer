import React, { useState } from "react";
import { View, Text, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../supabase";

export default function StepThree({ navigation, route }) {
  const { title, price, selectedFeatures } = route.params;
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const uploadImages = async () => {
    const uploadedUrls = [];
    for (let image of images) {
      const fileExt = image.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `apartments/${fileName}`;

      const { data, error } = await supabase.storage
        .from("apartment-images")
        .upload(filePath, { uri: image, type: `image/${fileExt}` });

      if (error) {
        Alert.alert("Upload Failed", error.message);
        return;
      }

      uploadedUrls.push(supabase.storage.from("apartment-images").getPublicUrl(filePath).data.publicUrl);
    }

    navigation.navigate("StepFour", { title, price, selectedFeatures, uploadedUrls });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Step 3: Upload Images</Text>
      <Button title="Pick Images" onPress={pickImage} />
      {images.map((img, idx) => (
        <Image key={idx} source={{ uri: img }} style={{ width: 100, height: 100, margin: 5 }} />
      ))}
      <Button title="Upload Images" onPress={uploadImages} />
    </View>
  );
}
