import { View, Text, Button } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../../../schemas/formSchema";
import { useFormStore } from "../../../../store/FormStore";
import { useRouter } from "expo-router";

const featuresList = ["WiFi", "Parking", "Pool", "Gym", "AC", "TV"];

export default function Step2() {
  const router = useRouter();
  const { features, setFeatures } = useFormStore();

  const { handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema.pick({ features: true })),
    defaultValues: { features }
  });

  const toggleFeature = (feature: string) => {
    setFeatures(features.includes(feature) ? features.filter(f => f !== feature) : [...features, feature]);
    setValue("features", features);
  };

  const onNext = () => router.push("/step3");

  return (
    <View style={{ padding: 20 }}>
      <Text>Select Features:</Text>
      {featuresList.map((feature) => (
        <Button key={feature} title={features.includes(feature) ? `✔ ${feature}` : feature} onPress={() => toggleFeature(feature)} />
      ))}
      {errors.features && <Text style={{ color: "red" }}>{errors.features.message}</Text>}
      
      <Button title="Next" onPress={handleSubmit(onNext)} />
    </View>
  );
}
