import { create } from "zustand";
import { View, Text, Button } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { reservationSchema } from "@/schemas/reservationSchema";
import { useReservationStore } from "@/store/useReservationStore";


export default function ReservationStepOne({ navigation }: { navigation: any }) {
  const { setDates, dates } = useReservationStore();
  const [selectedStart, setSelectedStart] = useState<string | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});

  const { setValue, getValues, handleSubmit } = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: { dates },
  });

  const today = new Date().toISOString().split("T")[0]; // Get today's date
  const onDayPress = (day: DateData) => {
    
  
    if (day.dateString < today) return; // Prevent selecting past dates
  
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(day.dateString);
      setSelectedEnd(null);
      setMarkedDates({
        [day.dateString]: { selected: true, startingDay: true, color: "#001219" },
      });
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
      range[dateString] = { selected: true, color: "#001219" };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    range[start] = { selected: true, startingDay: true, color: "#001219" };
    range[end] = { selected: true, endingDay: true, color: "#001219" };
    setMarkedDates(range);
  };

  const addDateRange = () => {
    if (selectedStart && selectedEnd) {
      const newDateRange = { start: selectedStart, end: selectedEnd };
      setValue("dates", newDateRange);
      setDates(newDateRange);
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
      <Calendar
      markingType={"period"}
      markedDates={{
        ...markedDates,
        [today]: { disabled: true }, // Disable today if needed
      }}
      minDate={new Date().toISOString().split("T")[0]} // Disable past dates
      onDayPress={onDayPress}
    />

      <Button title="Set Date Range" onPress={addDateRange} disabled={!selectedStart || !selectedEnd} />
      {dates && <Text>{`${dates.start} - ${dates.end}`}</Text>}
      <Button title="Next" onPress={handleSubmit(onSubmit)} disabled={!dates} />
    </View>
  );
}