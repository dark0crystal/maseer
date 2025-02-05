import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

const Profile = () => {
  return (
    <SafeAreaView>
      <Text>Profile</Text>

      <Link href="/(admin)/StepOne">Go to admin</Link>
      <Link href="/(admin)/">Go to index</Link>
    </SafeAreaView>
  )
}

export default Profile