import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DiscoverCards from '@/components/cards/DiscoverCards'

const Create = () => {
  return (
    <SafeAreaView>
      <Text>Discover</Text>
      <DiscoverCards/>
    </SafeAreaView>
  )
}

export default Create