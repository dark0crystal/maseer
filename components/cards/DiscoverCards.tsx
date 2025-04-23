import { View, Text, FlatList, Image } from 'react-native';
import {images} from "../../constants"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";
import { StarRatingDisplay} from 'react-native-star-rating-widget';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function DiscoverCards(){
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

    return(
        <View>
            <Text className='text-xl font-psemibold'>Discover Activities</Text>
            {loading ? (
                <Text className="text-center mt-4">Loading activities...</Text>
            ) : (
                <FlatList
                    data={displayData}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10, marginTop: 20, alignItems: "center" }}
                    renderItem={({ item }) => (
                    <Link href={`/details/${item.id}`} className='mt-5'>
                    <View className="bg-white shadow-lg w-[350px] h-[200px] p-2 m-2 rounded-3xl flex flex-row overflow-hidden gap-4 border border-gray-100">
                        {/* image section */}
                        <View className="relative w-[130px] h-[160px] overflow-hidden rounded-2xl shadow-md">
                            <Image 
                                className="absolute w-full h-full" 
                                resizeMode="cover" 
                                source={item.img || images.kayak} 
                            />
                           
                        </View>

                        {/* content section */}
                        <View className='flex-1 py-2 justify-between'>
                            {/* Top section - Title and Location */}
                            <View>
                                <Text className="text-lg font-bold text-gray-800 mb-1">{item.title}</Text>
                                <View className="flex-row items-center mb-1">
                                    <Ionicons name="location-outline" size={14} color="#4B5563" />
                                    <Text className="text-sm text-gray-600 ml-1">{item.location || "Oman"}</Text>
                                </View>
                                <View className='mb-2'>
                                    <StarRatingDisplay
                                        rating={4.5}
                                        starSize={16}
                                    />
                                </View>
                            </View>
                            
                            {/* Bottom section - Price and Activity Type */}
                            <View>
                                <Text className="text-lg font-bold text-gray-800 mb-2">{item.price} <Text className="text-sm font-medium">R.O</Text></Text>
                                <View className='flex-row items-center gap-2 bg-gray-50 py-1 px-2 rounded-full self-start'>
                                    <View className='relative flex-row items-center justify-center'>
                                        <View className='absolute h-4 w-4 bg-green-300 rounded-full'/>
                                        <View className='absolute h-3 w-3 bg-green-400 rounded-full'/>
                                        <View className='h-2 w-2 bg-green-500 rounded-full'/>
                                    </View>
                                    <Text className="text-sm font-medium text-gray-700">{item.activity_type}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    </Link>
                    )}
                />
            )}
        </View>
    )
}