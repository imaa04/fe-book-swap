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
import React, { useContext, createContext, useState,useEffect } from "react";
import tailwind from "twrnc";
import { UserContext } from "../context/userContext";
import { useNavigation } from '@react-navigation/native'
import { getBooks } from "../api";

const HomePage = () => {
const [books,setBooks]=useState([])

useEffect(()=>{
    getBooks()
    .then((books)=>{
        // setBooks(books)
    })
})
    
    return (
        <View style={tailwind`flex-1 w-full items-center justify-center bg-yellow-100`}>
        <Text>{books}</Text>
        </View>
    )
}

export default HomePage