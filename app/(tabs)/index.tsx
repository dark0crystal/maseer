import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivityCategories from '@/components/cards/ActivityCategories';



const Home = () => {
  return (
    <SafeAreaView className="flex flex-col p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Experience Oman</Text>
      <ActivityCategories/>
     
    </SafeAreaView>
  );
};

export default Home;
