import { View, Text, Button, FlatList } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReservationStore } from "../../store/useReservationStore";
import { useState } from "react";

const reservationSchema = z.object({
  dates: z
    .array(
      z.object({
        start: z.string(),
        end: z.string(),
      })
    )
    .min(1, "Please select at least one date range"),
});

export default function ReservationStepOne({ navigation }: { navigation: any }) {
  const { setDates, dates } = useReservationStore();
  const [selectedStart, setSelectedStart] = useState<string | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});

  const { setValue, getValues, handleSubmit } = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: { dates },
  });

  const onDayPress = (day: DateData) => {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(day.dateString);
      setSelectedEnd(null);
      setMarkedDates({ [day.dateString]: { selected: true, startingDay: true, color: "#50cebb" } });
    } else if (selectedStart && !selectedEnd) {
      setSelectedEnd(day.dateString);
      markDateRange(selectedStart, day.dateString);
    }
  };

  const markDateRange = (start: string, end: string) => {
    let range: Record<string, any> = {};
    let currentDate = new Date(start);
    let endDate = new Date(end);

    while (currentDate <= endDate) {
      let dateString = currentDate.toISOString().split("T")[0];
      range[dateString] = { selected: true, color: "#70d7c7" };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    range[start] = { selected: true, startingDay: true, color: "#50cebb" };
    range[end] = { selected: true, endingDay: true, color: "#50cebb" };
    setMarkedDates(range);
  };

  const addDateRange = () => {
    if (selectedStart && selectedEnd) {
      const updatedDates = [...getValues("dates"), { start: selectedStart, end: selectedEnd }];
      setValue("dates", updatedDates);
      setDates(updatedDates);
      setSelectedStart(null);
      setSelectedEnd(null);
      setMarkedDates({});
    }
  };

  const onSubmit = () => {
    navigation.navigate("StepTwo");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Select Date Range</Text>

      {/* Flash Calendar */}
      <Calendar
        markingType={"period"}
        markedDates={markedDates}
        onDayPress={onDayPress}
      />

      <Button title="Add Date Range" onPress={addDateRange} disabled={!selectedStart || !selectedEnd} />

      <FlatList
        data={getValues("dates")}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{`${item.start} - ${item.end}`}</Text>
        )}
      />

      <Button title="Next" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
 