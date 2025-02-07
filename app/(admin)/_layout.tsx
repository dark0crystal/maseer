import { Stack } from "expo-router";
import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";


export default function Create() {
  return (
    <Stack>
        
      <Stack.Screen name="StepOne" options={{ title: "Step 1"  ,headerShown:false}} />
      <Stack.Screen name="StepTwo" options={{ title: "Step 2"  ,headerShown:false}} />
      <Stack.Screen name="StepThree" options={{ title: "Step 3",headerShown:false }} />
      <Stack.Screen name="StepFour" options={{ title: "Step 4" ,headerShown:false}} />
    </Stack>
  );
}