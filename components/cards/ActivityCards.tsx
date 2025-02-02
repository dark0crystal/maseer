import { View, Text, FlatList, Image } from 'react-native';
import {images} from "../../constants"
export default function ActivityCards(){


    const activityCategories = [
        { id: '1', location:"Muscat", title: 'Scuba diving', type:"Hard" , female:false ,price:"100.0",companyName:"MfqodLTD" },
        { id: '2', location:"Bidyah", title: 'Fishing' , type:"Easy" , female:true ,price:"1200",companyName:"Masser"},
        { id: '3', location:"Sidab", title: 'Sea tour' , type:"Mid" , female:false ,price:"20",companyName:"Masser Almotahidah"},
        { id: '4', location:"Qatar", title: 'Snorkeling' , type:"Hard" , female:false,price:"30.5",companyName:"Masseeer trips" },
        { id: '5', location:"Saudi", title: 'Jet ski' , type:"Easy" , female:true ,price:"30000",companyName:"Oman trips LTD shshssshs"},
        { id: '6', location:"Dubai", title: 'Kayak' , type:"Mid" , female:false ,price:"49.5",companyName:"MfqodLTD"},
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
                <View className="bg-white shadow w-[330px] h-[350px] p-3 m-2 rounded-3xl items-center border border-red-300 flex flex-col overflow-hidden">
                    {/* Image section */}
                    <View className='relative w-full h-[230px] overflow-hidden rounded-2xl border '>
                        <Image className='absolute w-full h-full' resizeMode="cover" source={images.brand}/>
                    </View>
                    {/* content section */}
                    <View className='bg-violet-300 w-full p-2 mt-1 overflow-hidden rounded-2xl border flex flex-row'>
                        <View>
                            <Text className="text-sm text-gray-600 mt-1">{item.title}</Text>
                            <Text className="text-sm text-gray-600 mt-1">{item.location}</Text>location
                            <Text className="text-sm text-gray-600 mt-1">{item.price} R.O</Text>
                        </View>
                        <View>
                             <Text className="text-sm text-gray-600 mt-1">{item.type}</Text>
                        </View>
                    </View>
                </View>
                )}
            />
        </View>
    )
}