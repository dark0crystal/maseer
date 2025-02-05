import { Stack } from "expo-router";


export default function Create() {
  return (
    <Stack>
      <Stack.Screen name="StepOne" options={{ title: "Step 1" }} />
      <Stack.Screen name="StepTwo" options={{ title: "Step 2" }} />
      <Stack.Screen name="StepThree" options={{ title: "Step 3" }} />
      <Stack.Screen name="StepFour" options={{ title: "Step 4" }} />
    </Stack>
  );
}