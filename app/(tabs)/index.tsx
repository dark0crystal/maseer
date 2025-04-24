import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivityCategories from '@/components/cards/ActivityCategories';
import ActivityCards from '@/components/cards/ActivityCards';
import ExperienceCards from '@/components/cards/ExperienceCards';
import DiscoverCards from '@/components/cards/DiscoverCards';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import images from '@/constants/images';

const Home = () => {
  const { t } = useTranslation("home");
  const { width, height } = useWindowDimensions();
  
  // Calculate responsive height based on screen size
  const cardHeight = width > 768 ? 250 : 180;
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        <ImageBackground
          source={images.brandicon}
          className="w-full rounded-xl overflow-hidden mb-6"
          resizeMode="cover"
          style={{ height: cardHeight }}
        >
          <LinearGradient
            colors={['rgba(76, 102, 159, 0.9)', 'rgba(59, 89, 152, 0.8)', 'rgba(25, 47, 106, 0.7)']}
            className="w-full h-full justify-center p-6"
          >
            <Text className={`text-white ${width > 768 ? 'text-3xl' : 'text-2xl'} font-bold mb-2`}>{t('welcome')}</Text>
            <Text className={`text-white ${width > 768 ? 'text-lg' : 'text-base'} opacity-80`}>
              {t('discoverText')}
            </Text>
          </LinearGradient>
        </ImageBackground>
        
        <DiscoverCards/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
