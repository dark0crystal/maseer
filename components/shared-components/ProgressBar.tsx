// components/ProgressBar.tsx
import { View } from "react-native";
import { useFormStore } from "../../store/FormStore";

const TOTAL_STEPS = 7; //they are 8 but we start from zero

export default function ProgressBar() {
  const { formprogress } = useFormStore();

  // Calculate the width percentage based on the current step
  const progressWidth = `${(formprogress / (TOTAL_STEPS - 1)) * 100}%` as const;
console.log(progressWidth)
  return (
    <View className="h-2 w-full bg-gray-200 border">
      <View
        className='h-2 bg-black'
        style={{ width: progressWidth }} // TypeScript now accepts this
      />
    </View>
  );
}