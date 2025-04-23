import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { images } from "@/constants";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import { WebView } from "react-native-webview";
import { useRouter } from "expo-router";
import { useReservationStore } from "@/store/reservationStore";


interface ProductType {
  id: number
  name: string
}

const productTypes: ProductType[] = [
  { id: 1, name: 'Tent' },
  { id: 2, name: 'Caravan' },
]

interface RentalProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  location?: string;
  city?: number;
  type: number;
  is_available: boolean;
}

export default function ExperienceCards() {
  const router = useRouter();
  const { setSelectedDates, setNumberOfGuests, setPhoneNumber, setTotalPrice, setActivityDetails } = useReservationStore();
  const [selectedType, setSelectedType] = useState<ProductType | null>(null);
  const [rentalProducts, setRentalProducts] = useState<RentalProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<RentalProduct | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [rentalDays, setRentalDays] = useState("1");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string>("");
  const [showPayment, setShowPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add images to product types for display
  const productTypesWithImages = [
    { ...productTypes[0], image: images.tent },
    { ...productTypes[1], image: images.caravan },
  ];

  useEffect(() => {
    if (selectedType) {
      fetchRentalProductsByType(selectedType.id);
    }
  }, [selectedType]);

  const fetchRentalProductsByType = async (typeId: number) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("rental_products")
        .select("*")
        .eq("type", typeId)
        .eq("is_available", true);

      if (error) throw error;
      setRentalProducts(data || []);
    } catch (error) {
      console.error("Error fetching rental products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTypePress = (type: ProductType & { image: any }) => {
    setSelectedType(type);
  };

  const handleViewDetails = (product: RentalProduct) => {
    if (product && product.id) {
      setSelectedProduct(product);
    } else {
      console.error("Invalid product data:", product);
    }
  };

  const handleRentNow = () => {
    if (selectedProduct) {
      // Set data in the reservation store
      setActivityDetails({
        id: selectedProduct.id,
        title: selectedProduct.title,
        price: selectedProduct.price,
        location: selectedProduct.location,
      });
      
      // Set default values
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + parseInt(rentalDays || "1"));
      
      setSelectedDates({
        startDate: today,
        endDate: tomorrow
      });
      
      setNumberOfGuests(1);
      setPhoneNumber("");
      setTotalPrice(selectedProduct.price);
      
      // Close all modals
      setSelectedProduct(null);
      setShowPaymentModal(false);
      
      // Navigate to reservation form
      router.push("/details/ReservationForm");
    }
  };

  const createCheckoutSession = async () => {
    setPaymentLoading(true);
    const url = "https://uatcheckout.thawani.om/api/v1/checkout/session";
    const secretKey = "rRQ26GcsZzoEhbrP2HZvLYDbn9C9et";
    const publishableKey = "HGvTMLDssJghr9tlN9gr4DVYt0qyBy";

    // Calculate total price
    const finalPrice = getTotalPrice();

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "thawani-api-key": secretKey,
        },
        body: JSON.stringify({
          client_reference_id: "123412",
          mode: "payment",
          products: [
            {
              name: selectedProduct?.title || "Rental Booking",
              quantity: 1,
              unit_amount: Math.round(finalPrice * 1000), // Convert to baisa (Omani currency subunit)
            },
          ],
          success_url: "https://thw.om/success",
          cancel_url: "https://thw.om/cancel",
          metadata: {
            "Customer name": name,
            "order id": Date.now(),
            "Phone": phone,
            "Email": email,
            "Total Price": `${finalPrice} OMR`,
            "Number of Days": rentalDays || "1"
          },
        }),
      });

      const data = await response.json();

      if (response.ok && data.data?.session_id) {
        const sessionId = data.data.session_id;
        const link = `https://uatcheckout.thawani.om/pay/${sessionId}?key=${publishableKey}`;
        setPaymentUrl(link);
        setShowPayment(true);
      } else {
        console.error("Session creation failed:", data);
        setError("Unable to initiate payment session.");
        Alert.alert("Payment Error", "Unable to initiate payment session.");
      }
    } catch (err) {
      console.error("Network or API error:", err);
      setError("Something went wrong. Please try again.");
      Alert.alert("Payment Error", "Something went wrong. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  const handlePayment = async () => {
    // Validate form fields
    if (!name.trim()) {
      Alert.alert('Name Required', 'Please enter your full name');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Email Required', 'Please enter your email address');
      return;
    }

    if (!phone.trim()) {
      Alert.alert('Phone Required', 'Please enter your phone number');
      return;
    }

    if (!rentalDays || parseInt(rentalDays) < 1) {
      Alert.alert('Invalid Days', 'Please enter at least 1 day for rental');
      return;
    }

    createCheckoutSession();
  };

  const getTotalPrice = () => {
    if (!selectedProduct) return 0;
    return selectedProduct.price * parseInt(rentalDays || "1");
  };

  return (
    <View className="p-4">
      <FlatList
        data={productTypesWithImages}
        keyExtractor={(type) => type.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => handleTypePress(item)}
            className="mb-2 shadow-lg"
            activeOpacity={0.8}
          >
            <View className="w-full">
              <View className="h-64 rounded-2xl overflow-hidden relative border border-gray-200">
                <Image
                  source={item.image}
                  className="w-full h-full absolute"
                  resizeMode="cover"
                />
                <View className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                <View className="absolute bottom-0 left-0 right-0 p-4">
                  <Text className="text-white text-2xl font-bold">{item.name}</Text>
                  <Text className="text-white text-sm mt-1 opacity-90">Tap to explore options</Text>
                </View>
                <View className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                  <Text className="text-blue-600 font-semibold">Available</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={!!selectedType}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedType(null)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl h-3/4">
            <View className="items-center py-2 relative my-2 h-[70px]">
              <View className="w-12 h-1 bg-gray-300 rounded-full" />
              <Text className="text-xl font-bold mt-2">
                {selectedType?.name} for Rent
              </Text>
              <TouchableOpacity
                className="absolute right-4 top-2 p-2"
                onPress={() => setSelectedType(null)}
              >
                <Ionicons name="close" size={40} color="gray" />
              </TouchableOpacity>
            </View>

            {loading ? (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#2563eb" />
                <Text className="text-gray-600 mt-2">Loading products...</Text>
              </View>
            ) : (
              <ScrollView className="p-4">
                {rentalProducts.length > 0 ? (
                  rentalProducts.map((product) => (
                    <View
                      key={product.id}
                      className="bg-gray-50 rounded-xl p-4 mb-4 shadow-sm"
                    >
                      
                      <View className="h-40 bg-gray-200 rounded-xl mb-3 justify-center items-center">
                        
                          <Image 
                            source={selectedType?.id === 1 ? images.tent : images.caravan}
                            className="w-full h-full rounded-xl"
                            resizeMode="cover"
                          />
                       
                      </View>
                      <Text className="text-gray-600 mb-2">{product.description}</Text>
                      <Text className="text-lg font-bold text-blue-600 mb-2">
                        OMR {product.price.toFixed(2)}
                      </Text>
                      <TouchableOpacity
                        className="bg-blue-600 rounded-lg p-3 mt-3"
                        onPress={() => {
                          setSelectedProduct(product);
                          setSelectedType(null);
                        }}
                      >
                        <Text className="text-white text-center font-bold">
                          View Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <View className="flex-1 justify-center items-center py-10">
                    <Text className="text-gray-500">No products available for rent in this category</Text>
                  </View>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        visible={!!selectedProduct}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedProduct(null)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl h-3/4">
            <View className="items-center py-2 relative my-2 h-[70px]">
              <View className="w-12 h-1 bg-gray-300 rounded-full" />
              <TouchableOpacity
                className="absolute right-4 top-2 p-2"
                onPress={() => setSelectedProduct(null)}
              >
                <Ionicons name="close" size={40} color="gray" />
              </TouchableOpacity>
            </View>

            <ScrollView className="p-4">
              {selectedProduct && (
                <>
                  <View className="h-48 bg-gray-200 rounded-xl mb-4 justify-center items-center">
                    <Image 
                      source={selectedProduct.type === 1 ? images.tent : images.caravan}
                      className="w-full h-full rounded-xl"
                      resizeMode="cover"
                    />
                  </View>

                  <Text className="text-xl font-bold mb-2">{selectedProduct.title}</Text>
                  
                  <Text className="text-lg font-semibold mb-2">Description</Text>
                  <Text className="text-gray-600 mb-4">{selectedProduct.description}</Text>

                  <Text className="text-lg font-semibold mb-2">Price</Text>
                  <Text className="text-2xl font-bold text-blue-600 mb-4">
                    OMR {selectedProduct.price.toFixed(2)} / day
                  </Text>

                  {selectedProduct.location && (
                    <>
                      <Text className="text-lg font-semibold mb-2">Location</Text>
                      <Text className="text-gray-600 mb-4">{selectedProduct.location}</Text>
                    </>
                  )}

                  <TouchableOpacity 
                    className="bg-blue-600 rounded-lg p-4 mt-3"
                    onPress={handleRentNow}
                  >
                    <Text className="text-white text-center font-bold">Rent Now</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showPaymentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View className="flex-1 bg-black/70 justify-end">
          <View className="bg-white rounded-t-3xl h-5/6">
            <View className="items-center py-2 relative my-2 h-[70px]">
              <View className="w-12 h-1 bg-gray-300 rounded-full" />
              <Text className="text-xl font-bold mt-2">
                Complete Your Rental
              </Text>
              <TouchableOpacity
                className="absolute right-4 top-2 p-2"
                onPress={() => {
                  if (showPayment) {
                    setShowPayment(false);
                  } else {
                    setShowPaymentModal(false);
                  }
                }}
              >
                <Ionicons name="close" size={40} color="gray" />
              </TouchableOpacity>
            </View>

            {showPayment ? (
              <View className="flex-1 h-[600px]">
                <WebView source={{ uri: paymentUrl }} style={{ flex: 1 }} />
              </View>
            ) : (
              <ScrollView className="p-6">
                {selectedProduct && (
                  <>
                    <View className="bg-gray-50 p-4 rounded-xl mb-6">
                      <Text className="text-lg font-bold mb-2">{selectedProduct.title}</Text>
                      <Text className="text-gray-600 mb-2">{selectedProduct.description}</Text>
                      <Text className="text-blue-600 font-bold">OMR {selectedProduct.price.toFixed(2)} / day</Text>
                    </View>

                    <Text className="text-lg font-bold mb-4">Rental Information</Text>
                    
                    <View className="mb-4">
                      <Text className="text-gray-700 mb-2">Full Name</Text>
                      <TextInput
                        className="border border-gray-300 rounded-lg p-3 bg-gray-50"
                        placeholder="Enter your full name"
                        value={name}
                        onChangeText={setName}
                      />
                    </View>
                    
                    <View className="mb-4">
                      <Text className="text-gray-700 mb-2">Email</Text>
                      <TextInput
                        className="border border-gray-300 rounded-lg p-3 bg-gray-50"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                      />
                    </View>
                    
                    <View className="mb-4">
                      <Text className="text-gray-700 mb-2">Phone Number</Text>
                      <TextInput
                        className="border border-gray-300 rounded-lg p-3 bg-gray-50"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                      />
                    </View>
                    
                    <View className="mb-6">
                      <Text className="text-gray-700 mb-2">Number of Days</Text>
                      <TextInput
                        className="border border-gray-300 rounded-lg p-3 bg-gray-50"
                        placeholder="Enter number of days"
                        value={rentalDays}
                        onChangeText={setRentalDays}
                        keyboardType="number-pad"
                      />
                    </View>

                    <View className="bg-blue-50 p-4 rounded-xl mb-6">
                      <Text className="text-lg font-bold mb-2">Payment Summary</Text>
                      <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-600">Price per day:</Text>
                        <Text className="font-medium">OMR {selectedProduct.price.toFixed(2)}</Text>
                      </View>
                      <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-600">Number of days:</Text>
                        <Text className="font-medium">{rentalDays || 1}</Text>
                      </View>
                      <View className="flex-row justify-between pt-2 border-t border-gray-200 mt-2">
                        <Text className="text-gray-800 font-bold">Total:</Text>
                        <Text className="text-blue-600 font-bold">OMR {getTotalPrice().toFixed(2)}</Text>
                      </View>
                    </View>

                    <TouchableOpacity 
                      className={`rounded-lg p-4 mt-3 ${paymentLoading ? 'bg-blue-400' : 'bg-blue-600'}`}
                      onPress={handlePayment}
                      disabled={paymentLoading}
                    >
                      {paymentLoading ? (
                        <View className="flex-row justify-center items-center">
                          <ActivityIndicator size="small" color="white" />
                          <Text className="text-white text-center font-bold ml-2">Processing...</Text>
                        </View>
                      ) : (
                        <Text className="text-white text-center font-bold">Pay & Complete Rental</Text>
                      )}
                    </TouchableOpacity>
                    
                    {error && (
                      <View className="bg-red-50 p-3 rounded-lg mt-4">
                        <Text className="text-red-500">{error}</Text>
                      </View>
                    )}
                  </>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
