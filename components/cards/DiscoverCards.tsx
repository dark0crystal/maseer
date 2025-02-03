import { View, Text, FlatList, Image } from 'react-native';
import {images} from "../../constants"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";
export default function DiscoverCards(){


    const activityCategories = [
        { id: '1', location:"Muscat", title: 'Scuba fasdf fddads diving', type:"Hard" , female:true ,price:"100.0",companyName:"MfqodLTD" ,img:images.kayak },
        { id: '2', location:"Bidyah", title: 'صيد السمك ' , type:"Easy" , female:true ,price:"1200",companyName:"Masser",img:images.brand},
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
                <Link href={`/details/${item.id}`} >
                <View className="bg-white shadow w-[330px] h-[200px] p-3 m-2 rounded-3xl items-center border border-red-300 flex flex-col overflow-hidden">
                    {/* image section */}
                   <View className="relative w-full h-[180px] overflow-hidden rounded-2xl border">
                        <Image className="absolute w-[120px] h-full" resizeMode="cover" source={item.img} />   
                    </View>

                </View>


                    {/* Title */}
                    <View className='border w-full rounded-lg px-3 py-1 mt-1'>
                        <Text className="text-base font-psemibold text-gray-600 ">{item.title}</Text>
                    </View>
                    {/* content section */}
                    <View className='bg-white w-full  p-3 mt-1 overflow-hidden rounded-2xl border flex flex-row items-center '>

                        
                        {/* Left section */}
                        <View>
                            
                            <Text className="text-sm text-gray-600 mt-1"><Ionicons name="location-outline" size={13} color="black" />{item.location}</Text>location
                            <Text className="text-sm font-pmedium text-gray-600 mt-1">{item.price} <Text>R.O</Text></Text>
                        </View>
                        {/* Right section */}
                        <View className=' h-full p-2 mx-2 '>
                            <View className='flex flex-row items-center  absolute bottom-2 left-2 gap-1'>
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