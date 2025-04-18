'use client'

import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Calendar } from 'react-native-calendars'
import { useReservationStore } from '../../store/reservationStore'

export default function ReservationStepOne() {
  const { setSelectedDates, selectedDates } = useReservationStore()

  const handleDateSelect = (date: any) => {
    if (!selectedDates?.startDate) {
      setSelectedDates({ startDate: new Date(date.dateString), endDate: null })
    } else if (!selectedDates.endDate) {
      setSelectedDates({ 
        ...selectedDates, 
        endDate: new Date(date.dateString) 
      })
    } else {
      setSelectedDates({ startDate: new Date(date.dateString), endDate: null })
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">
        <View className="py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold">Select Dates</Text>
        </View>

        <View className="flex-1 py-6">
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
              [selectedDates?.startDate?.toISOString().split('T')[0] || '']: {
                selected: true,
                startingDay: true,
                color: 'black'
              },
              [selectedDates?.endDate?.toISOString().split('T')[0] || '']: {
                selected: true,
                endingDay: true,
                color: 'black'
              }
            }}
            theme={{
              selectedDayBackgroundColor: 'black',
              todayTextColor: 'black',
              arrowColor: 'black',
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}