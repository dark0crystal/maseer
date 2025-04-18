import { View, Text, FlatList, Image } from 'react-native';
import {images} from "../../constants"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";
import { StarRatingDisplay} from 'react-native-star-rating-widget';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function DiscoverCards(){
    const [posts, setPosts] = useState([]);
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

    // Fallback data in case the fetch fails
    const fallbackPosts = [
        { id: '1', location:"Muscat", title: 'Scuba diving', activity_type:"Hard", price:"100.0", description: "Amazing scuba diving experience", img:images.kayak },
        { id: '2', location:"Bidyah", title: 'Fishing', activity_type:"Easy", price:"1200", description: "Fishing trip with experts", img:images.brand},
        { id: '3', location:"Sidab", title: 'Sea tour', activity_type:"Mid", price:"20", description: "Explore the sea with us", img:images.kayak},
        { id: '4', location:"Qatar", title: 'Snorkeling', activity_type:"Hard", price:"30.5", description: "Snorkeling adventure", img:images.brand},
        { id: '5', location:"Saudi", title: 'Jet ski', activity_type:"Easy", price:"30000", description: "Jet ski fun", img:images.kayak},
        { id: '6', location:"Dubai", title: 'Kayak', activity_type:"Mid", price:"49.5", description: "Kayaking experience", img:images.brand},
    ];

    const displayData = posts.length > 0 ? posts : fallbackPosts;

    return(
        <View>
            <Text className='text-xl font-psemibold'>Activity Cards</Text>
            {loading ? (
                <Text className="text-center mt-4">Loading activities...</Text>
            ) : (
                <FlatList
                    data={displayData}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10, marginTop:20  ,alignItems: "center",}}
                    renderItem={({ item }) => (
                    <Link href={`/details/${item.id}`}  className='mt-2'>
                    <View className="bg-white shadow w-[350px] h-[190px] p-2 m-2 rounded-3xl   border-red-300 flex flex-row overflow-hidden gap-1 ">
                        {/* image section */}
                       <View className="relative  w-[120px] h-[160px] overflow-hidden rounded-2xl ">
                            <Image className="absolute w-full h-full" resizeMode="cover" source={item.img || images.kayak} />   
                        </View>

                        {/* content section */}
                        <View className='bg-white w-[200px]  h-[160px]  p-2  overflow-hidden rounded-2xl  flex flex-row '>

                            
                            {/* Left section */}
                            <View>
                                <Text className="text-base font-psemibold text-gray-600 ">{item.title}</Text>
                                <Text className="text-base text-gray-600 mt-1"><Ionicons name="location-outline" size={13} color="black" />{item.location || "Oman"}</Text>
                                <View className=''>
                                    <StarRatingDisplay
                                        rating={4.5}
                                        starSize={18}
                                    />
                                </View>
                                <Text className="text-base font-pmedium text-gray-600 mt-1">{item.price}R.O</Text>
                                <View className='flex flex-row items-center  gap-1'>
                                    <View className='relative flex flex-row items-center justify-center'>
                                        <View className='absolute h-4 w-4 bg-green-300 rounded-full'/>
                                        <View className='absolute h-3 w-3 bg-green-400 rounded-full'/>
                                        <View className='h-2 w-2 bg-green-500 rounded-full'/>
                                        
                                    </View>
                                    <Text className="text-sm text-gray-600"> {item.activity_type}</Text>
                                    
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