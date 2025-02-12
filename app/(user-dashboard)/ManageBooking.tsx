import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useState } from "react";

export default function ManageBooking() {
  // Sample data for booked users
  const [bookings, setBookings] = useState([
    { id: "1", name: "Ali Al Habsi", email: "ali@example.com", profilePic: "https://randomuser.me/api/portraits/men/1.jpg", status: "pending" },
    { id: "2", name: "Fatima Al Busaidi", email: "fatima@example.com", profilePic: "https://randomuser.me/api/portraits/women/2.jpg", status: "pending" },
    { id: "3", name: "Said Al Rashdi", email: "said@example.com", profilePic: "https://randomuser.me/api/portraits/men/3.jpg", status: "pending" },
  ]);

  // Function to handle Accept
  const handleAccept = (id: string) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === id ? { ...booking, status: "accepted" } : booking))
    );
  };

  // Function to handle Decline
  const handleDecline = (id: string) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === id ? { ...booking, status: "declined" } : booking))
    );
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4 text-gray-800">Manage Bookings</Text>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-gray-100 rounded-lg shadow-md p-4 mb-4 flex-row items-center">
            {/* Profile Image */}
            <Image source={{ uri: item.profilePic }} className="w-12 h-12 rounded-full mr-4" />

            {/* User Details */}
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
              <Text className="text-gray-600">{item.email}</Text>
              <Text className={`text-sm font-bold ${item.status === "accepted" ? "text-green-500" : item.status === "declined" ? "text-red-500" : "text-yellow-500"}`}>
                {item.status.toUpperCase()}
              </Text>
            </View>

            {/* Action Buttons */}
            {item.status === "pending" && (
              <View className="flex-row space-x-2">
                <TouchableOpacity onPress={() => handleAccept(item.id)} className="bg-green-500 p-2 rounded-md">
                  <Text className="text-white font-semibold">Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDecline(item.id)} className="bg-red-500 p-2 rounded-md">
                  <Text className="text-white font-semibold">Decline</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}
