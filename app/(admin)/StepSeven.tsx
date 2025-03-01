import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useRouter } from "expo-router";
import { useFormStore } from "../../store/FormStore";
import ProgressBar from "@/components/shared-components/ProgressBar";

export default function StepSeven() {
  const router = useRouter();
  const { setActivityDates } = useFormStore(); // تحديث التواريخ في المخزن
  const [dateRange, setDateRange] = useState<{ start: string | null; end: string | null }>({
    start: null,
    end: null,
  });

  const [selectingStart, setSelectingStart] = useState(true); // للتحكم في أي تاريخ يتم تحديده حاليًا

  // تحديث التواريخ عند الاختيار
  const handleDateSelect = (day: { dateString: string }) => {
    if (selectingStart) {
      setDateRange({ start: day.dateString, end: null });
      setSelectingStart(false); // الانتقال إلى تحديد تاريخ النهاية
    } else {
      setDateRange({ ...dateRange, end: day.dateString });
      setSelectingStart(true); // إعادة التحديد إلى تاريخ البداية
    }
  };

  // تخطي تحديد التواريخ
  const skipDateSelection = () => {
    setActivityDates(null); // تخزين لا شيء في الحالة
    router.replace("./StepEight"); // الانتقال للخطوة التالية
  };

  // تأكيد النطاق الزمني
  const confirmDateSelection = () => {
    setActivityDates(dateRange);
    router.replace("./StepEight"); // الانتقال للخطوة التالية
  };

  return (
    <View className="flex-1 p-5">
      <Text className="text-xl font-semibold mb-4">Select Date Range (Optional)</Text>

      {/* التقويم */}
      <Calendar 
        onDayPress={handleDateSelect}
        markedDates={{
          ...(dateRange.start && { [dateRange.start]: { selected: true, startingDay: true, color: "green" } }),
          ...(dateRange.end && { [dateRange.end]: { selected: true, endingDay: true, color: "green" } }),
        }}
      />

      {/* عرض التواريخ المحددة */}
      <View className="mt-4">
        <Text className="text-lg">
          Start Date: {dateRange.start || "Not Selected"}
        </Text>
        <Text className="text-lg">
          End Date: {dateRange.end || "Not Selected"}
        </Text>
      </View>

      {/* الأزرار */}
      <View className="mt-6 flex-row justify-between">
        <TouchableOpacity onPress={() => router.back()} className="px-6 py-3 bg-gray-200 rounded-lg">
          <Text className="text-black font-semibold">Back</Text>
        </TouchableOpacity>

        {dateRange.start && dateRange.end ? (
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
