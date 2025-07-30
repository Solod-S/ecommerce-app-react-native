import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.black,
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 13,
        },
        // 👇 Используем кастомную кнопку
        tabBarButton: props => (
          <TouchableWithoutFeedback onPress={props.onPress}>
            <View
              style={{
                paddingTop: 5,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {props.children}
            </View>
          </TouchableWithoutFeedback>
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Головна",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Пошук",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
          title: "Сповіщення",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          href: null,
          title: "Кошик",
          tabBarBadge: 3,
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профіль",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
