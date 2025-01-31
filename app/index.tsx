import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView>

      <Text className="text-red-400 text-5xl ">Native wind is here</Text>
      <Link href="/home" className="text-blue-600 bg-slate-300 rounded-lg p-2">Goo to Home</Link>
    </SafeAreaView>
  );
}
