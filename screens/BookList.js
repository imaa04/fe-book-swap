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
import React, { useContext, createContext, useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import tailwind from "twrnc";
import { UserContext } from "../context/userContext";
import { useNavigation } from '@react-navigation/native'
import { getBooks } from "../api";
import IndividualBook from "./IndividualBook";


const BookList = ({ title, image, author, genre, publishDate, condition, username, description }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate('IndividualBook',{ title : title, image : image, author: author, genre: genre, publishDate: publishDate, condition: condition , username: username, description: description})}>
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
export default BookList;