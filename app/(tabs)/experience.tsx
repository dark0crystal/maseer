import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ExperienceCards from '@/components/cards/ExperienceCards'
import { useTranslation } from 'react-i18next'

const Experience = () => {
  const { t } = useTranslation("experience");
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="text-2xl font-bold p-4">{t('experience')}</Text>
      <ExperienceCards/>
    </SafeAreaView>
  )
}

export default Experience