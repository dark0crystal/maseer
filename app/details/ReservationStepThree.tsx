import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";


export default function PaymentScreen() {
  const [paymentUrl, setPaymentUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async () => {
    setLoading(true);
  
    const url = "https://uatcheckout.thawani.om/api/v1/checkout/session";
    const secretKey = "rRQ26GcsZzoEhbrP2HZvLYDbn9C9et"; // استخدم مفتاح SECRET الصحيح
    const publishableKey = "HGvTMLDssJghr9tlN9gr4DVYt0qyBy"; // استخدم مفتاح PUBLISHABLE الصحيح
  
    const bodyData = {
      client_reference_id: "123412",
      mode: "payment",
      products: [
        {
          name: "Scuba Diving",
          quantity: 1,
          unit_amount: 10000, // المبلغ بالبيسة
        },
      ],
      success_url: "https://thw.om/success", // رابط النجاح
      cancel_url: "https://thw.om/cancel", // رابط الإلغاء
      metadata: {
        "Customer name": "John Doe",
        "order id": 12345,
      },
    };
  
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'thawani-api-key': 'rRQ26GcsZzoEhbrP2HZvLYDbn9C9et'
        },
        body: '{"client_reference_id":"123412","mode":"payment","products":[{"name":"product 1","quantity":1,"unit_amount":100}],"success_url":"https://thw.om/success","cancel_url":"https://thw.om/cancel","metadata":{"Customer name":"somename","order id":0}}'
      };
      
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if(response.ok){
            setLoading(false)
            setPaymentUrl(`https://uatcheckout.thawani.om/pay/${data.data.session_id}?key=${publishableKey}`);
        }
        console.log(data);
      } catch (error) {
        console.error(error);
      }
  };
  
  return (
    <View className="">
      {paymentUrl ? (
        <WebView source={{ uri: paymentUrl }} className=""/>
      ) : (
        <View className="">
          <Text className="">Proceed with Payment</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity onPress={createCheckoutSession} className="">
              <Text className="">Pay Now</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}
