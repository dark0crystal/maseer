import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { WebView } from "react-native-webview";

export default function PaymentScreen() {
  const [paymentUrl, setPaymentUrl] = useState("");
  const [loading, setLoading] = useState(true); // Initially true for auto-load

  useEffect(() => {
    createCheckoutSession();
  }, []);

  const createCheckoutSession = async () => {
    const url = "https://uatcheckout.thawani.om/api/v1/checkout/session";
    const secretKey = "rRQ26GcsZzoEhbrP2HZvLYDbn9C9et";
    const publishableKey = "HGvTMLDssJghr9tlN9gr4DVYt0qyBy";

    const options = {
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
            name: "Scuba Diving",
            quantity: 1,
            unit_amount: 10000,
          },
        ],
        success_url: "https://thw.om/success",
        cancel_url: "https://thw.om/cancel",
        metadata: {
          "Customer name": "John Doe",
          "order id": 12345,
        },
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        const sessionId = data.data.session_id;
        const paymentLink = `https://uatcheckout.thawani.om/pay/${sessionId}?key=${publishableKey}`;
        setPaymentUrl(paymentLink);
      } else {
        console.error("Failed to create session:", data);
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="text-gray-600 mt-2">Preparing Payment...</Text>
      </View>
    );
  }

  if (paymentUrl) {
    return <WebView source={{ uri: paymentUrl }} className="flex-1" />;
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-red-600 text-center">Failed to load payment page.</Text>
    </View>
  );
}
