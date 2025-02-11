import { View, Text, Button, FlatList } from "react-native"; // Import UI components from React Native
import { Calendar, DateData } from "react-native-calendars"; // Import Calendar component for date selection
import { useForm } from "react-hook-form"; // Import form management library
import { z } from "zod"; // Import Zod for schema validation
import { zodResolver } from "@hookform/resolvers/zod"; // Connect Zod with react-hook-form for validation
import { useReservationStore } from "../../store/useReservationStore"; // Import Zustand store for managing reservations
import { useState } from "react"; // Import useState for managing component state
import { reservationSchema } from "@/schemas/reservationSchema"; // Import reservation schema for validation

export default function ReservationStepOne({ navigation }: { navigation: any }) {
  // Retrieve reservation data and update function from Zustand store
  const { setDates, dates } = useReservationStore();

  // State variables for selected start and end dates
  const [selectedStart, setSelectedStart] = useState<string | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({}); // State to store marked dates on the calendar

  // Initialize react-hook-form with validation schema and default values
  const { setValue, getValues, handleSubmit } = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: { dates }, // Use stored dates as default values
  });

  // Function to handle date selection on the calendar
  const onDayPress = (day: DateData) => {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      // If no start date is selected or both start and end are selected, set a new start date
      setSelectedStart(day.dateString);
      setSelectedEnd(null);
      setMarkedDates({ [day.dateString]: { selected: true, startingDay: true, color: "#50cebb" } });
    } else if (selectedStart && !selectedEnd) {
      // If a start date is selected but no end date, set the end date
      setSelectedEnd(day.dateString);
      markDateRange(selectedStart, day.dateString);
    }
  };

  // Function to mark the selected date range on the calendar
  const markDateRange = (start: string, end: string) => {
    let range: Record<string, any> = {};
    let currentDate = new Date(start);
    let endDate = new Date(end);

    while (currentDate <= endDate) {
      let dateString = currentDate.toISOString().split("T")[0];
      range[dateString] = { selected: true, color: "#70d7c7" }; // Mark each date in the range
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Highlight start and end dates differently
    range[start] = { selected: true, startingDay: true, color: "#50cebb" };
    range[end] = { selected: true, endingDay: true, color: "#50cebb" };
    setMarkedDates(range);
  };

  // Function to add the selected date range to the form and store
  const addDateRange = () => {
    if (selectedStart && selectedEnd) {
      const updatedDates = [...getValues("dates"), { start: selectedStart, end: selectedEnd }];
      setValue("dates", updatedDates); // Update form state
      setDates(updatedDates); // Update Zustand store
      setSelectedStart(null);
      setSelectedEnd(null);
      setMarkedDates({}); // Reset calendar markings
    }
  };

  // Function to navigate to the next step
  const onSubmit = () => {
    navigation.navigate("StepTwo");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Select Date Range</Text>

      {/* Calendar component for selecting dates */}
      <Calendar
        markingType={"period"}
        markedDates={markedDates} // Highlight selected dates
        onDayPress={onDayPress} // Handle date selection
      />

      {/* Button to add the selected date range */}
      <Button title="Add Date Range" onPress={addDateRange} disabled={!selectedStart || !selectedEnd} />

      {/* List of selected date ranges */}
      <FlatList
        data={getValues("dates")} // Get stored dates from the form state
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{`${item.start} - ${item.end}`}</Text>
        )}
      />

      {/* Button to proceed to the next step */}
      <Button title="Next" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
