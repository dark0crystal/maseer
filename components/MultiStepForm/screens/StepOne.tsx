import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  price: z.string().regex(/^\d+$/, "Price must be a number"),
});

export default function StepOne({ navigation }:any) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    navigation.navigate("StepTwo", { title: data.title, price: data.price });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Step 1: Title & Price</Text>

      <Text>Title:</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput 
            value={value} 
            onChangeText={onChange} 
            placeholder="Enter title" 
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} 
          />
        )}
      />
      {errors.title && <Text style={{ color: "red" }}>{errors.title.message}</Text>}

      <Text>Price (OMR):</Text>
      <Controller
        control={control}
        name="price"
        render={({ field: { onChange, value } }) => (
          <TextInput 
            value={value} 
            onChangeText={onChange} 
            keyboardType="numeric" 
            placeholder="Enter price" 
            style={{ borderWidth: 1, padding: 10, marginBottom: 20 }} 
          />
        )}
      />
      {errors.price && <Text style={{ color: "red" }}>{errors.price.message}</Text>}

      <Button title="Next" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
