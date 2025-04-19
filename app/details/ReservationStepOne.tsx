'use client';

import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { useReservationStore } from '../../store/reservationStore';

export default function ReservationStepOne() {
  const { setSelectedDates, selectedDates } = useReservationStore();

  const handleDateSelect = (date: any) => {
    const selected = date.dateString;

    // If no start date, set it
    if (!selectedDates?.startDate) {
      setSelectedDates({ startDate: new Date(selected), endDate: null });
    } 
    // If start exists but no end, and selected is after start, set end
    else if (!selectedDates.endDate && new Date(selected) > selectedDates.startDate) {
      setSelectedDates({
        startDate: selectedDates.startDate,
        endDate: new Date(selected),
      });
    } 
    // Reset selection
    else {
      setSelectedDates({ startDate: new Date(selected), endDate: null });
    }
  };

  const getMarkedDates = () => {
    const marks: any = {};
    const start = selectedDates?.startDate;
    const end = selectedDates?.endDate;

    if (start) {
      const startDateStr = start.toISOString().split('T')[0];
      marks[startDateStr] = {
        startingDay: true,
        color: 'black',
        textColor: 'white',
      };
    }

    if (start && end) {
      let current = new Date(start);
      while (current <= end) {
        const dateStr = current.toISOString().split('T')[0];
        marks[dateStr] = {
          color: 'black',
          textColor: 'white',
        };
        current.setDate(current.getDate() + 1);
      }

      const endDateStr = end.toISOString().split('T')[0];
      marks[endDateStr] = {
        endingDay: true,
        color: 'black',
        textColor: 'white',
      };
    }

    return marks;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">
        <View className="py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold">Select Dates</Text>
          <Text className="text-gray-500 mt-1 text-sm">
            Tap once to set start date, tap again to set end date
          </Text>
        </View>

        <View className="flex-1 py-6">
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={getMarkedDates()}
            markingType="period"
            theme={{
              selectedDayBackgroundColor: 'black',
              selectedDayTextColor: 'white',
              todayTextColor: 'black',
              arrowColor: 'black',
              textDayFontWeight: '500',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '500',
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
