import { View, Text, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function ActivityCategories(){
    const { t } = useTranslation("activities");

    const activityCategories = [
        { id: '1', name: t('scubaDiving', 'Scuba diving') },
        { id: '2', name: t('fishing', 'Fishing') },
        { id: '3', name: t('seaTour', 'Sea tour') },
        { id: '4', name: t('snorkeling', 'Snorkeling') },
        { id: '5', name: t('jetSki', 'Jet ski') },
        { id: '6', name: t('kayak', 'Kayak') },
    ];

    return(
        <View>
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
        </View>
    )
}