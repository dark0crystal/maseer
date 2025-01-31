import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ExperienceCards from '@/components/cards/ExperienceCards'

const Experience = () => {
  return (
    <SafeAreaView>
      <Text>Experience</Text>
      <ExperienceCards/>
    </SafeAreaView>
  )
}

export default Experience