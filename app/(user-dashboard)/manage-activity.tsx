import { View,Text } from "react-native";
import { images } from "../../constants";

export default function ManageActivity(){

    const activityCategories = [
      { id: "1", location: "Muscat", title: "Scuba Diving", type: "Hard", female: true, price: "100.0", companyName: "MfqodLTD", img: images.kayak },
      { id: "2", location: "Bidyah", title: "صيد السمك", type: "Easy", female: true, price: "1200", companyName: "Masser", img: images.brand },
      { id: "3", location: "Sidab", title: "Sea tour", type: "Mid", female: false, price: "20", companyName: "Masser Almotahidah", img: images.kayak },
      { id: "4", location: "Qatar", title: "Snorkeling", type: "Hard", female: false, price: "30.5", companyName: "Masseeer trips", img: images.brand },
      { id: "5", location: "Saudi", title: "Jet ski", type: "Easy", female: true, price: "30000", companyName: "Oman trips LTD", img: images.kayak },
      { id: "6", location: "Dubai", title: "Kayak", type: "Mid", female: false, price: "49.5", companyName: "MfqodLTD", img: images.brand },
    ];

    return(
        <View>
            <Text>
                
            </Text>
        </View>
    )
}