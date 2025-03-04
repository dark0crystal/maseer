import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import CurrencyChange from '../(user-dashboard)/Currencychange'

const Profile = () => {
  return (
    <SafeAreaView>
      <Text>Profile</Text>

      <Link href="/(admin)/StepOne">Add New Activity</Link>

      {/* show this link after checking if the user is a manager of activity */}
      <Link href="/(user-dashboard)/manage-activity">Show Activities</Link>

      <Link href="/(admin)/">Go to index</Link>
      <CurrencyChange/>
      

    </SafeAreaView>
  )
}

export default Profile