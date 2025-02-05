import { useAddNewActivity } from "@/store/FormStore";
import { View, Text, Button } from "react-native";

export default function Home() {
  const price = useAddNewActivity((state) => state.price);
  const increase = useAddNewActivity((state) => state.incresePrice); // Fixed function name
  const decrease = useAddNewActivity((state) => state.decreasePrice);

  return (
    <View>
      <Text>{price}</Text>
      <Button title="Increase" onPress={increase} /> {/* Fixed Button */}
      <Button title="Decrease" onPress={decrease} /> {/* Fixed Button */}
    </View>
  );
}
