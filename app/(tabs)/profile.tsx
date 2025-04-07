import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import CurrencyChange from '../(user-dashboard)/Currencychange'
import Account from '@/components/auth/Account'

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      {/* Make the content scrollable */}
      <ScrollView className="space-y-6">
        <Text className="text-2xl font-semibold text-gray-800">Profile</Text>

        <Link href="/(admin)/StepOne" className="text-blue-500 text-lg">Add New Activity</Link>

        {/* show this link after checking if the user is a manager of activity */}
        <Link href="/(user-dashboard)/manage-activity" className="text-blue-500 text-lg">Show Activities</Link>

        <Link href="/(admin)/" className="text-blue-500 text-lg">Go to index</Link>

        <CurrencyChange />
        
        <Account />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
