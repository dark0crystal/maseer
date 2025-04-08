import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivityCategories from '@/components/cards/ActivityCategories';
import ActivityCards from '@/components/cards/ActivityCards';
import ExperienceCards from '@/components/cards/ExperienceCards';
import DiscoverCards from '@/components/cards/DiscoverCards';



const Home = () => {
  return (
    <SafeAreaView className="flex flex-col p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Experience Oman</Text>
      <ActivityCategories/>
      <DiscoverCards/>
    </SafeAreaView>
  );
};

export default Home;
