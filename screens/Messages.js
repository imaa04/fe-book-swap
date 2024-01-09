import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Button,
    Link,
} from "react-native";
import React, { useContext, createContext, useState } from "react";
import tailwind from "twrnc";
import { UserContext } from "../context/userContext";
import { useNavigation } from '@react-navigation/native'

const Messages = () => {
    return (
        <Text>MESSAGES PAGE</Text>
    )
}

export default Messages;