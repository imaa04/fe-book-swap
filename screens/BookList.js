import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Button,
    Link,
    Image,


} from "react-native";
import React, { useContext, createContext, useState, useEffect, TouchableOpacity } from "react";
import tailwind from "twrnc";
import { UserContext } from "../context/userContext";
import { useNavigation } from '@react-navigation/native'
import { getBooks } from "../api";
import IndividualBook from "./IndividualBook";

const BookList = ({ title, image, author }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('IndividualBook')}>
        <View style={tailwind`flex-row pt-5 p-4 mb-1 bg-white rounded-lg shadow-md `}>
            <Image source={{ uri: image }} style={{ width: 100, height: 170 }} />

            <View style={tailwind`ml-2 flex-col pb-4 flex-shrink`}>
                <Text style={tailwind`text-lg font-bold`}>{title}</Text>
                <Text style={tailwind`text-sm`}>{author}</Text>
            </View>
        </View>
        </TouchableOpacity>



    )
}
export default BookList