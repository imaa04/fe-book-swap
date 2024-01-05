import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ButtonComponent,
} from "react-native";
import React, { useState } from "react";
import tailwind from "twrnc";

function signupButton() {
  return (
      <Button
        onPress={onPressLearnMore}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
  );
}

export default signupButton;
