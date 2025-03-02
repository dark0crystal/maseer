import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useRouter } from "expo-router";
import { useFormStore } from "../../store/FormStore";
import ProgressBar from "@/components/shared-components/ProgressBar";

export default function StepSeven() {
  const router = useRouter();
  const { setActivityDates } = useFormStore();
  const [dateRanges, setDateRanges] = useState<{ start: string; end: string }[]>([]);
  const [currentRange, setCurrentRange] = useState<{ start: string | null; end: string | null }>({
    start: null,
    end: null,
  });
  const [selectingStart, setSelectingStart] = useState(true);

  // تحديث التواريخ عند الاختيار
  const handleDateSelect = (day: { dateString: string }) => {
    if (selectingStart) {
      setCurrentRange({ start: day.dateString, end: null });
      setSelectingStart(false);
    } else {
      setCurrentRange((prev) => {
        if (prev.start) {
          const newRange = { start: prev.start, end: day.dateString };
          setDateRanges([...dateRanges, newRange]); // إضافة النطاق الجديد إلى القائمة
          setCurrentRange({ start: null, end: null }); // إعادة التعيين لبدء نطاق جديد
        }
        return prev;
      });
      setSelectingStart(true);
    }
  };

  // تخطي تحديد التواريخ
  const skipDateSelection = () => {
    setActivityDates([]); // تخزين مصفوفة فارغة
    router.replace("./StepEight");
  };

  // تأكيد النطاق الزمني
  const confirmDateSelection = () => {
    setActivityDates(dateRanges);
    router.replace("./StepEight");
  };

  return (
    <View className="flex-1 p-5">
      <Text className="text-xl font-semibold mb-4">Select Multiple Date Ranges (Optional)</Text>

      <Calendar 
        onDayPress={handleDateSelect}
        markedDates={Object.assign(
          {},
          ...dateRanges.map(({ start, end }) => ({
            [start]: { selected: true, startingDay: true, color: "green" },
            [end]: { selected: true, endingDay: true, color: "green" }
          }))
        )}
      />

      {/* عرض الفترات الزمنية المختارة */}
      <View className="mt-4">
        <Text className="text-lg font-bold">Selected Date Ranges:</Text>
        {dateRanges.length > 0 ? (
          dateRanges.map((range, index) => (
            <Text key={index} className="text-lg">
              {index + 1}: {range.start} → {range.end}
            </Text>
          ))
        ) : (
          <Text className="text-lg text-gray-500">No dates selected</Text>
        )}
      </View>

      {/* الأزرار */}
      <View className="mt-6 flex-row justify-between">
        <TouchableOpacity onPress={() => router.back()} className="px-6 py-3 bg-gray-200 rounded-lg">
          <Text className="text-black font-semibold">Back</Text>
        </TouchableOpacity>

        {dateRanges.length > 0 ? (
          <TouchableOpacity onPress={confirmDateSelection} className="px-6 py-3 bg-black rounded-lg">
            <Text className="text-white font-semibold">Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={skipDateSelection} className="px-6 py-3 bg-gray-400 rounded-lg">
            <Text className="text-white font-semibold">Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* شريط التقدم */}
      <View className="absolute bottom-0 w-full">
        <ProgressBar />
      </View>
    </View>
  );
}
