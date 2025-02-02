import { View, Text, FlatList, Image } from 'react-native';
import {images} from "../../constants"
import Ionicons from '@expo/vector-icons/Ionicons';
export default function ActivityCards(){


    const activityCategories = [
        { id: '1', location:"Muscat", title: 'Scuba diving', type:"Hard" , female:false ,price:"100.0",companyName:"MfqodLTD" ,img:images.kayak },
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
                contentContainerStyle={{ paddingHorizontal: 10  ,alignItems: "center",}}
                renderItem={({ item }) => (
                <View className="bg-white shadow w-[330px] h-[370px] p-3 m-2 rounded-3xl items-center border border-red-300 flex flex-col overflow-hidden">
                    {/* Image section */}
                    <View className='relative w-full h-[230px] overflow-hidden rounded-2xl border '>
                        <Image className='absolute w-full h-full' resizeMode="cover" source={item.img}/>
                    </View>
                    {/* content section */}
                    <View className='bg-violet-300 w-full h-[110px] p-3 mt-1 overflow-hidden rounded-2xl border flex flex-row items-center '>
                        {/* Left section */}
                        <View>
                            <Text className="text-base font-psemibold text-gray-600 mt-1">{item.title}</Text>
                            <Text className="text-sm text-gray-600 mt-1"><Ionicons name="location-outline" size={13} color="black" />{item.location}</Text>location
                            <Text className="text-sm font-pmedium text-gray-600 mt-1">{item.price} R.O</Text>
                        </View>
                        {/* Right section */}
                        <View className=' border w-full h-full p-2 mx-2'>
                             <Text className="absolute bottom-2 left-2 text-sm text-gray-600 mt-1">{item.type}</Text>
                        </View>
                    </View>
                </View>
                )}
            />
        </View>
    )
}