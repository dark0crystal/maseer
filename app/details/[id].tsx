import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { images } from "../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";

// بيانات وهمية مؤقتة - استبدلها بقاعدة بيانات لاحقًا
const activityCategories = [
  { id: "1", location: "Muscat", title: "Scuba Diving", type: "Hard", female: true, price: "100.0", companyName: "MfqodLTD", img: images.kayak },
  { id: "2", location: "Bidyah", title: "صيد السمك", type: "Easy", female: true, price: "1200", companyName: "Masser", img: images.brand },
  { id: "3", location: "Sidab", title: "Sea tour", type: "Mid", female: false, price: "20", companyName: "Masser Almotahidah", img: images.kayak },
  { id: "4", location: "Qatar", title: "Snorkeling", type: "Hard", female: false, price: "30.5", companyName: "Masseeer trips", img: images.brand },
  { id: "5", location: "Saudi", title: "Jet ski", type: "Easy", female: true, price: "30000", companyName: "Oman trips LTD", img: images.kayak },
  { id: "6", location: "Dubai", title: "Kayak", type: "Mid", female: false, price: "49.5", companyName: "MfqodLTD", img: images.brand },
];

export default function ActivityDetails() {
  const { id } = useLocalSearchParams(); // التقاط ID من الرابط
  const activity = activityCategories.find((item) => item.id === id); // البحث عن النشاط المطابق

  if (!activity) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "red" }}>Activity not found</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ backgroundColor: "white", padding: 16 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* صورة النشاط */}
          <View style={{ position: "relative", width: "100%", height: 300, borderRadius: 10, overflow: "hidden" }}>
            <Image source={activity.img} style={{ position: "absolute", width: "100%", height: "100%" }} resizeMode="cover" />
            {activity.female && (
              <View style={{ position: "absolute", bottom: 8, left: 8, backgroundColor: "red", paddingHorizontal: 16, paddingVertical: 4, borderRadius: 10 }}>
                <Text style={{ color: "white", fontWeight: "bold" }}>Female Only</Text>
              </View>
            )}
          </View>

          {/* تفاصيل النشاط */}
          <View style={{ marginTop: 16, paddingHorizontal: 12 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>{activity.title}</Text>
            <Text style={{ color: "gray", marginTop: 4 }}>
              <Ionicons name="location-outline" size={16} color="black" /> {activity.location}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 8 }}>Price: {activity.price} R.O</Text>
            <Text style={{ color: "gray", marginTop: 8 }}>Company: {activity.companyName}</Text>
            <Text style={{ color: "gray", marginTop: 8 }}>Difficulty: {activity.type}</Text>
          </View>

          {/* مساحة فارغة (استبدل 100vh بطريقة صحيحة) */}
          <View style={{ height: Dimensions.get("window").height, backgroundColor: "violet" }}></View>
        </ScrollView>

        {/* القسم السفلي */}
        <View style={{ position: "absolute", bottom: 0, backgroundColor: "black", height: 120, flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16 }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>{activity.price} OMR</Text>
          <TouchableOpacity style={{ backgroundColor: "red", padding: 12, borderRadius: 8 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
