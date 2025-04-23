import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivityCategories from '@/components/cards/ActivityCategories';
import ActivityCards from '@/components/cards/ActivityCards';
import ExperienceCards from '@/components/cards/ExperienceCards';
import DiscoverCards from '@/components/cards/DiscoverCards';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          className="w-full rounded-xl p-6 mb-6"
        >
          <Text className="text-white text-2xl font-bold mb-2">Welcome to Maseer App</Text>
          <Text className="text-white text-base opacity-80">
            Discover breathtaking experiences and unforgettable journeys across the Sultanate
          </Text>
         
        </LinearGradient>
        
       
        
        <DiscoverCards/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
