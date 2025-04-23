import { View, Text, FlatList, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { images } from "../../constants";

export default function DiscoverCards() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*, profiles(*)');
      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }
      if (data) {
        setPosts(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const displayData = posts.length > 0 ? posts : [];

  return (
    <View className="mt-6 px-4">
      <Text className='text-xl font-bold mb-4'>Discover Activities</Text>
      {loading ? (
        <Text className="text-center mt-4">Loading activities...</Text>
      ) : (
        <FlatList
          data={displayData}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item }) => (
            <Link href={`/details/${item.id}`} className="rounded-3xl overflow-hidden">
              <View className="bg-white flex-row shadow-md rounded-3xl overflow-hidden border border-gray-100">
                {/* Left - Image */}
                <Image
                  source={item.img || images.kayak}
                  className="w-[130px] h-full"
                  resizeMode="cover"
                />

                {/* Right - Content */}
                <View className="flex-1 px-4 py-3 justify-between">
                  {/* Title & Location */}
                  <View>
                    <Text className="text-lg font-semibold text-gray-900" numberOfLines={1}>
                      {item.title}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Ionicons name="location-outline" size={14} color="#6B7280" />
                      <Text className="text-sm text-gray-600 ml-1" numberOfLines={1}>
                        {item.location || "Oman"}
                      </Text>
                    </View>
                    <View className="mt-1">
                      <StarRatingDisplay rating={4.5} starSize={14} />
                    </View>
                  </View>

                  {/* Price & Badge */}
                  <View className="mt-2">
                    <Text className="text-base font-bold text-gray-800">
                      {item.price} <Text className="text-sm font-medium">R.O</Text>
                    </Text>
                    <View className="flex-row items-center gap-2 bg-green-50 mt-1 px-2 py-1 rounded-full w-max">
                      <Ionicons name="bicycle" size={14} color="#10B981" />
                      <Text className="text-xs font-medium text-green-700">{item.activity_type}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Link>
          )}
        />
      )}
    </View>
  );
}
