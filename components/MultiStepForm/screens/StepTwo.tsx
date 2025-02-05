import React, { useState } from "react";
import { View, Text, Button } from "react-native";

const featuresList = ["WiFi", "Parking", "Pool", "Gym", "AC", "TV"];

export default function StepTwo({ navigation, route }) {
  const { title, price } = route.params;
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Step 2: Select Features</Text>
      {featuresList.map((feature) => (
        <Button 
          key={feature} 
          title={selectedFeatures.includes(feature) ? `✔ ${feature}` : feature} 
          onPress={() => toggleFeature(feature)} 
        />
      ))}

      <Button 
        title="Next" 
        onPress={() => navigation.navigate("StepThree", { title, price, selectedFeatures })} 
        style={{ marginTop: 20 }} 
      />
    </View>
  );
}
