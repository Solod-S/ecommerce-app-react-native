import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { View } from "react-native";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import useAuthStore from "../store/useAuthStore";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const { user, isAuthenticated, initAuthListener } = useAuthStore();

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = initAuthListener();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    //  check if the user is authenticated or not
    if (typeof isAuthenticated == "undefined") return;
    // user in app group
    // const inApp = segments[0] == "(tabs)";
    if (!isAuthenticated) {
      // if user authenticated
      // and not in (tabs) => redirect home
      router.replace("/home");
    } else if (isAuthenticated == false) {
      // if user is not authenticated
      //  redirect to home
      router.replace("(tabs)/");
    }
  }, [isAuthenticated]);

  return <View className="flex-1 bg-white"></View>;
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(notificationScreen)"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="signin" options={{ presentation: "modal" }} />
        <Stack.Screen name="signup" options={{ presentation: "modal" }} />
        <Stack.Screen
          name="restorePassword"
          options={{ presentation: "modal" }}
        />
      </Stack>
      <Toast />
      <MainLayout />
    </View>
  );
}
