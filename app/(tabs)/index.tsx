import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const activityCategories = [
  { id: '1', name: 'Scuba diving' },
  { id: '2', name: 'Fishing' },
  { id: '3', name: 'Sea tour' },
  { id: '4', name: 'Snorkeling' },
  { id: '5', name: 'Jet ski' },
  { id: '6', name: 'Kayak' },
];

const Home = () => {
  return (
    <SafeAreaView className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Home</Text>
      <FlatList
        data={activityCategories}
        keyExtractor={(category) => category.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <View className="bg-gray-200 w-20 h-20 p-2 mx-2 rounded-lg items-center ">
            <Text className="text-lg font-semibold text-gray-800">{item.id}</Text>
            <Text className="text-sm text-gray-600 mt-1">{item.name}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
