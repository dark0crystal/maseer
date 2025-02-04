
import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function TitleForm() {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Title:</Text>

      <Controller
        control={control}
        name="title"
        rules={{ required: "Title is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter title..."
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
