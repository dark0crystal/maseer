import { View, Text } from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'

const SearchLayout = () => {
  return (
   <>
      <Tabs>
        <Tabs.Screen name='home'/>
      </Tabs>
   </>
  )
}

export default SearchLayout