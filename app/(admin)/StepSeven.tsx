import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useRouter } from "expo-router";
import { useFormStore } from "../../store/FormStore";
import ProgressBar from "@/components/shared-components/ProgressBar";

export default function StepSeven() {
  const router = useRouter();
  const { title, features, coverImage, images, price,description ,coordinates,availableSeats, genderPreference,activityDates ,incrementFormprogress,decrementFormprogress} = useFormStore();

  const { setActivityDates } = useFormStore();
  const [dateRanges, setDateRanges] = useState<{ start: string; end: string }[]>([]);
  const [currentRange, setCurrentRange] = useState<{ start: string | null; end: string | null }>({
    start: null,
    end: null,
  });
  const [selectingStart, setSelectingStart] = useState(true);

  // تحديث التواريخ عند الاختيار
  const handleDateSelect = (day: { dateString: string }) => {
    // that means if the start date not selected yet by checking the selectingStart state 
    if (selectingStart) {
      setCurrentRange({ start: day.dateString, end: null });//dateString (a string representing the selected date
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
    console.log("in seven")
    console.log({ title, description ,features, coverImage, images,price , coordinates,availableSeats, genderPreference,activityDates});
    setActivityDates([]); // تخزين مصفوفة فارغة
    router.replace("./StepEight");
  };

  // تأكيد النطاق الزمني
  const confirmDateSelection = () => {
    console.log("in seven")
    console.log({ title,  description, features, coverImage, images,price, coordinates,availableSeats, genderPreference ,activityDates});
    setActivityDates(dateRanges);
    router.replace("./StepEight");
    incrementFormprogress();
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
      {/* Fixed Bottom Buttons */}
      <View className="absolute bottom-0 bg-white h-[120px] flex flex-row w-screen">
        {/* progress bar */}
          <ProgressBar />
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => {router.back() , decrementFormprogress()}}
            className="absolute bottom-12 left-6 rounded-lg px-6 py-3"
          >
            <Text className="text-black text-lg font-semibold">Back</Text>
          </TouchableOpacity>

          {/* Next Button */}
          <TouchableOpacity
            onPress={skipDateSelection}
            className= "absolute bottom-12 right-6 bg-black rounded-lg px-6 py-3"
          >
            <Text className="text-white text-lg font-semibold">Next</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

 


