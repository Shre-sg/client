import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { enableScreens } from "react-native-screens";

const _layout = () => {
  enableScreens();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
