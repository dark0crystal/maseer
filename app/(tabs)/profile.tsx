import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import CurrencyChange from '../(user-dashboard)/Currencychange'
import Auth from '@/components/auth/Auth'
import Account from '@/components/auth/Account'

const Profile = () => {
  return (
    <SafeAreaView>
      {/* Make the content scrollable */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text>Profile</Text>

        <Link href="/(admin)/StepOne">Add New Activity</Link>

        {/* show this link after checking if the user is a manager of activity */}
        <Link href="/(user-dashboard)/manage-activity">Show Activities</Link>

        <Link href="/(admin)/">Go to index</Link>
        <CurrencyChange />
        <Account/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
