import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { enableScreens } from "react-native-screens";

const _layout = () => {
  enableScreens();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="index2" options={{ title: "Ward Management" }} />
    </Stack>
  );
};

export default _layout;
