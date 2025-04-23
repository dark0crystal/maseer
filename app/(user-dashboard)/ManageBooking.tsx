import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useState } from "react";

export default function ManageBooking() {
  // Sample data for booked users
  const [bookings, setBookings] = useState([
    { id: "1", name: "Ali Al Habsi", email: "ali@example.com", profilePic: "https://randomuser.me/api/portraits/men/4.jpg", status: "pending" },
    { id: "2", name: "Ahmed Al Busaidi", email: "ahmed@example.com", profilePic: "https://randomuser.me/api/portraits/men/6.jpg", status: "pending" },
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
      <Text className="text-xl font-bold mb-4 text-black">Manage Bookings</Text>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-gray-50 rounded-lg shadow-md p-4 mb-4 flex-row items-center border border-gray-200">
            {/* Profile Image */}
            <Image source={{ uri: item.profilePic }} className="w-12 h-12 rounded-full mr-4" />

            {/* User Details */}
            <View className="flex-1">
              <Text className="text-lg font-semibold text-black">{item.name}</Text>
              <Text className="text-gray-700">{item.email}</Text>
              <Text className={`text-sm font-bold ${item.status === "accepted" ? "text-black" : item.status === "declined" ? "text-gray-700" : "text-gray-500"}`}>
                {item.status.toUpperCase()}
              </Text>
            </View>

            {/* Action Buttons */}
            {item.status === "pending" && (
              <View className="flex-row space-x-2">
                <TouchableOpacity onPress={() => handleAccept(item.id)} className="bg-black p-2 rounded-md">
                  <Text className="text-white font-semibold">Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDecline(item.id)} className="bg-white border border-black p-2 rounded-md">
                  <Text className="text-black font-semibold">Decline</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}
