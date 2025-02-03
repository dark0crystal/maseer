import { View, Text, FlatList, Image } from 'react-native';
import {images} from "../../constants"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";
import StarRating from 'react-native-star-rating-widget';
export default function DiscoverCards(){


    const activityCategories = [
        { id: '1', location:"Muscat", title: 'Scuba fasdf fddads diving', type:"Hard" , female:true ,price:"100.0",companyName:"MfqodLTD" ,img:images.kayak },
        { id: '2', location:"Bidyah", title: 'Fishing' , type:"Easy" , female:true ,price:"1200",companyName:"Masser",img:images.brand},
        { id: '3', location:"Sidab", title: 'Sea tour' , type:"Mid" , female:false ,price:"20",companyName:"Masser Almotahidah",img:images.kayak},
        { id: '4', location:"Qatar", title: 'Snorkeling' , type:"Hard" , female:false,price:"30.5",companyName:"Masseeer trips" ,img:images.brand},
        { id: '5', location:"Saudi", title: 'Jet ski' , type:"Easy" , female:true ,price:"30000",companyName:"Oman trips LTD shshssshs",img:images.kayak},
        { id: '6', location:"Dubai", title: 'Kayak' , type:"Mid" , female:false ,price:"49.5",companyName:"MfqodLTD",img:images.brand},
    ];

    return(
        <View>
            <Text className='text-xl font-psemibold'>Activity Cards</Text>
             <FlatList
                data={activityCategories}
                keyExtractor={(category) => category.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10, marginTop:20  ,alignItems: "center",}}
                renderItem={({ item }) => (
                <Link href={`/details/${item.id}`}  className='mt-2'>
                <View className="bg-white shadow w-[350px] h-[190px] p-2 m-2 rounded-3xl  border border-red-300 flex flex-row overflow-hidden gap-1 ">
                    {/* image section */}
                   <View className="relative  w-[120px] h-[160px] overflow-hidden rounded-2xl border">
                        <Image className="absolute w-full h-full" resizeMode="cover" source={item.img} />   
                    </View>

                    {/* content section */}
                    <View className='bg-white w-[200px]  h-[160px]  p-2  overflow-hidden rounded-2xl border flex flex-row '>

                        
                        {/* Left section */}
                        <View>
                            <Text className="text-base font-psemibold text-gray-600 ">{item.title}</Text>
                            <Text className="text-base text-gray-600 mt-1"><Ionicons name="location-outline" size={13} color="black" />{item.location}</Text>
                            <Text className="text-base font-pmedium text-gray-600 mt-1">{item.price}R.O</Text>
                            <View className='flex flex-row items-center  gap-1'>
                                <View className='relative flex flex-row items-center justify-center'>
                                    <View className='absolute h-4 w-4 bg-green-300 rounded-full'/>
                                    <View className='absolute h-3 w-3 bg-green-400 rounded-full'/>
                                    <View className='h-2 w-2 bg-green-500 rounded-full'/>
                                </View>
                                <Text className="text-sm text-gray-600"> {item.type}</Text>
                                
                             </View>
                        </View>
                    </View>
                </View>
                </Link>
                )}
            />
        </View>
    )
}