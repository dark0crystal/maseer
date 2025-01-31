import { View, Text, FlatList, Image } from 'react-native';
import {images} from "../../constants"
export default function ActivityCards(){


    const activityCategories = [
        { id: '1', name: 'Scuba diving' },
        { id: '2', name: 'Fishing' },
        { id: '3', name: 'Sea tour' },
        { id: '4', name: 'Snorkeling' },
        { id: '5', name: 'Jet ski' },
        { id: '6', name: 'Kayak' },
    ];

    return(
        <View>
            <Text className='text-xl font-psemibold'>Activity Cards</Text>
             <FlatList
                data={activityCategories}
                horizontal
                keyExtractor={(category) => category.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                renderItem={({ item }) => (
                <View className="bg-gray-200 w-[280px] h-[310px] p-2 mx-2 rounded-lg items-center ">
                    <Text className="text-lg font-semibold text-gray-800">{item.id}</Text>
                    <Text className="text-sm text-gray-600 mt-1">{item.name}</Text>
                    <Image className='w-[270px] h-[300px]' resizeMode='contain' source={images.brand}/>
                </View>
                )}
            />
        </View>
    )
}