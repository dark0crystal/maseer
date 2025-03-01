import { View, Text, Button, TouchableOpacity } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { adminDateSchema } from "@/schemas/adminDateSchema";
import { useFormStore } from "../../store/FormStore";

export default function AdminDateConfig({ navigation }: { navigation: any }) {
  const { dateConfig, setDateConfig } = useFormStore();
  const [selectedStart, setSelectedStart] = useState<string | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});

  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(adminDateSchema),
    defaultValues: { specificDates: dateConfig.specificDates },
  });

  const today = new Date().toISOString().split("T")[0];

  const onDayPress = (day: DateData) => {
    if (day.dateString < today) return;
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(day.dateString);
      setSelectedEnd(null);
      setMarkedDates({
        [day.dateString]: { selected: true, startingDay: true, color: "#001219" },
      });
    } else if (selectedStart && !selectedEnd) {
      setSelectedEnd(day.dateString);
      markDateRange(selectedStart, day.dateString);
      setDateRange(selectedStart, day.dateString);
    }
  };

  const markDateRange = (start: string, end: string) => {
    let range: Record<string, any> = {};
    let currentDate = new Date(start);
    let endDate = new Date(end);

    while (currentDate <= endDate) {
      let dateString = currentDate.toISOString().split("T")[0];
      range[dateString] = { selected: true, color: "#001219" };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    range[start] = { selected: true, startingDay: true, color: "#001219" };
    range[end] = { selected: true, endingDay: true, color: "#001219" };
    setMarkedDates(range);
  };

  const setDateRange = (start: string, end: string) => {
    const newDateRange = { start, end };
    setValue("specificDates", newDateRange);
    setSelectedStart(null);
    setSelectedEnd(null);
  };

  const onSubmit = (data: z.infer<typeof adminDateSchema>) => {
    setDateConfig({ specificDates: data.specificDates });
    navigation.navigate("StepEight");
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "space-between" }}>
      <View>
        <Text>Select Available Date Range (optional)</Text>
        <Calendar
          markingType={"period"}
          markedDates={markedDates}
          minDate={today}
          onDayPress={onDayPress}
        />
        {watch("specificDates") && (
          <Text>{`${watch("specificDates")?.start} - ${watch("specificDates")?.end}`}</Text>
        )}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, color: "black" }}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{ backgroundColor: "black", padding: 10, borderRadius: 5 }} disabled={!watch("specificDates")?.start && !watch("specificDates")?.end}>
          <Text style={{ fontSize: 16, color: "white" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
