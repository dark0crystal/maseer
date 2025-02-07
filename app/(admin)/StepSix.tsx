import { View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../schemas/formSchema";
import { useFormStore } from "@/store/FormStore";

export default function StepSix() {
  const router = useRouter();
  const { availableSeats , genderPreference, allowPets } = useFormStore();
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      availableSeats: 0,
      genderPreference: "both",
      allowPets: false,
    },
  });



  const onNext = (data: any) => {
    console.log(data);
    router.replace("./StepSeven"); // الانتقال للصفحة التالية
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ padding: 20 }}>
        <Text className="text-xl font-semibold mb-4">How many available seats?</Text>

        {/* التحكم بعدد المقاعد */}
        <View className="flex flex-row items-center justify-between border p-3 rounded-lg w-40">
          <TouchableOpacity
            onPress={() => setValue("availableSeats", Math.max(1, availableSeats - 1))}
            className="p-2 bg-gray-200 rounded-full"
          >
            <Text className="text-lg">-</Text>
          </TouchableOpacity>

          <Text className="text-lg font-semibold">{availableSeats}</Text>

          <TouchableOpacity
            onPress={() => setValue("availableSeats", availableSeats + 1)}
            className="p-2 bg-gray-200 rounded-full"
          >
            <Text className="text-lg">+</Text>
          </TouchableOpacity>
        </View>

        {/* تحديد الجنس */}
        <Text className="text-xl font-semibold mt-6">Who is this activity for?</Text>
        <Controller
          control={control}
          name="genderPreference"
          render={({ field: { onChange, value } }) => (
            <View className="mt-2">
              {["men", "women", "both"].map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => onChange(option)}
                  className={`p-3 border rounded-lg mt-2 ${value === option ? "bg-gray-300" : ""}`}
                >
                  <Text className="text-lg">{option === "men" ? "Men" : option === "women" ? "Women" : "Both"}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />

        {/* السماح بالحيوانات الأليفة */}
        <Text className="text-xl font-semibold mt-6">Are pets allowed?</Text>
        <Controller
          control={control}
          name="allowPets"
          render={({ field: { onChange, value } }) => (
            <View className="mt-2">
              <TouchableOpacity
                onPress={() => onChange(true)}
                className={`p-3 border rounded-lg mt-2 ${value ? "bg-gray-300" : ""}`}
              >
                <Text className="text-lg">Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onChange(false)}
                className={`p-3 border rounded-lg mt-2 ${!value ? "bg-gray-300" : ""}`}
              >
                <Text className="text-lg">No</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* أزرار التنقل */}
        <View className="flex flex-row justify-between mt-6">
          <TouchableOpacity onPress={() => router.back()} className="bg-black rounded-lg px-6 py-4">
            <Text className="text-white text-lg font-semibold">Back</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSubmit(onNext)} className="bg-black rounded-lg px-6 py-4">
            <Text className="text-white text-lg font-semibold">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
