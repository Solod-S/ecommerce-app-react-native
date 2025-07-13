import { View, ActivityIndicator } from "react-native";
import React from "react";

function Loading(props: any) {
  return (
    <View className="flex-1 flex justify-center items-center">
      <ActivityIndicator color="red" {...props} />
    </View>
  );
}

export default Loading;
