import { useHeaderHeight } from "@react-navigation/elements";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const ExploreScreen = () => {
  const headerHeight = useHeaderHeight();

  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerTransparent: true }} />
      <View style={[styles.container, { marginTop: headerHeight }]}></View>
    </>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
