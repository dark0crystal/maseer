import { View, Text, FlatList, Image } from 'react-native';
import {images} from "../../constants"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";
import { StarRatingDisplay} from 'react-native-star-rating-widget';


export default function MapOverlay({activity}:any){
    return(
        <View className='absolute bottom-32 left-5 right-5'>
            <Link href={`/details/${activity.id}`}  className='mt-2'>
                <View className="bg-white shadow w-[350px] h-[190px] p-2 m-2 rounded-3xl   border-red-300 flex flex-row overflow-hidden gap-1 ">
                    {/* image section */}
                   <View className="relative  w-[120px] h-[160px] overflow-hidden rounded-2xl ">
                        <Image className="absolute w-full h-full" resizeMode="cover" source={images.kayak} />   
                    </View>

                    {/* content section */}
                    <View className='bg-white w-[200px]  h-[160px]  p-2  overflow-hidden rounded-2xl  flex flex-row '>

                        
                        {/* Left section */}
                        <View>
                            <Text className="text-base font-psemibold text-gray-600 ">{activity.activityType}</Text>
                            <Text className="text-base text-gray-600 mt-1"><Ionicons name="location-outline" size={13} color="black" />{activity.title}</Text>
                            <View className=''>
                                <StarRatingDisplay
                                    rating={2.5}
                                    starSize={18}
                                />
                            </View>
                            <Text className="text-base font-pmedium text-gray-600 mt-1">{activity.price}</Text>
                            <View className='flex flex-row items-center  gap-1'>
                                <View className='relative flex flex-row items-center justify-center'>
                                    <View className='absolute h-4 w-4 bg-green-300 rounded-full'/>
                                    <View className='absolute h-3 w-3 bg-green-400 rounded-full'/>
                                    <View className='h-2 w-2 bg-green-500 rounded-full'/>
                                    
                                </View>
                                <Text className="text-sm text-gray-600">{activity.type}</Text>
                                
                             </View>
                        </View>
                    </View>
                </View>
                </Link>
        </View>
    )
}