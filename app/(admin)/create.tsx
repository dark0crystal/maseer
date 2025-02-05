import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="step1" options={{ title: "Step 1" }} />
      <Stack.Screen name="step2" options={{ title: "Step 2" }} />
      <Stack.Screen name="step3" options={{ title: "Step 3" }} />
    </Stack>
  );
}

