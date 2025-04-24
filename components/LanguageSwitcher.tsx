import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  const switchLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <TouchableOpacity
      onPress={switchLanguage}
      className="bg-black w-[85vw]  p-4 rounded-xl flex items-center justify-center"
    >
      <Text className="text-white font-semibold text-base">
        {currentLanguage === 'en' ? 'عربي' : 'English'}
      </Text>
    </TouchableOpacity>
  );
} 