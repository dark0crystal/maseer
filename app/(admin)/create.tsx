import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StepOne from "../../components/MultiStepForm/screens/StepOne";
import StepTwo from "../../components/MultiStepForm/screens/StepTwo";
import StepThree from "../../components/MultiStepForm/screens/StepThree";
import StepFour from "../../components/MultiStepForm/screens/StepFour";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StepOne">
        <Stack.Screen name="StepOne" component={StepOne} options={{ title: "Step 1: Details" }} />
        <Stack.Screen name="StepTwo" component={StepTwo} options={{ title: "Step 2: Features" }} />
        <Stack.Screen name="StepThree" component={StepThree} options={{ title: "Step 3: Images" }} />
        <Stack.Screen name="StepFour" component={StepFour} options={{ title: "Step 4: Review & Submit" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
