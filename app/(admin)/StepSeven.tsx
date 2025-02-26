import { View, Text, Button, Switch } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { adminDateSchema } from "@/schemas/adminDateSchema";
import { useFormStore } from "../../store/FormStore"; // Adjust the import path

export default function AdminDateConfig({ navigation }: { navigation: any }) {
  const { dateConfig, setDateConfig } = useFormStore(); // Use form store
  const [selectedStart, setSelectedStart] = useState<string | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});

  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(adminDateSchema),
    defaultValues: {
      isUserSelectable: dateConfig.isUserSelectable, // Use store value
      specificDates: dateConfig.specificDates, // Use store value
    },
  });

  const isUserSelectable = watch("isUserSelectable");
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

  const setDateRange = () => {
    if (selectedStart && selectedEnd) {
      const newDateRange = { start: selectedStart, end: selectedEnd };
      setValue("specificDates", newDateRange);
      setSelectedStart(null);
      setSelectedEnd(null);
    }
  };

  const onSubmit = (data: z.infer<typeof adminDateSchema>) => {
    setDateConfig({
      isUserSelectable: data.isUserSelectable,
      specificDates: data.specificDates,
    }); // Save to form store
    navigation.navigate("NextScreen"); // Replace with your next screen
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Configure Activity Date Availability
      </Text>

      {/* Toggle for user selection */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <Text>Allow users to select dates?</Text>
        <Switch
          value={isUserSelectable}
          onValueChange={(value) => {
            setValue("isUserSelectable", value);
            if (value) {
              setValue("specificDates", undefined);
              setMarkedDates({});
              setSelectedStart(null);
              setSelectedEnd(null);
            }
          }}
        />
      </View>

      {/* Date picker section - shown only when user selection is disabled */}
      {!isUserSelectable && (
        <>
          <Text>Select Available Date Range</Text>
          <Calendar
            markingType={"period"}
            markedDates={markedDates}
            minDate={today}
            onDayPress={onDayPress}
          />
          <Button
            title="Set Date Range"
            onPress={setDateRange}
            disabled={!selectedStart || !selectedEnd}
          />
          {watch("specificDates") && (
            <Text>{`${watch("specificDates")?.start} - ${watch("specificDates")?.end}`}</Text>
          )}
        </>
      )}

      <Button
        title="Save Configuration"
        onPress={handleSubmit(onSubmit)}
        disabled={!isUserSelectable && (!watch("specificDates")?.start || !watch("specificDates")?.end)}
      />
    </View>
  );
}