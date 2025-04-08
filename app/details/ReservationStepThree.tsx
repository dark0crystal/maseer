import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { WebView } from "react-native-webview";

export default function PaymentScreen() {
  const [paymentUrl, setPaymentUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    createCheckoutSession();
  }, []);

  const createCheckoutSession = async () => {
    const url = "https://uatcheckout.thawani.om/api/v1/checkout/session";
    const secretKey = "rRQ26GcsZzoEhbrP2HZvLYDbn9C9et";
    const publishableKey = "HGvTMLDssJghr9tlN9gr4DVYt0qyBy";

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
      });

      const data = await response.json();

      if (response.ok && data.data?.session_id) {
        const sessionId = data.data.session_id;
        const link = `https://uatcheckout.thawani.om/pay/${sessionId}?key=${publishableKey}`;
        setPaymentUrl(link);
      } else {
        console.error("Session creation failed:", data);
        setError("Unable to initiate payment session.");
      }
    } catch (err) {
      console.error("Network or API error:", err);
      setError("Something went wrong. Please try again.");
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

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-4">
        <Text className="text-red-600 text-center text-lg font-semibold">
          {error}
        </Text>
      </View>
    );
  }

  return <WebView source={{ uri: paymentUrl }} className="flex-1" />;
}
