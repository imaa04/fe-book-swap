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

const Profile = () => {
    const navigation = useNavigation()
    return (
        <View>
        <Text>PROFILE PAGE</Text>
        <Pressable>
              <Text onPress={() => navigation.navigate('Login')} style={tailwind` font-bold`}>
                Sign Out
              </Text>
            </Pressable>
        </View>
    )
}

export default Profile;