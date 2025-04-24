import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import icons from "../../constants/icons";
import Loader from "../../components/Loader";
import React from "react";

const TabIcon = ({ icon, color, name, focused }:any) => {
  return (
    <View className="flex items-center justify-center gap-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-[10px]`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const { t } = useTranslation("navigation");
  // const { loading, isLogged } = useGlobalContext();

  // if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2c3e50",
          tabBarInactiveTintColor: "#767676", 
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF", // White background
            borderTopWidth: 1,
            borderTopColor: "#EBEBEB", // Light border
            height: 100,
            elevation: 8,
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("home", "Home"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name={t("home", "Home")}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="experience"
          options={{
            title: t("experiences", "Experiences"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name={t("experiences", "Experiences")}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="discover"
          options={{
            title: t("explore", "Explore"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name={t("explore", "Explore")}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t("profile", "Profile"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#FFFFFF" style="dark" />
    </>
  );
};

export default TabLayout;