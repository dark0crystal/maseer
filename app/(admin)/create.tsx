import { Stack } from "expo-router";

export default function Create() {
  return (
    <Stack>
      <Stack.Screen name="/MultiStepForm/screens/StepOne" options={{ title: "Step 1" }} />
      <Stack.Screen name="step2" options={{ title: "Step 2" }} />
      <Stack.Screen name="step3" options={{ title: "Step 3" }} />
    </Stack>
  );
}

