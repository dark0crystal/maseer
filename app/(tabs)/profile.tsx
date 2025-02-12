import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

const Profile = () => {
  return (
    <SafeAreaView>
      <Text>Profile</Text>

      <Link href="/(admin)/StepOne">Add New Activity</Link>

      {/* show this link after checking if the user is a manager of activity */}
      <Link href="/(admin)/">Show Activities</Link>
      
      <Link href="/(admin)/">Go to index</Link>
    </SafeAreaView>
  )
}

export default Profile